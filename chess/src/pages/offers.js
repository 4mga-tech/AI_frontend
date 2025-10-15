import React, { useState } from "react";
import ChatbotButton from "../components/ChatBotButton";
function Offers() {
  const [genre, setGenre] = useState("");
  const [message, setMessage] = useState("");
  const [aiResponse, setAiResponse] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!genre.trim()) {
      setMessage("Та төрөлөө оруулна уу.");
      return;
    }

    setMessage(`Таны дуртай төрөл: "${genre}"! AI-аас санал авч байна... 🎬`);
    setAiResponse([]);

    try {
      const res = await fetch("http://127.0.0.1:8000/ask-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: genre }),
      });

      const data = await res.json();

      if (Array.isArray(data.answer)) {
        setAiResponse(data.answer);
        setMessage("");
      } else {
        setMessage(data.answer);
      }
    } catch (error) {
      console.error(error);
      setMessage("⚠️ Серверээс хариу авч чадсангүй.");
    }

    setGenre("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white flex flex-col items-center p-6">
      <h2 className="text-3xl md:text-4xl font-extrabold mb-8 text-center">
        🎬 Кино санал болгоё
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-2xl shadow-lg w-full max-w-md space-y-4 transition-transform transform hover:scale-105"
      >
        <label className="block text-gray-300 font-semibold mb-1 text-lg">
          Та хамгийн дуртай кино төрлөө оруулна уу:
        </label>
        <input
          type="text"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          placeholder="Жишээ: Аймшигтай, Инээдмийн"
          className="w-full px-4 py-3 rounded-xl bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-xl font-bold text-lg transition-transform transform hover:scale-105"
        >
          Санал авах
        </button>
      </form>

      {message && (
        <p className="mt-6 text-center text-blue-400 font-medium text-lg">
          {message}
        </p>
      )}

      {aiResponse.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8 w-full max-w-6xl">
          {aiResponse.map((movie, idx) => (
            <a
              key={idx}
              href={movie.imdb_url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <img
  src={
    movie.poster && movie.poster.startsWith("http")
      ? movie.poster
      : "/no-image.png"
  }
  alt={movie.title}
  className="w-full h-72 sm:h-80 md:h-96 object-cover"
/>


              <div className="p-4 text-center">
                <h3 className="text-white font-bold text-lg md:text-xl mb-2 truncate">
                  {movie.title}
                </h3>
                <p className="text-green-400 font-semibold text-md">
                  ⭐ {movie.rating}
                </p>
              </div>
            </a>
          ))}
        </div>
      )}
      <ChatbotButton/>
    </div>
  );
}

export default Offers;
