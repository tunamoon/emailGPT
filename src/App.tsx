import React, { useEffect, useState } from "react";
import ApiKeyForm from "./components/ApiKeyForm";
import MainScreen from "./components/MainScreen";
import "./App.css";

export default function App() {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // guard against running outside of Chrome Extension
    if (chrome?.storage?.local) {
      chrome.storage.local.get("apiKey", res => {
        setApiKey(res.apiKey ?? null);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

   // Clean up any old persistence data on startup
   useEffect(() => {
    if (chrome?.storage?.local && !loading) {
      chrome.storage.local.remove([
        "lastAnalysisResult", 
        "lastEmailContent", 
        "lastAnalysisType"
      ]);
    }
  }, [loading]);
  
  // 2️⃣  Helpers
  const logout = () =>
    chrome.storage.local.remove("apiKey", () => setApiKey(null));

  if (loading) return null;              // (tiny splash / skeleton optional)
  if (!apiKey) return <ApiKeyForm onSave={setApiKey} />;

  return <MainScreen onLogout={logout} apiKey={apiKey} />;
}
