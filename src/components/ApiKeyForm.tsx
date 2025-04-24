// src/components/ApiKeyForm.tsx
import React, { useState } from "react";
import { GeminiService } from "../GeminiService";

type Props = { onSave: (key: string) => void };

export default function ApiKeyForm({ onSave }: Props) {
  const [value, setValue] = useState("");
  const [isValidating, setIsValidating] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (value.trim() === "") {
      return alert("Please enter a key.");
    }
    
    setIsValidating(true);
    setValidationError(null);
    
    try {
      // Validate the API key before saving
      const geminiService = new GeminiService(value);
      const validation = await geminiService.validateApiKey();
      
      if (validation.valid) {
        chrome.storage.local.set({ apiKey: value }, () => onSave(value));
      } else {
        setValidationError(validation.error || "Invalid API key. Please check and try again.");
      }
    } catch (error) {
      setValidationError("Error validating API key. Please try again.");
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <div className="p-4 w-80 space-y-3">
      <h2>Enter your API key</h2>
      <input
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        style={{ width: "100%" }}
        placeholder="Enter your Google Gemini API key"
      />
      {validationError && (
        <div className="error-message">
          <p>{validationError}</p>
        </div>
      )}
      <button onClick={handleSubmit} disabled={isValidating}>
        {isValidating ? "Validating..." : "Save & Continue"}
      </button>
      <p style={{ fontSize: "12px", marginTop: "8px" }}>
        Don't have an API key? <a href="https://ai.google.dev/tutorials/setup" target="_blank" rel="noopener noreferrer">Get one here</a>
      </p>
    </div>
  );
}
