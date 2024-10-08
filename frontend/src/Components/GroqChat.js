import React, { useState } from 'react';
import './GroqChat.css'; // Make sure to import the CSS file

const GroqChat = () => {
    const [messages, setMessages] = useState([]);
    const [userMessage, setUserMessage] = useState('');
    const [loading, setLoading] = useState(false); // Track loading state

    const sendMessage = async () => {
        if (userMessage.trim() === '') return; // Prevent sending empty messages
        setLoading(true); // Show loading spinner while fetching the response
        const response = await fetch('/api/groq/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: userMessage })
        });
        const data = await response.json();
        setMessages([...messages, { user: userMessage, reply: data.reply }]);
        setUserMessage(''); // Clear input field after sending
        setLoading(false); // Hide loading spinner after response
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !loading) {
            sendMessage(); // Trigger sendMessage when Enter is pressed
        }
    };

    return (
        <div className="groq-chat-container">
            {/* Chat Messages Area */}
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

            {/* Input Area */}
            <div className="groq-input-area">
                <input
                    type="text"
                    className="groq-input-field"
                    value={userMessage}
                    onChange={(e) => setUserMessage(e.target.value)}
                    onKeyPress={handleKeyPress} // Handle key press event
                    placeholder="Type a message..."
                    disabled={loading} // Disable input while loading
                />
                <button className="groq-send-button" onClick={sendMessage} disabled={loading}>
                    {loading ? 'Sending...' : 'Send'}
                </button>
            </div>
        </div>
    );
};

export default GroqChat;
