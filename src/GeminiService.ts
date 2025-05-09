import { GoogleGenerativeAI } from '@google/generative-ai';

export interface GeminiResponse {
  text: string;
  error?: string;
}

export interface HistoryItem {
  id: string;
  timestamp: number;
  emailContent: string;
  analysisResult: string;
  analysisType: string;
}

export class GeminiService {
  private genAI: GoogleGenerativeAI;
  private model: string = 'gemini-2.5-pro-exp-03-25';

  constructor(apiKey: string) {
    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  /**
   * Validates if the API key is correct by making a simple request
   * @returns A promise that resolves to true if valid, or error message if invalid
   */
  async validateApiKey(): Promise<{ valid: boolean; error?: string }> {
    try {
      // Make a simple, low-cost request to validate the API key
      const model = this.genAI.getGenerativeModel({ model: this.model });
      await model.generateContent('Hello, this is a test to validate API key.');
      return { valid: true };
    } catch (error) {
      console.error('API key validation failed:', error);
      return { 
        valid: false,
        error: "Invalid API key. Please check your key and try again."
      };
    }
  }

  async generateResponse(prompt: string): Promise<GeminiResponse> {
    try {
      const model = this.genAI.getGenerativeModel({ model: this.model });
      const result = await model.generateContent(prompt);
      const response = result.response;
      return { text: response.text() };
    } catch (error) {
      console.error('Error generating response from Gemini:', error);
      return { 
        text: '', 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      };
    }
  }

  async analyzeEmail(emailContent: string, analysisType: string): Promise<GeminiResponse> {
    let prompt = '';
    
    switch (analysisType) {
      case 'action-items':
        prompt = `Extract all action items from the following email thread. For each action item, include who is responsible (if mentioned) and any relevant deadlines. Format as a bulleted list:\n\n${emailContent}`;
        break;
      case 'summarize':
        prompt = `Provide a concise summary of the following email thread, highlighting the main points and decisions. Keep it brief and focused on the most important information:\n\n${emailContent}`;
        break;
      case 'message-breakdown':
        prompt = `Break down this email thread message by message. For each message, provide: 1) Sender, 2) Main points, and 3) Any requests or questions raised:\n\n${emailContent}`;
        break;
      default:
        prompt = `Analyze the following email thread and provide helpful insights:\n\n${emailContent}`;
    }
    
    const response = await this.generateResponse(prompt);
    
    // If successful, save to history
    if (response.text && !response.error) {
      this.saveToHistory(emailContent, response.text, analysisType);
    }
    
    return response;
  }
  private saveToHistory(emailContent: string, analysisResult: string, analysisType: string): void {
    // Generate a unique ID using timestamp and random string
    const historyItem: HistoryItem = {
      id: Date.now().toString() + '-' + Math.random().toString(36).substring(2, 9),
      timestamp: Date.now(),
      emailContent,
      analysisResult,
      analysisType
    };
    
    // Get existing history and append new item
    chrome.storage.local.get(['emailHistory'], (result) => {
      let history: HistoryItem[] = result.emailHistory || [];
      
      // Add new item to beginning of array
      history.unshift(historyItem);
      
      // Limit history to 50 items
      if (history.length > 50) {
        history = history.slice(0, 50);
      }
      
      // Save updated history
      chrome.storage.local.set({ emailHistory: history });
    });
  }
}