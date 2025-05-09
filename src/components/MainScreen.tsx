import React, { useState, ChangeEvent, useEffect } from "react";
import "../App.css";
import { GeminiService } from "../GeminiService";
import EmailGPTStar from "../assets/EmailGPTStar.png";

interface CheckboxProps {
  label: string;
  onChange: (checked: boolean) => void;
  checked: boolean;
}

type Props = {
  onLogout: () => void;
  apiKey: string;
};

const Checkbox: React.FC<CheckboxProps> = ({ label, onChange, checked }) => {
  return (
    <label>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      {label}
    </label>
  );
};

function MainScreen({ onLogout, apiKey }: Props) {
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [isChecked3, setIsChecked3] = useState(false);
  const [textValue, setTextValue] = useState("");
  const [responseText, setResponseText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isApiKeyValid, setIsApiKeyValid] = useState(true);

  useEffect(() => {
    validateApiKey();
    chrome.storage.local.get(
      ["lastAnalysisResult", "lastEmailContent", "lastAnalysisType"],
      (result) => {
        if (result.lastAnalysisResult) setResponseText(result.lastAnalysisResult);
        if (result.lastEmailContent) setTextValue(result.lastEmailContent);
        if (result.lastAnalysisType === "action-items") uncheckOthers(1);
        if (result.lastAnalysisType === "summarize") uncheckOthers(2);
        if (result.lastAnalysisType === "message-breakdown") uncheckOthers(3);
      }
    );
  }, [apiKey]);

  const validateApiKey = async () => {
    try {
      const geminiService = new GeminiService(apiKey);
      const validation = await geminiService.validateApiKey();
      setIsApiKeyValid(validation.valid);
      if (!validation.valid) setError(`API key validation failed: ${validation.error}`);
    } catch {
      setIsApiKeyValid(false);
      setError("Failed to validate API key. Please log out and try again.");
    }
  };

  const uncheckOthers = (except: number) => {
    setIsChecked1(except === 1);
    setIsChecked2(except === 2);
    setIsChecked3(except === 3);
  };

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextValue(e.target.value);
  };

  const handleDone = async () => {
    const isCheckboxSelected = isChecked1 || isChecked2 || isChecked3;
    if (!isCheckboxSelected) return alert("Please select one option.");
    if (textValue.trim() === "") return alert("Please fill out the email content.");
    if (!isApiKeyValid) return setError("Invalid API key. Please log out and try again.");

    setIsLoading(true);
    setError(null);

    let analysisType = "";
    if (isChecked1) analysisType = "action-items";
    if (isChecked2) analysisType = "summarize";
    if (isChecked3) analysisType = "message-breakdown";

    chrome.storage.local.set({
      lastEmailContent: textValue,
      lastAnalysisType: analysisType,
    });

    try {
      const geminiService = new GeminiService(apiKey);
      const response = await geminiService.analyzeEmail(textValue, analysisType);
      if (response.error) setError(response.error);
      else {
        setResponseText(response.text);
        chrome.storage.local.set({ lastAnalysisResult: response.text });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  // Suggested Reply State
  const [suggestedReply, setSuggestedReply] = useState<string>("");
  const [isGeneratingReply, setIsGeneratingReply] = useState(false);

  // Handle Suggested Reply
  const handleSuggestedReply = async () => {
    if (!responseText) {
      alert("You must generate a summary before requesting a reply.");
      return;
    }
  
    setIsGeneratingReply(true);
    setError(null);
  
    try {
      const geminiService = new GeminiService(apiKey);
      const response = await geminiService.analyzeEmail(
        responseText,
        "suggest-reply"
      );
  
      if (response.error) {
        setError(response.error);
      } else {
        setSuggestedReply(response.text);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setIsGeneratingReply(false);
    }
  };
  
  const isAIProcessing = isLoading || isGeneratingReply;

  //Conditional logic for go buttons
  const isReadyToGo = (textValue.trim() !== "") && (isChecked1 || isChecked2 || isChecked3);
  const isGoButtonDisabled = (!isReadyToGo || isAIProcessing || !isApiKeyValid);

  //Conditional logic for suggested reply button
  const canSuggestReply = responseText.trim() !== "";
  const isSuggestButtonDisabled = !canSuggestReply || isAIProcessing;


  return (
    <div className="App">
      <div className="top-bar">
        <div className="title-left">
          <img src={EmailGPTStar} alt="icon" className="title-icon" />
          <h1 className="title">EmailGPT</h1>
        </div>
        <div className="top-buttons">
          <button className="btn btn-primary small-button" onClick={onLogout}>Log out</button>
          <button
            className="btn btn-primary small-button"
            onClick={() => window.open("https://etwitmyer.github.io/EmailGPT-Page/", "_blank")}
          >
            About
          </button>
        </div>
      </div>

      <p className="instructions">Copy the full email thread and paste it below:</p>
      <textarea
        id="my-textbox"
        className="email-input"
        value={textValue}
        onChange={handleTextChange}
      />

      <div className="action-panel">
        <p className="instructions">Select which function you would like:</p>
        <Checkbox label="Action Items" onChange={(c) => c && uncheckOthers(1)} checked={isChecked1} />
        <Checkbox label="Summarizing" onChange={(c) => c && uncheckOthers(2)} checked={isChecked2} />
        <Checkbox label="Message by message breakdown" onChange={(c) => c && uncheckOthers(3)} checked={isChecked3} />
        <br></br>
        <button
          className={`btn ${isGoButtonDisabled ? 'btn-disabled' : 'btn-primary'} go-button`}
          onClick={handleDone}
          disabled={isGoButtonDisabled}
        >
          {isLoading ? 'Analyzing...' : 'Go'}
        </button>

      </div>

      {error && (
        <div className="error-message">
          <p>Error: {error}</p>
        </div>
      )}

      {responseText && (
        <div className="response-container">
          <h3>Analysis Result:</h3>
          <div className="response-text">{responseText}</div>
        </div>
      )}

      <br></br>
      {responseText && (
      <button
        className={`btn ${isSuggestButtonDisabled ? 'btn-disabled' : 'btn-primary'}`}
        onClick={handleSuggestedReply}
        disabled={isSuggestButtonDisabled}
      >
        {isGeneratingReply ? "Generating..." : "Suggest a Reply"}
      </button>
    )}


      {suggestedReply && (
        <div className="response-container">
          <h3>Suggested Reply:</h3>
          <div className="response-text">{suggestedReply}</div>
        </div>
      )}

    </div>
  );
}

export default MainScreen;