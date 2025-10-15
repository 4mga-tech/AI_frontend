import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react"; // Using lucide icons

function ChatbotButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg z-50 transition-transform transform hover:scale-110"
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </button>

      {/* Chatbot panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-gray-800 rounded-2xl shadow-xl p-4 flex flex-col z-50">
          <h3 className="text-white font-bold text-lg mb-2">Chatbot</h3>
          <div className="flex-1 overflow-y-auto mb-2">
            {/* Chat messages will go here */}
            <p className="text-gray-300">Танд ямар нэг асуулт байна уу?</p>
          </div>
          <input
            type="text"
            placeholder="Мессеж бичнэ үү..."
            className="w-full px-3 py-2 rounded-xl bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="mt-2 w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-xl text-white font-bold">
            Илгээх
          </button>
        </div>
      )}
    </>
  );
}

export default ChatbotButton;
