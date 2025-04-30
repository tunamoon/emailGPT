import React, {useState, useEffect} from "react";
import "../App.css";

type HistoryItem = {
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