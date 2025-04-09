import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import DisclaimerModal from './components/DisclaimerModal';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import PracticeAreas from './components/PracticeAreas';
import Updates from './components/Updates';
import Clients from './components/Clients';
import Trademark from './pages/Trademarkpage';
import Footer from './components/Footer';

function App() {
  const [showDisclaimer, setShowDisclaimer] = useState(true);

  useEffect(() => {
    const hasAccepted = localStorage.getItem('disclaimerAccepted');
    if (hasAccepted === 'true') {
      setShowDisclaimer(false);
    }
  }, []);

  const handleAcceptDisclaimer = () => {
    localStorage.setItem('disclaimerAccepted', 'true');
    setShowDisclaimer(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {showDisclaimer ? (
        <DisclaimerModal onAccept={handleAcceptDisclaimer} />
      ) : (
        <>
          <Navbar />
          <main>
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Hero />
                    <About />
                    <PracticeAreas />
                    <Updates />
                    <Clients />
                    <Footer />
                  </>
                }
              />
              <Route path="/practice/trademark" element={<Trademark />} />
            </Routes>
          </main>
        </>
      )}
    </div>
  );
}

export default App;
