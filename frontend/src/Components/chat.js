import React, { useState, useEffect, useRef } from "react";
import './Chat.css';

const Chat = () => {
    const [message, setMessage] = useState("");
    const [responses, setResponses] = useState([]);
    const [loading, setLoading] = useState(false);
    const chatEndRef = useRef(null);

    const handleSend = async () => {
        if (!message) return;

        setLoading(true); // Set loading to true when sending message

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
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
            setLoading(false); // Reset loading state
        }
    };

    // Define the handleKeyDown function here
    const handleKeyDown = (event) => {
        if (event.key === "Enter" && !loading) {
            event.preventDefault(); // Prevent default action (new line)
            handleSend(); // Call handleSend if Enter is pressed
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
                            <strong>AI:</strong> {res.ai}
                        </div>
                        <hr />
                    </div>
                ))}
                {loading && <p className="loading-indicator">Loading...</p>}
                <div ref={chatEndRef} />
            </div>
            <div className="input-area">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown} // Added onKeyDown event handler
                    placeholder="Type your message..."
                    disabled={loading}
                    className="input-field"
                />
                <button onClick={handleSend} disabled={loading} className="send-button">Send</button>
            </div>
        </div>
    );
};

export default Chat;
