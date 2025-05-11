import React, { useState, useEffect } from 'react';
import LoginPage from './LoginPage';
import UsernameLookup from './UsernameLookup';
import SocialMediaSelection from './SocialMediaSelection';
import MaintenancePopup from './MaintenancePopup';
import { AnimatePresence, motion } from 'framer-motion';

export const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const stored = localStorage.getItem('isLoggedIn');
    return stored ? JSON.parse(stored) : false;
  });
  
  const [selectedPlatform, setSelectedPlatform] = useState(() => {
    const stored = localStorage.getItem('selectedPlatform');
    return stored ? JSON.parse(stored) : null;
  });
  
  const [showMaintenancePopup, setShowMaintenancePopup] = useState(false);
  
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem('darkMode');
    return stored ? JSON.parse(stored) : true;
  });

  useEffect(() => {
    if (isLoggedIn) {
      setShowMaintenancePopup(true);
    }
  }, [isLoggedIn]);

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setSelectedPlatform(null);
    localStorage.setItem('isLoggedIn', false);
    localStorage.removeItem('selectedPlatform');
  };
  
  const handleSelectPlatform = (platform) => {
    setSelectedPlatform(platform);
    localStorage.setItem('selectedPlatform', JSON.stringify(platform));
  };
  
  const handleBackToSelection = () => {
    setSelectedPlatform(null);
    localStorage.removeItem('selectedPlatform');
  };

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {!isLoggedIn ? (
          <motion.div
            key="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <LoginPage onLogin={handleLogin} />
          </motion.div>
        ) : !selectedPlatform ? (
          <motion.div
            key="platform-selection"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <SocialMediaSelection onSelect={handleSelectPlatform} onLogout={handleLogout} />
          </motion.div>
        ) : (
          <motion.div
            key="lookup"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <UsernameLookup 
              onLogout={handleLogout} 
              onBack={handleBackToSelection}
              platform={selectedPlatform} 
            />
          </motion.div>
        )}
      </AnimatePresence>
      <MaintenancePopup 
        isVisible={showMaintenancePopup} 
        onClose={() => setShowMaintenancePopup(false)}
        darkMode={darkMode}
      />
    </div>
  );
};

export default App;