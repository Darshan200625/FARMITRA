
import { useState } from "react";
import axios from "axios";

function ChatBot() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "FarmMitra",
      text: "Hello! I am FarmMitra, your AI-powered smart agriculture assistant. How can I help you today?",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim() || loading) return;

    const currentMessage = message.trim();

    const userMessage = {
      sender: "You",
      text: currentMessage,
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessage("");
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/chat",
        {
          message: currentMessage,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 90000,
        }
      );

      const botMessage = {
        sender: "FarmMitra",
        text: res.data.reply || "Sorry, I could not generate a response.",
      };

      setMessages((prev) => [...prev, botMessage]);

    } catch (err) {
      console.error("FarmMitra Error:", err.response?.data || err.message);

      const errorMessage = {
        sender: "FarmMitra",
        text:
          err.response?.data?.message ||
          "Unable to connect to FarmMitra AI. Please check your backend server.",
      };

      setMessages((prev) => [...prev, errorMessage]);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-green-50 flex flex-col">

      {/* Header */}
      <div className="bg-green-700 text-white p-5 shadow-lg">
        <h1 className="text-3xl font-bold">
          🌾 FarmMitra
        </h1>
        <p className="text-green-100 mt-1">
          Your Smart Agriculture Assistant
        </p>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-6">

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-4 ${
              msg.sender === "You" ? "text-right" : "text-left"
            }`}
          >
            <div
              className={`inline-block px-4 py-3 rounded-xl max-w-xl ${
                msg.sender === "You"
                  ? "bg-green-600 text-white"
                  : "bg-white shadow"
              }`}
            >
              <p className="font-bold mb-1">
                {msg.sender}
              </p>

              <p className="whitespace-pre-wrap">
                {msg.text}
              </p>
            </div>
          </div>
        ))}

        {loading && (
          <div className="text-left mb-4">
            <div className="inline-block bg-white shadow px-4 py-3 rounded-xl">
              <p className="font-bold">FarmMitra</p>
              <p>Thinking...</p>
            </div>
          </div>
        )}

      </div>

      {/* Message Input */}
      <div className="bg-white p-5 flex gap-4 shadow-lg">

        <input
          type="text"
          className="flex-1 border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Ask anything about farming..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
          disabled={loading}
        />

        <button
          onClick={sendMessage}
          disabled={loading || !message.trim()}
          className="bg-green-700 text-white px-6 rounded-lg hover:bg-green-800 disabled:opacity-50"
        >
          {loading ? "Sending..." : "Send"}
        </button>

      </div>

    </div>
  );
}

export default ChatBot;
