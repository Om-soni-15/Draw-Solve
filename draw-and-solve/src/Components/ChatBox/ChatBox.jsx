import React, { useContext, useState } from "react";
import { StoreContext } from "../../Contexts/StoreContext";

const Chatbox = () => {

    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const { messages, setMessages, isOpen, setIsOpen } = useContext(StoreContext)

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { text: input, sender: "user" };
        setMessages([...messages, userMessage]);
        setInput("");
        setLoading(true);

        try {
            const response = await fetch(REACT_APP_BACKEND_CHAT, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message: input }),
            });

            const data = await response.json();
            console.log(data);

            setMessages((prev) => [...prev, { text: data.response, sender: "bot" }]);
        } catch (error) {
            setMessages((prev) => [...prev, { text: "Error: Unable to connect to server.", sender: "bot" }]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault(); // Prevents a new line in the input
            sendMessage();
        }
    };

    return (
        <>
            {/* Floating Chat Button */}
            <button
                onClick={toggleChat}
                className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg z-50 hover:bg-blue-700 transition-all"
            >
                💬
            </button>

            {/* Chatbox Panel */}
            <div
                className={`fixed bottom-16 right-6 w-80 shadow-xl rounded-lg transform transition-all ${isOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0 pointer-events-none"
                    } z-50`}
                style={{ background: "transparent" }} // No background color
            >
                <div className="flex flex-col h-96 border border-gray-300 rounded-lg">
                    {/* Header */}
                    <div className="bg-white p-4 flex justify-between items-center rounded-t-lg border-b">
                        <span className="font-semibold">Chat with Us</span>
                        <button onClick={toggleChat} className="text-gray-500 text-lg">✖</button>
                    </div>

                    {/* Chat Messages */}
                    <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-white">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`p-2 max-w-xs rounded-md ${msg.sender === "user" ? "bg-blue-500 text-white self-end ml-auto" : "bg-gray-200 text-black"
                                    }`}
                            >
                                {msg.text}
                            </div>
                        ))}
                        {loading && (
                            <div className="p-2 max-w-xs rounded-md bg-gray-200 text-black">Typing...</div>
                        )}
                    </div>

                    {/* Input Field */}
                    <div className="p-3 border-t flex bg-white">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown} // Listen for Enter key
                            className="flex-1 p-2 border rounded-l-md outline-none"
                            placeholder="Type a message..."
                            disabled={loading}
                        />
                        <button
                            onClick={sendMessage}
                            className="bg-blue-600 text-white p-2 rounded-r-md hover:bg-blue-700"
                            disabled={loading}
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Chatbox;
