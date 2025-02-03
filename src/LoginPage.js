import React, { useState, useEffect } from "react";
import { AlertCircle, Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const LoginPage = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [isDark, setIsDark] = useState(true); // Default to dark theme
  const [error, setError] = useState("");
  const [showWelcome, setShowWelcome] = useState(true);
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    // Load Vazirmatn font dynamically
    const link = document.createElement('link');
    link.href = 'https://cdn.jsdelivr.net/npm/vazirmatn@33.0.0/Vazirmatn-font-face.css';
    link.rel = 'stylesheet';
    link.onload = () => setFontLoaded(true);
    document.head.appendChild(link);

    // Welcome message timer
    const timer = setTimeout(() => setShowWelcome(false), 3000);
    
    // Cleanup
    return () => {
      clearTimeout(timer);
      document.head.removeChild(link);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (credentials.username === "admin" && credentials.password === "admin") {
      setError("");
      onLogin(credentials);
    } else {
      setError("نام کاربری یا رمز عبور اشتباه است");
    }
  };

  return (
    <div 
      className={`min-h-screen transition-colors duration-500 ${
        isDark 
          ? "bg-gradient-to-br from-gray-900 to-gray-800" 
          : "bg-gradient-to-br from-blue-50 to-blue-100"
      } flex items-center justify-center p-4`}
      style={{ 
        fontFamily: 'Vazirmatn, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' 
      }}
    >
      {/* Add fallback font styles */}
      <style jsx global>{`
        @import url('https://cdn.jsdelivr.net/npm/vazirmatn@33.0.0/Vazirmatn-font-face.css');
        
        body {
          font-family: 'Vazirmatn', system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
        }
      `}</style>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className={`w-full max-w-md relative ${
          isDark 
            ? "bg-gray-800 border border-gray-700 shadow-2xl" 
            : "bg-white shadow-xl"
        } rounded-2xl p-8 space-y-6`}
      >
        {/* Theme Toggle */}
        <button
          onClick={() => setIsDark(!isDark)}
          className={`absolute top-4 right-4 p-2 rounded-full transition-all duration-300 hover:rotate-12 ${
            isDark 
              ? "bg-gray-700 text-yellow-400 hover:bg-gray-600" 
              : "bg-blue-100 text-gray-600 hover:bg-blue-200"
          }`}
        >
          {isDark ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
        </button>

        <div className="text-center">
          <h1 className={`text-4xl font-bold mb-2 ${
            isDark ? "text-white" : "text-blue-800"
          }`}>
            TelYab
          </h1>
          <p className={`text-sm ${
            isDark ? "text-gray-400" : "text-gray-500"
          }`}>
            ورود به سیستم
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="group">
            <input
              type="text"
              placeholder="نام کاربری"
              className={`w-full p-3 rounded-xl border-2 transition-all duration-300 ${
                isDark
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                  : "border-blue-200 focus:border-blue-400 focus:ring-blue-400"
              } focus:ring-2 focus:outline-none`}
              value={credentials.username}
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              dir="rtl"
            />
          </div>

          <div className="group">
            <input
              type="password"
              placeholder="رمز عبور"
              className={`w-full p-3 rounded-xl border-2 transition-all duration-300 ${
                isDark
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                  : "border-blue-200 focus:border-blue-400 focus:ring-blue-400"
              } focus:ring-2 focus:outline-none`}
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              dir="rtl"
            />
          </div>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className={`flex items-center gap-2 text-sm ${
                  isDark ? "text-red-400" : "text-red-500"
                }`}
              >
                <AlertCircle size={16} />
                <span>{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`w-full p-3 rounded-xl transition-all duration-300 ${
              isDark 
                ? "bg-blue-600 hover:bg-blue-500 text-white" 
                : "bg-blue-600 hover:bg-blue-700 text-white"
            } shadow-md hover:shadow-lg`}
            type="submit"
          >
            ورود
          </motion.button>
        </form>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-4 text-center text-xs ${
            isDark ? "text-gray-500" : "text-gray-600"
          }`}
        >
          Crafted by Mehrshad
        </motion.div>
      </motion.div>

      {/* Welcome Popup */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-full shadow-lg"
          >
            خوش آمدید! لطفا وارد شوید.
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LoginPage;