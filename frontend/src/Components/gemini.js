import React, { useState, useEffect, useRef } from "react";
import './gemini.css';

const Chat = () => {
    const [message, setMessage] = useState("");
    const [responses, setResponses] = useState([]);
    const [loading, setLoading] = useState(false);
    const chatEndRef = useRef(null);

    // Load chat history from local storage
    useEffect(() => {
        const savedResponses = localStorage.getItem("chatHistory");
        if (savedResponses) {
            setResponses(JSON.parse(savedResponses));
        }
    }, []);

    // Save chat history to local storage
    useEffect(() => {
        localStorage.setItem("chatHistory", JSON.stringify(responses));
    }, [responses]);

    const handleSend = async () => {
        if (!message) return;

        setLoading(true);
        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt: message }),
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await response.json();
            setResponses((prevResponses) => [
                ...prevResponses,
                { user: message, ai: data.response },
            ]);
            setMessage("");
        } catch (error) {
            console.error("Error fetching response:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter" && !loading) {
            event.preventDefault();
            handleSend();
        }
    };

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [responses, loading]);

    return (
        <div className="chat-container">
            <div className="chat-messages">
                {responses.map((res, index) => (
                    <div key={index}>
                        <div className="user-message">
                            <strong>User:</strong> {res.user}
                        </div>
                        <div className="ai-message">
                            <strong>Gemini:</strong> {res.ai}
                        </div>
                        <hr />
                    </div>
                ))}
                {loading && <p className="loading-indicator"></p>}
                <div ref={chatEndRef} />
            </div>
            <div className="input-area">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your message..."
                    disabled={loading}
                    className="input-field"
                />
                <button onClick={handleSend} disabled={loading} className="send-button">
                    {loading ? 'Sending...' : 'Send'}
                </button>
            </div>
        </div>
    );
};

export default Chat;
