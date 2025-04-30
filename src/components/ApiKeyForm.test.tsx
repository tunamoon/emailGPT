import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ApiKeyForm from "./ApiKeyForm";
import { GeminiService } from "../GeminiService";

jest.mock("../GeminiService");
describe("ApiKeyForm", () => {
    const mockOnSave = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the form correctly", () => {
    render(<ApiKeyForm onSave={mockOnSave} />);
    expect(screen.getByText("Enter your API key")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter your Google Gemini API key")).toBeInTheDocument();
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
      error: "Invalid API key."
    });

    render(<ApiKeyForm onSave={mockOnSave} />);
    
    const input = screen.getByPlaceholderText("Enter your Google Gemini API key");
    fireEvent.change(input, { target: { value: "invalid-key" } });
    
    fireEvent.click(screen.getByText("Save & Continue"));
    
    await waitFor(() => {
      expect(screen.getByText("Invalid API key.")).toBeInTheDocument();
      expect(mockOnSave).not.toHaveBeenCalled();
    });
  });

  it("saves valid API key and calls onSave", async () => {
    (GeminiService.prototype.validateApiKey as jest.Mock).mockResolvedValue({
      valid: true
    });

    render(<ApiKeyForm onSave={mockOnSave} />);
    
    const input = screen.getByPlaceholderText("Enter your Google Gemini API key");
    fireEvent.change(input, { target: { value: "valid-key" } });
    
    fireEvent.click(screen.getByText("Save & Continue"));
    
    await waitFor(() => {
      expect(mockOnSave).toHaveBeenCalledWith("valid-key");
      expect(chrome.storage.local.set).toHaveBeenCalledWith({ apiKey: "valid-key" }, expect.any(Function));
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