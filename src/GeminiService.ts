import { GoogleGenerativeAI } from '@google/generative-ai';

export interface GeminiResponse {
  text: string;
  error?: string;
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
      case 'suggest-reply':
        prompt = `Based on the following email thread, write a helpful, concise, and polite reply that the user could send. Assume the user is the recipient of the last message in the thread:\n\n${emailContent}`;
        break;
      default:
        prompt = `Analyze the following email thread and provide helpful insights:\n\n${emailContent}`;
    }
    
    return this.generateResponse(prompt);
  }
}