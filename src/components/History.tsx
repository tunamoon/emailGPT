import React, {useState, useEffect} from "react";
import "../App.css";

export type HistoryItem = {
    id: string;
    timestamp: number;
    emailContent: string;
    analysisResult: string;
    analysisType: string;
};

type Props = {
    onSelectHistoryItem: (item: HistoryItem) => void;
    onClearHistory: () => void;
};

export default function History({ onSelectHistoryItem, onClearHistory }: Props) {
    const [historyItems, setHistoryItems] = useState<HistoryItem[]>([]);

    useEffect(() => {
        loadHistory();
    }, []);

    const loadHistory = () => {
        chrome.storage.local.get(['emailHistory'], (result) => {
            if (result.emailHistory && Array.isArray(result.emailHistory)) {
                setHistoryItems(result.emailHistory);
            }
        });
    };

    const handleClearHistory = () => {
        if (window.confirm('Are you sure you want to clear all history?')) {
            chrome.storage.local.set({ emailHistory: [] }, () => {
                setHistoryItems([]);
                onClearHistory();
            });
        }
    };

    // Format timestamp to readable date
    const formatDate = (timestamp: number) => {
        const date = new Date(timestamp);
        return date.toLocaleString();
    };

    // Get a short preview of email content
    const getEmailPreview = (content: string, maxLength: number = 50) => {
        if (content.length <= maxLength) return content;
        return content.substring(0, maxLength) + '...';
    };

    // Get analysis type display name
    const getAnalysisTypeDisplay = (type: string) => {
        switch (type) {
            case 'action-items':
                return 'Action Items';
            case 'summarize':
                return 'Summary';
            case 'message-breakdown':
                return 'Message Breakdown';
            default:
                return 'Analysis';
        }
    };

    if (historyItems.length === 0) {
        return (
            <div className="history-container">
                <h2>Analysis History</h2>
                <p>No history items yet. Analyses will appear here after you process emails.</p>
            </div>
        );
    }

    return (
        <div className="history-container">
            <h2>Analysis History</h2>
            <div className="history-list">
                {historyItems.map((item) => (
                    <div 
                        key={item.id} 
                        className="history-item"
                        onClick={() => onSelectHistoryItem(item)}
                    >
                        <div className="history-item-header">
                            <span className="history-item-type">{getAnalysisTypeDisplay(item.analysisType)}</span>
                            <span className="history-item-date">{formatDate(item.timestamp)}</span>
                        </div>
                        <div className="history-item-preview">
                            {getEmailPreview(item.emailContent)}
                        </div>
                    </div>
                ))}
            </div>
            <button onClick={handleClearHistory} className="clear-history-button">
                Clear History
            </button>
        </div>
    );
}