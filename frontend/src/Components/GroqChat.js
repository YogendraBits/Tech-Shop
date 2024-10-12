import React, { useState, useEffect, useRef } from 'react';
import './GroqChat.css';
import { FaMoon, FaSun, FaTrash } from 'react-icons/fa'; // Import icons for theme toggle and clear chat

const GroqChat = () => {
    const [messages, setMessages] = useState([]);
    const [userMessage, setUserMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [isTyping, setIsTyping] = useState(false); // For typing indicator
    const [theme, setTheme] = useState("light"); // Light/Dark theme state
    const messagesEndRef = useRef(null); // Ref for scrolling to the latest message

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
        setIsTyping(true); // Set typing to true when sending message
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
            setIsTyping(false); // Reset typing state
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !loading) {
            sendMessage();
        }
    };

    const handleClear = () => {
        setMessages([]); // Clear state
        localStorage.removeItem('groqChatHistory'); // Clear local storage
    };

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    // Scroll to the latest message
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);

    return (
        <div className={`groq-chat-container ${theme}`}>
            <div className="groq-chat-header">
                <button onClick={toggleTheme} className="theme-toggle-button">
                    {theme === "light" ? <FaMoon /> : <FaSun />}
                </button>

                <button onClick={handleClear} className="clear-button">
                    <FaTrash />
                </button>
            </div>
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
                {isTyping && (
                    <div className="groq-loading-indicator">Thinking...</div>
                )}
                <div ref={messagesEndRef} />
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
