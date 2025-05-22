import { useState } from 'react';
import LandingPage from './Components/LandingPage';
import MainPage from './Components/MainPage';

export default function AstronomyFactApp() {
  const [showLandingPage, setShowLandingPage] = useState(true);
  
  const handleEnter = () => {
    setShowLandingPage(false);
  };
  
  const handleReturnToLanding = () => {
    setShowLandingPage(true);
  };
  
  return (
    <div className="font-sans">
      {showLandingPage ? (
        <LandingPage onEnter={handleEnter} />
      ) : (
        <MainPage onReturnToLanding={handleReturnToLanding} />
      )}
    </div>
  );
}