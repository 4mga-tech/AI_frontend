import React, { useState } from "react";

function Offers() {
  const [genre, setGenre] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (genre.trim() === "") {
      setMessage("Та төрөлөө оруулна уу.");
      return;
    }
    setMessage(`Таны дуртай төрөл: "${genre}"! Бид танд санал болгож болох кино жагсаалт бэлдэнэ 🎬`);
    setGenre("");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
      <h2 className="text-2xl font-bold mb-6">Кино санал болгоё 🎉</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md space-y-4"
      >
        <label className="block text-gray-300 font-semibold mb-1">
          Та хамгийн дуртай кино төрлөө оруулна уу:
        </label>
        <input
          type="text"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          placeholder="Жишээ: Аймшигтай, Инээдмийн, Уран зөгнөл"
          className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-lg font-semibold transition"
        >
          Санал авах
        </button>
      </form>

      {message && (
        <p className="mt-6 text-center text-blue-400 font-medium">{message}</p>
      )}
    </div>
  );
}

export default Offers;
