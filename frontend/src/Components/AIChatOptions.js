import React from 'react';
import './AIChatOptions.css';

const AIChatOptions = ({ onSelect, onClose }) => {
    return (
        <div className="ai-chat-options">
            <button onClick={() => onSelect('regular')} className="regular-chat-button">Gemini</button>
            <button onClick={() => onSelect('groq')} className="groq-chat-button">Groq</button>
            <button onClick={onClose} className="close-button">&times;</button>
        </div>
    );
};

export default AIChatOptions;
