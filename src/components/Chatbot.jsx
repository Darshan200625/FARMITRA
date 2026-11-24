
import { useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function ChatBot() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      sender: "FarmMitra",
      text: "🌱 Hello! I am FarmMitra, your AI-powered agriculture assistant. Ask me anything about farming."
    }
  ]);

  const sendMessage = async () => {
    const currentMessage = message.trim();

    if (!currentMessage || loading) return;

    setMessages((prev) => [
      ...prev,
      { sender: "You", text: currentMessage }
    ]);

    setMessage("");
    setLoading(true);

    try {
      const response = await axios.post(
        `${API_URL}/api/chat`,
        {
          message: currentMessage
        },
        {
          headers: {
            "Content-Type": "application/json"
          },
          timeout: 60000
        }
      );

      const reply = response.data?.reply;

      if (!reply) {
        throw new Error("Backend returned an empty AI response.");
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: "FarmMitra",
          text: reply
        }
      ]);

    } catch (error) {
      console.error("FarmMitra Chat Error:", error);

      const errorText =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Unable to connect to FarmMitra AI.";

      setMessages((prev) => [
        ...prev,
        {
          sender: "FarmMitra",
          text: `Sorry, something went wrong: ${errorText}`
        }
      ]);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-green-50 flex flex-col">

      {/* Header */}
      <header className="bg-green-800 text-white p-5 shadow-lg">
        <h1 className="text-3xl font-bold">🌾 FarmMitra AI</h1>
        <p className="text-green-100 mt-1">
          Your Smart Agriculture Assistant
        </p>
      </header>

      {/* Chat Messages */}
      <main className="flex-1 overflow-y-auto p-4 md:p-6">

        <div className="max-w-4xl mx-auto">

          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-5 flex ${
                msg.sender === "You"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`px-5 py-4 rounded-2xl max-w-[85%] md:max-w-xl shadow-sm ${
                  msg.sender === "You"
                    ? "bg-green-700 text-white"
                    : "bg-white text-gray-800"
                }`}
              >
                <p className="font-bold mb-2">
                  {msg.sender}
                </p>

                <p className="whitespace-pre-wrap leading-relaxed">
                  {msg.text}
                </p>
              </div>
            </div>
          ))}

          {loading && (
            <div className="mb-5 flex justify-start">
              <div className="bg-white px-5 py-4 rounded-2xl shadow-sm">
                <p className="font-semibold text-green-800">
                  FarmMitra is thinking...
                </p>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* Input Section */}
      <footer className="bg-white p-4 shadow-lg">
        <div className="max-w-4xl mx-auto flex gap-3">

          <input
            type="text"
            placeholder="Ask anything about farming..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            disabled={loading}
            className="flex-1 border border-gray-300 rounded-xl p-4 outline-none focus:ring-2 focus:ring-green-500"
          />

          <button
            onClick={sendMessage}
            disabled={loading || !message.trim()}
            className="bg-green-700 text-white px-6 rounded-xl hover:bg-green-800 disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send"}
          </button>

        </div>
      </footer>

    </div>
  );
}

export default ChatBot;
