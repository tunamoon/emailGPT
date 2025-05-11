// src/components/ApiKeyForm.tsx
import React, { useState } from "react";
import { GeminiService } from "../GeminiService";
import EmailGPTStar from "../assets/EmailGPTStar.png";

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

  const isSubmitDisabled = isValidating;

  return (
    // Main container, our App 
    <div className = "App">
      {/* Title and Top Bar */}
      <div className="top-bar">
        <div className="title-left">
          <img src={EmailGPTStar} alt="icon" className="title-icon" />
          <h1 className="title">EmailGPT</h1>
        </div>
      </div>

      <p className ="instructions">Enter your Google Gemini API key. This will be stored securely in your browser and used for all requests to the Gemini API.</p>

      <input
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        style={{ width: "100%" }}
        placeholder="Type Gemini API key..."
      />

      {validationError && (
        <div className="error-message">
          <p>{validationError}</p>
        </div>
      )}
      <br></br>
      <button
        className={`btn ${isSubmitDisabled ? 'btn-disabled' : 'btn-primary'}`}
        onClick={handleSubmit}
        disabled={isSubmitDisabled}
      >
        {isValidating ? "Validating..." : "Save & Continue"}
      </button>


      <p className= "instructions">
        Don't have an API key? <a href="https://ai.google.dev/tutorials/setup" target="_blank" rel="noopener noreferrer">Get one here</a>
      </p>
    </div>
  );
}