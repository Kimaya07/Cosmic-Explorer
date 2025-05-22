import { Star, Moon, Sun, Rocket, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

const LandingPage = ({ onEnter }) => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    // Generate random stars
    const starCount = 50;
    const newStars = [];

    for (let i = 0; i < starCount; i++) {
      newStars.push({
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: Math.random() * 4 + 1,
        animationDuration: `${Math.random() * 3 + 2}s`,
      });
    }

    setStars(newStars);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-black via-blue-950 to-purple-950 text-white p-4 overflow-hidden">
      {/* Stars background */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            top: star.top,
            left: star.left,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: Math.random() * 0.7 + 0.3,
            animation: `twinkle ${star.animationDuration} infinite ease-in-out`,
          }}
        />
      ))}

      {/* Moving planets */}
      <div className="absolute top-1/4 left-1/4 opacity-20">
        <div
          className="w-16 h-16 rounded-full bg-orange-400"
          style={{
            animation: "orbit 20s infinite linear",
          }}
        />
      </div>

      <div className="absolute bottom-1/4 right-1/4 opacity-30">
        <div
          className="w-12 h-12 rounded-full bg-blue-400"
          style={{
            animation: "orbit 15s infinite linear reverse",
          }}
        />
      </div>

      <div className="absolute top-3/4 left-1/3 opacity-20">
        <div
          className="w-24 h-24 rounded-full bg-red-400"
          style={{
            animation: "orbit 25s infinite linear",
          }}
        />
      </div>

      {/* Content area */}
      <div className="text-center max-w-2xl mx-auto relative z-10">
        <div className="mb-6 flex justify-center relative">
          <div className="absolute w-32 h-32 rounded-full bg-purple-400 blur-3xl opacity-20" />
          <Rocket size={56} className="text-purple-300" />
        </div>

        <h1 className="text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-300 to-blue-400">
          Cosmic Explorer
        </h1>

        <p className="text-xl mb-8 text-gray-200">
          Journey through the cosmos and discover the wonders of our universe
        </p>

        <div className="flex items-center justify-center">
          <div className="relative group">
            <button
              onClick={onEnter}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-4 px-8 rounded-full flex items-center justify-center transition-all duration-300 hover:from-purple-700 hover:to-blue-700 shadow-lg shadow-purple-500/30"
            >
              <span className="mr-2">Launch Expedition</span>
              <Rocket
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                size={20}
              />
            </button>
            <div className="absolute -z-10 inset-0 bg-purple-600 blur-xl opacity-30 rounded-full"></div>
          </div>
        </div>

        {/* Constellation */}
        <div className="mt-20 relative">
          <div className="absolute top-0 left-0 w-full h-full">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <line
                x1="20%"
                y1="50%"
                x2="45%"
                y2="50%"
                stroke="rgba(148, 163, 184, 0.2)"
                strokeWidth="1"
              />
              <line
                x1="55%"
                y1="50%"
                x2="80%"
                y2="50%"
                stroke="rgba(148, 163, 184, 0.2)"
                strokeWidth="1"
              />
            </svg>
          </div>
        </div>

        <div className="mt-12 py-4 text-sm text-gray-400">
          Embark on a journey beyond the stars
        </div>
      </div>

      {/* Shooting star animation */}
      <div
        className="absolute -top-4 -left-4 w-12 h-1 bg-gradient-to-r from-transparent to-white transform "
        style={{
          animation: "shootingStar 4s infinite linear",
          animationDelay: "2s",
        }}
      />

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 1;
          }
        }

        @keyframes orbit {
          from {
            transform: rotate(0deg) translateX(100px) rotate(0deg);
          }
          to {
            transform: rotate(360deg) translateX(100px) rotate(-360deg);
          }
        }

        @keyframes shootingStar {
          0% {
            transform: translateX(0) translateY(0) rotate(45deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          100% {
            transform: translateX(100vw) translateY(100vh) rotate(45deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
