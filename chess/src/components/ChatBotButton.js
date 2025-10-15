import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";

export default function ChatbotButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Сайн уу! 🎬 Би таны кино туслах AI байна." },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { from: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    console.log("➡ User message:", input);
    setInput("");

    try {
      let endpoint = "/chat-ai";

      // Decide endpoint based on message content
      if (
        input.toLowerCase().includes("recommend") ||
        input.toLowerCase().includes("жанр") ||
        input.toLowerCase().includes("төрөл")
      ) {
        endpoint = "/ask-ai"; // use IMDb recommender if it's about genre
      }

      console.log("🌐 Sending request to endpoint:", endpoint);

      // Ensure leading slash
      const endpointUrl = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;

      const res = await fetch(`http://127.0.0.1:8000${endpointUrl}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      console.log("⏳ Waiting for response...");
      const data = await res.json();
      console.log("✅ Received response:", data);

      // Check if AI returned a list of movies
      if (Array.isArray(data.answer)) {
        const movieList = data.answer
          .map(
            (m) =>
              `🎥 ${m.title} (${m.rating}⭐)\n${m.imdb_url}`
          )
          .join("\n\n");
        console.log("🎬 Movie list:", movieList);

        setMessages((prev) => [
          ...prev,
          { from: "bot", text: `Топ кинонууд:\n${movieList}` },
        ]);
      } else {
        // Text-based AI response
        const aiText = data.answer || data.response || "AI replied nothing";
  console.log("📝 AI text response:", aiText);
  setMessages((prev) => [...prev, { from: "bot", text: aiText }]);
      }
    } catch (error) {
      console.error("⚠️ Error sending request:", error);
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "⚠️ Сервертэй холбогдож чадсангүй." },
      ]);
    }
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg z-50 transition-transform transform hover:scale-110"
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-gray-800 rounded-2xl shadow-xl p-4 flex flex-col z-50">
          <h3 className="text-white font-bold text-lg mb-2">🎬 Кино туслах</h3>

          <div className="flex-1 overflow-y-auto mb-2 space-y-2">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-2 rounded-xl max-w-[80%] ${
                  msg.from === "user"
                    ? "bg-blue-600 text-white self-end ml-auto"
                    : "bg-gray-700 text-gray-100"
                }`}
              >
                <pre className="whitespace-pre-wrap font-sans">{msg.text}</pre>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex space-x-2">
            <input
  type="text"
  value={input}
  onChange={(e) => setInput(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  }}
  placeholder="Мессеж бичнэ үү..."
  className="flex-1 px-3 py-2 rounded-xl bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
/>

            <button
              onClick={handleSend}
              className="bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-xl font-bold text-white"
            >
              Илгээх
            </button>
          </div>
        </div>
      )}
    </>
  );
}
