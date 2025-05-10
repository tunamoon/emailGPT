import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import History from "./History";
import { HistoryItem } from "./History";


const mockGet = jest.fn();
const mockSet = jest.fn();

global.chrome = {
  storage: {
    local: {
      get: mockGet,
      set: mockSet
    }
  }
} as any;

// Mock window.confirm
global.confirm = jest.fn();

describe('History Component', () => {
  // Sample history items for testing
  const mockHistoryItems: HistoryItem[] = [
    {
      id: '1',
      timestamp: 1715270400000, // May 9, 2025
      emailContent: 'This is a test email content for the first item',
      analysisResult: 'Analysis result for first item',
      analysisType: 'action-items'
    },
    {
      id: '2',
      timestamp: 1715184000000, // May 8, 2025
      emailContent: 'This is a test email content for the second item that is longer than fifty characters to test truncation',
      analysisResult: 'Analysis result for second item',
      analysisType: 'summarize'
    },
    {
      id: '3',
      timestamp: 1715097600000, // May 7, 2025
      emailContent: 'Third test email',
      analysisResult: 'Analysis result for third item',
      analysisType: 'message-breakdown'
    }
  ];

  const mockSelectHistoryItem = jest.fn();
  const mockClearHistory = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders empty state when no history items exist', () => {
    // Setup mock to return empty history
    mockGet.mockImplementation((keys, callback) => {
      callback({ emailHistory: [] });
    });

    render(
      <History 
        onSelectHistoryItem={mockSelectHistoryItem} 
        onClearHistory={mockClearHistory} 
      />
    );

    expect(screen.getByText('Analysis History')).toBeInTheDocument();
    expect(screen.getByText('No history items yet. Analyses will appear here after you process emails.')).toBeInTheDocument();
    expect(screen.queryByText('Clear History')).not.toBeInTheDocument();
  });

  it('renders history items when they exist', async () => {
    // Setup mock to return history items
    mockGet.mockImplementation((keys, callback) => {
      callback({ emailHistory: mockHistoryItems });
    });

    render(
      <History 
        onSelectHistoryItem={mockSelectHistoryItem} 
        onClearHistory={mockClearHistory} 
      />
    );

    // Wait for history items to load
    await waitFor(() => {
      expect(screen.getByText('Action Items')).toBeInTheDocument();
      expect(screen.getByText('Summary')).toBeInTheDocument();
      expect(screen.getByText('Message Breakdown')).toBeInTheDocument();
    });

    expect(screen.getByText('This is a test email content for the first item')).toBeInTheDocument();
    
    // For the truncated text, use a regex pattern to match the truncated text
    // or use a test query that's more flexible
    expect(screen.getByText((content, element) => {
      return content.startsWith('This is a test email content for the second item');
    })).toBeInTheDocument();
    
    expect(screen.getByText('Third test email')).toBeInTheDocument();
    
    // Check if clear history button exists
    expect(screen.getByText('Clear History')).toBeInTheDocument();
  });

  it('handles selecting a history item', async () => {
    // Setup mock to return history items
    mockGet.mockImplementation((keys, callback) => {
      callback({ emailHistory: mockHistoryItems });
    });

    render(
      <History 
        onSelectHistoryItem={mockSelectHistoryItem} 
        onClearHistory={mockClearHistory} 
      />
    );

    // Wait for history items to load
    await waitFor(() => {
      expect(screen.getByText('Action Items')).toBeInTheDocument();
    });

    // Click on the first history item
    fireEvent.click(screen.getByText('This is a test email content for the first item').closest('.history-item')!);
    
    // Check if the correct callback was called with the right item
    expect(mockSelectHistoryItem).toHaveBeenCalledWith(mockHistoryItems[0]);
  });
});