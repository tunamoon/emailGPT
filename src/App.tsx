import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Timer Extension</h1>
      
      <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
        <div className="text-6xl font-mono mb-8">{formatTime(time)}</div>
        
        <div className="flex gap-4">
          <button 
            onClick={() => setIsRunning(!isRunning)}
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            {isRunning ? 'Pause' : 'Start'}
          </button>
          
          <button 
            onClick={() => {
              setTime(0);
              setIsRunning(false);
            }}
            className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Reset
          </button>
        </div>
      </div>

      <p className="text-gray-600 text-center max-w-md">
        A simple timer extension to help you track time. Click start to begin timing, 
        pause to stop temporarily, and reset to start over.
      </p>
    </div>
  );
}

export default App;
