import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ApiKeyForm from "./ApiKeyForm";
import { GeminiService } from "../GeminiService";

jest.mock("../assets/EmailGPTStar.png", () => "mock-image-path");
jest.mock("../GeminiService");

global.chrome = {
    storage: {
      local: {
        set: jest.fn((data, callback) => {
          // Call the callback immediately for testing
          if (callback) callback();
        })
      }
    }
  } as any;
  
describe("ApiKeyForm", () => {
    const mockOnSave = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the form correctly", () => {
    render(<ApiKeyForm onSave={mockOnSave} />);
    
    // Check for updated text and elements
    expect(screen.getByText("EmailGPT")).toBeInTheDocument();
    expect(screen.getByText(/Enter your Google Gemini API key/)).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Type Gemini API key...")).toBeInTheDocument();
    expect(screen.getByText("Save & Continue")).toBeInTheDocument();
    expect(screen.getByText("Don't have an API key?")).toBeInTheDocument();
    expect(screen.queryByText("Invalid API key.")).not.toBeInTheDocument();
  });

  it("shows validation error when API key is empty", async () => {
    global.alert = jest.fn(); // Mock alert function
    render(<ApiKeyForm onSave={mockOnSave} />);

    fireEvent.click(screen.getByText("Save & Continue"));
    expect(global.alert).toHaveBeenCalledWith("Please enter a key.");
    expect(mockOnSave).not.toHaveBeenCalled();
  });


  it("shows validation error when API key is invalid", async () => {
    (GeminiService.prototype.validateApiKey as jest.Mock).mockResolvedValue({
      valid: false,
      error: "Invalid API key. Please check and try again."
    });

    render(<ApiKeyForm onSave={mockOnSave} />);
    
    const input = screen.getByPlaceholderText("Type Gemini API key...");
    fireEvent.change(input, { target: { value: "invalid-key" } });
    
    fireEvent.click(screen.getByText("Save & Continue"));
    
    await waitFor(() => {
      expect(screen.getByText("Invalid API key. Please check and try again.")).toBeInTheDocument();
      expect(mockOnSave).not.toHaveBeenCalled();
    });
  });

  it("saves valid API key and calls onSave", async () => {
    (GeminiService.prototype.validateApiKey as jest.Mock).mockResolvedValue({
      valid: true
    });

    render(<ApiKeyForm onSave={mockOnSave} />);
    
    const input = screen.getByPlaceholderText("Type Gemini API key...");
    fireEvent.change(input, { target: { value: "valid-key" } });
    
    fireEvent.click(screen.getByText("Save & Continue"));
    
    await waitFor(() => {
      expect(mockOnSave).toHaveBeenCalledWith("valid-key");
      expect(chrome.storage.local.set).toHaveBeenCalledWith(
        { apiKey: "valid-key" }, 
        expect.any(Function)
      );
    });
  });

  it("visits the api key setup link when clicked", () => {
    render(<ApiKeyForm onSave={mockOnSave} />);
    
    const link = screen.getByText("Get one here");
    expect(link).toHaveAttribute("href", "https://ai.google.dev/tutorials/setup");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });
});