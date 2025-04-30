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
});