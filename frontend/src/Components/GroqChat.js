import React, { useState, useEffect } from 'react';
import './GroqChat.css';

const GroqChat = () => {
    const [messages, setMessages] = useState([]);
    const [userMessage, setUserMessage] = useState('');
    const [loading, setLoading] = useState(false);

    // Load chat history from local storage when component mounts
    useEffect(() => {
        const savedMessages = localStorage.getItem('groqChatHistory');
        if (savedMessages) {
            setMessages(JSON.parse(savedMessages));
        }
    }, []);

    // Save chat history to local storage whenever it updates
    useEffect(() => {
        localStorage.setItem('groqChatHistory', JSON.stringify(messages));
    }, [messages]);

    const sendMessage = async () => {
        if (userMessage.trim() === '') return;
        setLoading(true);
        try {
            const response = await fetch('/api/groq/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMessage }),
            });
            const data = await response.json();
            setMessages([...messages, { user: userMessage, reply: data.reply }]);
            setUserMessage('');
        } catch (error) {
            console.error("Error fetching response:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !loading) {
            sendMessage();
        }
    };

    return (
        <div className="groq-chat-container">
            <div className="groq-chat-messages">
                {messages.map((msg, index) => (
                    <div key={index}>
                        <div className="groq-user-message">
                            <strong>User:</strong> {msg.user}
                        </div>
                        <div className="groq-ai-message">
                            <strong>Groq:</strong> {msg.reply}
                        </div>
                    </div>
                ))}
                {loading && (
                    <div className="groq-loading-indicator">Thinking...</div>
                )}
            </div>
            <div className="groq-input-area">
                <input
                    type="text"
                    className="groq-input-field"
                    value={userMessage}
                    onChange={(e) => setUserMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type a message..."
                    disabled={loading}
                />
                <button className="groq-send-button" onClick={sendMessage} disabled={loading}>
                    {loading ? 'Sending...' : 'Send'}
                </button>
            </div>
        </div>
    );
};

export default GroqChat;
