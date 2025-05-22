import { useState } from 'react';
import LandingPage from './Components/LandingPage';
import MainPage from './Components/MainPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default function AstronomyFactApp() {
  const [showLandingPage, setShowLandingPage] = useState(true);
  
  const handleEnter = () => {
    setShowLandingPage(false);
  };
  
  return (
    <div className="font-sans">
      {showLandingPage ? (
        <LandingPage onEnter={handleEnter} />
      ) : (
        <MainPage />
      )}
    </div>
  );
}