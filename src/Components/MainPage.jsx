import { useEffect, useState, useRef } from "react";
import Header from "./Header";
import FactCard from "./FactCard";
import nasaApiService from "./NasaApi";
import { Star, Loader, AlertTriangle, ChevronLeft } from "lucide-react";

const MainPage = ({ onReturnToLanding }) => {
  // Add prop here
  const [facts, setFacts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stars, setStars] = useState([]);
  const containerRef = useRef(null);

  // Generate stars for the background
  useEffect(() => {
    const generateStars = () => {
      const starCount = 70;
      const newStars = [];

      for (let i = 0; i < starCount; i++) {
        newStars.push({
          id: i,
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.7 + 0.3,
          animationDuration: `${Math.random() * 5 + 2}s`,
          animationDelay: `${Math.random() * 2}s`,
        });
      }

      setStars(newStars);
    };

    generateStars();
  }, []);

  // Fetch NASA APOD data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await nasaApiService.fetchMultipleApodEntries(5); // Fetch 5 facts
        setFacts(data);
      } catch (err) {
        console.error(err);
        setFacts(nasaApiService.getFallbackData()); // Fallback on error
        setError("Failed to fetch from NASA API. Showing fallback data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getNextFact = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % facts.length);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-blue-950 to-purple-950 flex flex-col items-center justify-center">
        <div className="relative">
          <div className="absolute w-32 h-32 rounded-full bg-purple-500 blur-3xl opacity-20"></div>
          <Loader className="w-12 h-12 text-purple-300 animate-spin" />
        </div>
        <p className="text-purple-300 mt-4 font-light">
          Connecting to deep space...
        </p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gradient-to-b from-black via-blue-950 to-purple-950 text-white p-4 relative overflow-hidden"
    >
      {/* Animated stars background */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            top: star.top,
            left: star.left,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animation: `twinkle ${star.animationDuration} infinite ease-in-out`,
            animationDelay: star.animationDelay,
          }}
        />
      ))}

      {/* Nebula effects */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-pink-500 mix-blend-screen opacity-10 blur-3xl"></div>
      <div className="absolute bottom-1/3 right-1/3 w-80 h-80 rounded-full bg-blue-500 mix-blend-screen opacity-10 blur-3xl"></div>

      {/* Saturn-like ring */}
      <div className="absolute top-3/4 -left-20 w-40 h-40">
        <div className="relative w-full h-full">
          <div className="absolute w-full h-full rounded-full bg-yellow-600 opacity-20"></div>
          <div className="absolute w-60 h-16 bg-yellow-400 opacity-10 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-12"></div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto pt-8 relative z-10">
        <Header />

        {error && (
          <div className="bg-red-900 bg-opacity-40 rounded-lg p-3 mb-4 flex items-center border border-red-700">
            <AlertTriangle className="text-red-400 mr-2" size={16} />
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        <FactCard
          fact={facts[currentIndex].fact}
          image={facts[currentIndex].image}
          onNextFact={getNextFact}
        />

        {/* Cosmic indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {facts.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-purple-400 scale-125"
                  : "bg-gray-600"
              }`}
            />
          ))}
        </div>

        {/* Constellation footer */}
        <div className="mt-12 flex justify-center opacity-50">
          <div className="relative">
            <Star
              size={10}
              className="text-white absolute"
              style={{ top: "0px", left: "30px" }}
            />
            <Star
              size={8}
              className="text-white absolute"
              style={{ top: "15px", left: "10px" }}
            />
            <Star
              size={12}
              className="text-white absolute"
              style={{ top: "20px", left: "50px" }}
            />
            <Star
              size={9}
              className="text-white absolute"
              style={{ top: "5px", left: "70px" }}
            />
            <svg width="100" height="30" xmlns="http://www.w3.org/2000/svg">
              <line
                x1="10"
                y1="15"
                x2="30"
                y2="0"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="0.5"
              />
              <line
                x1="30"
                y1="0"
                x2="50"
                y2="20"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="0.5"
              />
              <line
                x1="50"
                y1="20"
                x2="70"
                y2="5"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="0.5"
              />
            </svg>
          </div>
        </div>

        {/* Back button with navigation */}
        <div className="absolute bottom-3 "
        >
          <button
            onClick={onReturnToLanding}
            className="group flex items-center space-x-2 bg-black bg-opacity-60 hover:bg-opacity-80 text-purple-300 hover:text-purple-200 px-3 py-2 sm:px-4 sm:py-2 rounded-full backdrop-blur-sm border border-purple-500 border-opacity-50 transition-all duration-300 min-h-12 sm:min-h-auto shadow-lg"
          >
            <ChevronLeft
              size={18}
              className="group-hover:-translate-x-1 transition-transform duration-300 flex-shrink-0"
            />
            <span className="text-sm sm:text-base whitespace-nowrap">
              Return to Launch
            </span>
          </button>

          {/* Glow effect */}
          <div className="absolute inset-0 -z-10 bg-purple-500 opacity-20 blur-md rounded-full"></div>
        </div>
      </div>

      {/* Shooting star animation */}
      <div
        className="absolute -top-4 -left-4 w-16 h-1 bg-gradient-to-r from-transparent to-white transform "
        style={{
          animation: "shootingStar 8s infinite linear",
          animationDelay: "3s",
        }}
      />

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.2);
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

export default MainPage;
