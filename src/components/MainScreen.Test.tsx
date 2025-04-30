import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import MainScreen from "./MainScreen";
import { GeminiService } from "../GeminiService";

jest.mock("../GeminiService");


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
        render(<MainScreen onLogout={mockOnLogout} apiKey= {mockApiKey}/>);
        await waitFor(() => {
            expect(screen.getByText("Analyze Email")).toBeInTheDocument();
            expect(screen.getByPlaceholderText("Paste email content here...")).toBeInTheDocument();
            expect(screen.getByText("Action Items")).toBeInTheDocument();
            expect(screen.getByText("Summarize")).toBeInTheDocument();
            expect(screen.getByText("Message Breakdown")).toBeInTheDocument();
            expect(screen.getByText("Analyze")).toBeInTheDocument();
        });
    });

    it("shows error message when API key is invalid", async () => {
        (GeminiService.prototype.analyzeEmail as jest.Mock).mockResolvedValue({
            error: "Invalid API key."
        });

        render(<MainScreen onLogout={mockOnLogout} apiKey={mockApiKey} />);

        const input = screen.getByPlaceholderText("Paste email content here...");
        fireEvent.change(input, { target: { value: "Test email content" } });

        fireEvent.click(screen.getByText("Analyze"));

        await waitFor(() => {
            expect(screen.getByText("Error: Invalid API key.")).toBeInTheDocument();
        });
    });

    it("calls analyzeEmail with correct parameters actionItems", async () => {
        const mockAnalyzeEmail = jest.fn().mockResolvedValue({ 
            text: "Extracted action items: Follow up by Friday" 
          });
        GeminiService.prototype.analyzeEmail = mockAnalyzeEmail;
          
        render(<MainScreen onLogout={mockOnLogout} apiKey={mockApiKey} />);
          
        await waitFor(() => {
            // Select action items option
            const actionItemsCheckbox = screen.getByLabelText("Action Items");
            fireEvent.click(actionItemsCheckbox);
            
            // Enter email content
            const textInput = screen.getByLabelText(/Click reply, three dots/);
            fireEvent.change(textInput, { target: { value: "This is a test email. Please follow up by Friday." } });
            
            // Click analyze button
            const analyzeButton = screen.getByText("Analyze Email");
            fireEvent.click(analyzeButton);
        });
          
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
        
        // Simulate analysis
        const actionItemsCheckbox = screen.getByLabelText("Action Items");
        fireEvent.click(actionItemsCheckbox);
        
        const textInput = screen.getByLabelText(/Click reply, three dots/);
        fireEvent.change(textInput, { target: { value: "This is a test email. Please follow up by Friday." } });
        
        const analyzeButton = screen.getByText("Analyze Email");
        fireEvent.click(analyzeButton);
        
        await waitFor(() => {
            expect(screen.getByText("Analysis Result:")).toBeInTheDocument();
            expect(screen.getByText("Extracted action items: Follow up by Friday")).toBeInTheDocument();
        });

        // Simulate logout
        fireEvent.click(screen.getByText("Logout"));

        await waitFor(() => {
            expect(mockOnLogout).toHaveBeenCalled();
            expect(screen.queryByText("Analysis Result:")).not.toBeInTheDocument();
            expect(screen.queryByText("Extracted action items: Follow up by Friday")).not.toBeInTheDocument();
        });
    });
});