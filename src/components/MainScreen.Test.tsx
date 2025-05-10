import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import MainScreen from "./MainScreen";
import { GeminiService } from "../GeminiService";

jest.mock("../assets/EmailGPTStar.png", () => "mock-image-path");
jest.mock("../GeminiService");

const mockChromeStorage = {
    get: jest.fn((key, callback) => {
      callback({ emailHistory: [] });
    }),
    set: jest.fn()
  };
  
  // Define global chrome object
  global.chrome = {
    storage: {
      local: mockChromeStorage
    }
  } as any;
  
describe("MainScreen", () => {

    const mockOnLogout = jest.fn();
    const mockApiKey = "test-api-key";

    beforeEach(() => {
        jest.clearAllMocks();

        (GeminiService.prototype.validateApiKey as jest.Mock).mockResolvedValue({
            valid: true
        });
    });

    it("renders the main screen correctly", async () => {
        render(<MainScreen onLogout={mockOnLogout} apiKey={mockApiKey} />);
        await waitFor(() => {
            expect(screen.getByText("Analyze Email")).toBeInTheDocument();
            expect(screen.getByRole("textbox")).toBeInTheDocument();
            expect(screen.getByText("Action Items")).toBeInTheDocument();
            expect(screen.getByText("Summarizing")).toBeInTheDocument();
            expect(screen.getByText("Message by message breakdown")).toBeInTheDocument();
            expect(screen.getByText("Go")).toBeInTheDocument();
        });
    });
    

    it("shows error message when API key is invalid", async () => {
        (GeminiService.prototype.analyzeEmail as jest.Mock).mockResolvedValue({
          error: "Invalid API key."
        });
    
        render(<MainScreen onLogout={mockOnLogout} apiKey={mockApiKey} />);
    
        const input = screen.getByRole("textbox");
        fireEvent.change(input, { target: { value: "Test email content" } });
    
        // Select action items option
        const actionItemsCheckbox = screen.getByLabelText("Action Items");
        fireEvent.click(actionItemsCheckbox);
    
        fireEvent.click(screen.getByText("Go"));
    
        await waitFor(() => {
          expect(screen.getByText("Error: Invalid API key.")).toBeInTheDocument();
        });
      });

      it("calls analyzeEmail with correct parameters for action items", async () => {
        const mockAnalyzeEmail = jest.fn().mockResolvedValue({ 
          text: "Extracted action items: Follow up by Friday" 
        });
        GeminiService.prototype.analyzeEmail = mockAnalyzeEmail;
          
        render(<MainScreen onLogout={mockOnLogout} apiKey={mockApiKey} />);
          
        // Enter email content
        const textInput = screen.getByRole("textbox");
        fireEvent.change(textInput, { target: { value: "This is a test email. Please follow up by Friday." } });
        
        // Select action items option
        const actionItemsCheckbox = screen.getByLabelText("Action Items");
        fireEvent.click(actionItemsCheckbox);
        
        // Click analyze button
        const analyzeButton = screen.getByText("Go");
        fireEvent.click(analyzeButton);
          
        await waitFor(() => {
          expect(mockAnalyzeEmail).toHaveBeenCalledWith(
            "This is a test email. Please follow up by Friday.",
            "action-items"
          );
            
          expect(screen.getByText("Analysis Result:")).toBeInTheDocument();
          expect(screen.getByText("Extracted action items: Follow up by Friday")).toBeInTheDocument();
        });
    });

    it("clears analysis result on logout", async () => {
        const mockAnalyzeEmail = jest.fn().mockResolvedValue({ 
          text: "Extracted action items: Follow up by Friday" 
        });
        GeminiService.prototype.analyzeEmail = mockAnalyzeEmail;
        
        render(<MainScreen onLogout={mockOnLogout} apiKey={mockApiKey} />);
        
        // Enter email content
        const textInput = screen.getByRole("textbox");
        fireEvent.change(textInput, { target: { value: "This is a test email. Please follow up by Friday." } });
        
        // Select action items option
        const actionItemsCheckbox = screen.getByLabelText("Action Items");
        fireEvent.click(actionItemsCheckbox);
        
        // Click analyze button
        const analyzeButton = screen.getByText("Go");
        fireEvent.click(analyzeButton);
        
        await waitFor(() => {
          expect(screen.getByText("Analysis Result:")).toBeInTheDocument();
          expect(screen.getByText("Extracted action items: Follow up by Friday")).toBeInTheDocument();
        });
    
        // Simulate logout
        fireEvent.click(screen.getByText("Log out"));
    
        await waitFor(() => {
          expect(mockOnLogout).toHaveBeenCalled();
        });
      });

      it("switches between tabs", async () => {
        render(<MainScreen onLogout={mockOnLogout} apiKey={mockApiKey} />);
            
        // Click on the history tab
        const historyTab = screen.getByText("History");
        fireEvent.click(historyTab);
            
        await waitFor(() => {
            expect(screen.getByText("Analysis History")).toBeInTheDocument();
            expect(screen.getByText("No history items yet. Analyses will appear here after you process emails.")).toBeInTheDocument();
        });
            
        // Click on the analyze tab
        const analyzeTab = screen.getByText("Analyze Email");
        fireEvent.click(analyzeTab);
            
        await waitFor(() => {
            expect(screen.getByText("Select which function you would like:")).toBeInTheDocument();
        });

      });

      
      it("generates suggested reply after analysis", async () => {
        const mockAnalyzeEmail = jest.fn()
          .mockImplementationOnce(() => Promise.resolve({ text: "Summary of the email" }))
          .mockImplementationOnce(() => Promise.resolve({ text: "Here is a suggested reply" }));
        
        GeminiService.prototype.analyzeEmail = mockAnalyzeEmail;
        
        render(<MainScreen onLogout={mockOnLogout} apiKey={mockApiKey} />);
        
        // Enter email content
        const textInput = screen.getByRole("textbox") as HTMLInputElement;
        fireEvent.change(textInput, { target: { value: "This is a test email content." } });
        
        // Select summarize option
        const summarizeCheckbox = screen.getByLabelText("Summarizing");
        fireEvent.click(summarizeCheckbox);
        
        // Click go button
        const goButton = screen.getByText("Go");
        fireEvent.click(goButton);
        
        await waitFor(() => {
          expect(screen.getByText("Analysis Result:")).toBeInTheDocument();
          expect(screen.getByText("Summary of the email")).toBeInTheDocument();
          expect(screen.getByText("Suggest a Reply")).toBeInTheDocument();
        });
        
        // Click suggest reply button
        const suggestReplyButton = screen.getByText("Suggest a Reply");
        fireEvent.click(suggestReplyButton);
        
        await waitFor(() => {
          expect(screen.getByText("Suggested Reply:")).toBeInTheDocument();
          expect(screen.getByText("Here is a suggested reply")).toBeInTheDocument();
          expect(mockAnalyzeEmail).toHaveBeenCalledTimes(2);
          expect(mockAnalyzeEmail).toHaveBeenNthCalledWith(2, "Summary of the email", "suggest-reply");
        });
      });
});