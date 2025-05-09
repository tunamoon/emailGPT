import React, { useState, ChangeEvent, useEffect } from "react";
import "../App.css";
import { GeminiService, GeminiResponse } from "../GeminiService";
import History, { HistoryItem } from "./History";




interface CheckboxProps {
  label: string;
  onChange: (checked: boolean) => void;
  checked: boolean;
}

type Props = {
    onLogout: () => void;
    apiKey: string;
}
const Checkbox: React.FC<CheckboxProps> = ({ label, onChange, checked }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  return (
    <label>
      <input type="checkbox" checked={checked} onChange={handleChange} />
      {label}
    </label>
  );
};

function MainScreen({ onLogout, apiKey }: Props) {
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [isChecked3, setIsChecked3] = useState(false);
  const [textValue, setTextValue] = useState<string>("");
  const [responseText, setResponseText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isApiKeyValid, setIsApiKeyValid] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'analyze' | 'history'>('analyze');
  const [currentAnalysisType, setCurrentAnalysisType] = useState<string>("");

  // Check API key when component loads and load previous results
  useEffect(() => {
    validateApiKey();
    
    // Load previous session data if available
    chrome.storage.local.get(
      ['lastAnalysisResult', 'lastEmailContent', 'lastAnalysisType'], 
      (result) => {
        if (result.lastAnalysisResult) {
          setResponseText(result.lastAnalysisResult);
        }
        if (result.lastEmailContent) {
          setTextValue(result.lastEmailContent);
        }
        if (result.lastAnalysisType) {
          // Set the appropriate checkbox based on previously selected analysis type
          if (result.lastAnalysisType === 'action-items') uncheckOthers(1);
          if (result.lastAnalysisType === 'summarize') uncheckOthers(2);
          if (result.lastAnalysisType === 'message-breakdown') uncheckOthers(3);
        }
      }
    );
  }, [apiKey]);

  const validateApiKey = async () => {
    try {
      const geminiService = new GeminiService(apiKey);
      const validation = await geminiService.validateApiKey();
      setIsApiKeyValid(validation.valid);
      if (!validation.valid) {
        setError(`API key validation failed: ${validation.error}. Please log out and enter a valid key.`);
      }
    } catch (err) {
      setIsApiKeyValid(false);
      setError("Failed to validate API key. Please log out and try again.");
    }
  };

  const handleCheckBoxChange1 = (checked: boolean) => {
    setIsChecked1(checked);
  };
  const handleCheckBoxChange2 = (checked: boolean) => {
    setIsChecked2(checked);
  };
  const handleCheckBoxChange3 = (checked: boolean) => {
    setIsChecked3(checked);
  };

  const uncheckOthers = (except: number) => {
    setIsChecked1(except === 1);
    setIsChecked2(except === 2);
    setIsChecked3(except === 3);
  };

  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTextValue(event.target.value);
  };

  const handleDone = async () => {
    const isCheckboxSelected = isChecked1 || isChecked2 || isChecked3;
    if (!isCheckboxSelected) {
      alert("Please select one option.");
      return;
    }
    if (textValue.trim() === "") {
      alert("Please fill out the email content.");
      return;
    }
    
    // Validate API key before proceeding
    if (!isApiKeyValid) {
      setError("Your API key appears to be invalid. Please log out and enter a valid key.");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    let analysisType = "";
    if (isChecked1) analysisType = "action-items";
    if (isChecked2) analysisType = "summarize";
    if (isChecked3) analysisType = "message-breakdown";
    
    // Save the current email content and analysis type
    chrome.storage.local.set({ 
      lastEmailContent: textValue,
      lastAnalysisType: analysisType 
    });
    
    try {
      const geminiService = new GeminiService(apiKey);
      const response = await geminiService.analyzeEmail(textValue, analysisType);
      
      if (response.error) {
        setError(response.error);
      } else {
        setResponseText(response.text);
        
        // Save the result to Chrome storage
        chrome.storage.local.set({ lastAnalysisResult: response.text });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const getButtonLabel = () => {
    if (isLoading) return "Processing...";
    if (isChecked1) return "Find My Action Items";
    if (isChecked2) return "Summarize This Thread";
    if (isChecked3) return "Break Down Messages";
    return "Analyze Email";
  };

  const handleSelectHistoryItem = (item: HistoryItem) => {
    setTextValue(item.emailContent);
    setResponseText(item.analysisResult);
    setCurrentAnalysisType(item.analysisType);
    
    // Update checkboxes based on selected history item
    if (item.analysisType === 'action-items') uncheckOthers(1);
    if (item.analysisType === 'summarize') uncheckOthers(2);
    if (item.analysisType === 'message-breakdown') uncheckOthers(3);
    
    // Switch to analyze tab to show the selected history item
    setActiveTab('analyze');
  };

  const handleClearHistory = () => {
    // This is just for clearing state if needed after history is cleared
    // The actual clearing happens in the History component
  };

  return (
    <div className="App">
      <p>Breaking Chains</p>
      <div className="tabs">
        <div 
          className={`tab ${activeTab === 'analyze' ? 'active' : ''}`}
          onClick={() => setActiveTab('analyze')}
        >
          Analyze
        </div>
        <div 
          className={`tab ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          History
        </div>
      </div>
      {activeTab === 'analyze' ? (
        <>
          <label htmlFor="my-textbox">Click reply, three dots, copy and paste the email thread content underneath</label>
          <input
            type="text"
            id="my-textbox"
            value={textValue}
            onChange={handleTextChange}
            style={{ width: "400px", height: "200px", fontSize: "12px", textAlign: "left"}}
          />
          <div>
            <Checkbox
              label="Action Items"
              onChange={(checked) => checked && uncheckOthers(1)}
              checked={isChecked1}
            />
            <Checkbox
              label="Summarizing"
              onChange={(checked) => checked && uncheckOthers(2)}
              checked={isChecked2}
            />
            <Checkbox
              label="Message by message breakdown"
              onChange={(checked) => checked && uncheckOthers(3)}
              checked={isChecked3}
            />
          </div>
          
          <button onClick={handleDone} disabled={isLoading || !isApiKeyValid}>
            {getButtonLabel()}
          </button>
          <button onClick={onLogout}>Log out</button>
          <button
            onClick={() =>
                window.open(
                "https://github.com/etwitmyer/EmailGPT-Page",
                "_blank"
                )
            }
          > 
            About
          </button>

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
        </>
      ) : (
        <History 
          onSelectHistoryItem={handleSelectHistoryItem} 
          onClearHistory={handleClearHistory}
        />
      )}
    </div>
  );
}

export default MainScreen;
