import React from "react";
import movie1 from "../assets/images/movie1.jpg";
import movie3 from "../assets/images/movie3.jpg";
import movie4 from "../assets/images/movie4.jpg";
import movie5 from "../assets/images/movie5.png";
import { useNavigate } from "react-router-dom";
function Home() {
  const movies = [
    { title: "Zura 1", img: movie1 },
    { title: "Mash nuuts", img: movie3 },
    { title: "Amgaa in da house", img: movie4 },
    { title: "Tsuivan", img: movie5 },
  ];
const navigate = useNavigate();

 const goToOffers = () => {
    navigate("/offers"); 
  };
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      <section className="relative bg-gray-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center px-6 py-16">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">xopom.com </h1>
            <p className="text-gray-300 mb-6">
              2010 оны эхээр дуу болгоны дундуур явдаг байсан даа
            </p>
            <button onClick={goToOffers} className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition">
              Эхлэх
            </button>
          </div>
          <div className="md:w-1/2">
            <img
              src={movie1}
              alt="Hero Movie"
              className="rounded-lg shadow-lg w-full"
            />
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-8">Алдартай кино</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {movies.map((movie, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:scale-105 transform transition"
            >
              <img
                src={movie.img}
                alt={movie.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold">{movie.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="mt-auto bg-gray-800 text-gray-400 py-6 text-center">
        &copy; 2025 Хиймэл оюун ухаан бие даалт
      </footer>
    </div>
  );
}

export default Home;
