// src/components/ApiKeyForm.tsx
import React, { useState } from "react";

type Props = { onSave: (key: string) => void };

export default function ApiKeyForm({ onSave }: Props) {
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    if (value.trim() === "") return alert("Please enter a key.");
    chrome.storage.local.set({ apiKey: value }, () => onSave(value));
  };

  return (
    <div className="p-4 w-80 space-y-3">
      <h2>Enter your API key</h2>
      <input
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        style={{ width: "100%" }}
      />
      <button onClick={handleSubmit}>Save &amp; Continue</button>
    </div>
  );
}
