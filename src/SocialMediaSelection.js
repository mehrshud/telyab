import React, { useState } from 'react';
import { Moon, Sun, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';

// Icons for social media platforms
const SocialMediaIcon = ({ platform }) => {
  switch (platform) {
    case 'telegram':
      return (
        <svg className="w-8 h-8" viewBox="0 0 24 24">
          <path 
            fill="currentColor" 
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.03-1.99 1.27-5.62 3.72-.53.36-1.01.54-1.44.53-.47-.01-1.38-.26-2.06-.48-.83-.27-1.49-.42-1.43-.89.03-.25.38-.51 1.05-.78 4.12-1.79 6.87-2.97 8.26-3.54 3.93-1.62 4.75-1.9 5.27-1.91.12 0 .37.03.54.17.14.12.18.28.2.45-.01.05.01.13 0 .21z"
          />
        </svg>
      );
    case 'instagram':
      return (
        <svg className="w-8 h-8" viewBox="0 0 24 24">
          <path 
            fill="currentColor" 
            d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153.509.5.902 1.105 1.153 1.772.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428-.254.66-.598 1.216-1.153 1.772-.5.509-1.105.902-1.772 1.153-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465-.66-.254-1.216-.598-1.772-1.153-.509-.5-.902-1.105-1.153-1.772-.247-.637-.415-1.363-.465-2.428-.047-1.066-.06-1.405-.06-4.122 0-2.717.01-3.056.06-4.122.05-1.065.218-1.79.465-2.428.254-.66.598-1.216 1.153-1.772.5-.509 1.105-.902 1.772-1.153.637-.247 1.363-.415 2.428-.465 1.066-.047 1.405-.06 4.122-.06M12 0C9.237 0 8.867.01 7.784.06 6.701.11 5.785.287 4.985.547c-.79.262-1.48.652-2.074 1.147-.695.695-1.227 1.489-1.547 2.373-.26.8-.437 1.716-.487 2.8-.047 1.082-.06 1.452-.06 4.233 0 2.78.01 3.15.06 4.233.05 1.083.227 2 .487 2.8.27.8.652 1.52 1.147 2.113.6.595 1.314 1.073 2.113 1.387.8.26 1.716.437 2.8.487 1.082.047 1.452.06 4.232.06 2.78 0 3.15-.01 4.233-.06 1.083-.05 2-.227 2.8-.487.8-.27 1.52-.652 2.113-1.147.595-.6 1.073-1.314 1.387-2.113.26-.8.437-1.716.487-2.8.047-1.082.06-1.452.06-4.232 0-2.78-.01-3.15-.06-4.233-.05-1.083-.227-2-.487-2.8-.27-.8-.652-1.52-1.147-2.113-.6-.595-1.314-1.073-2.113-1.387-.8-.26-1.716-.437-2.8-.487-1.082-.047-1.452-.06-4.232-.06h-.06zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"
          />
        </svg>
      );
    case 'linkedin':
      return (
        <svg className="w-8 h-8" viewBox="0 0 24 24">
          <path 
            fill="currentColor" 
            d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"
          />
        </svg>
      );
    case 'facebook':
      return (
        <svg className="w-8 h-8" viewBox="0 0 24 24">
          <path 
            fill="currentColor" 
            d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 008.44-9.9c0-5.53-4.5-10.02-10-10.02z"
          />
        </svg>
      );
    default:
      return null;
  }
};

const SocialMediaSelection = ({ onSelect, onLogout }) => {
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem('darkMode');
    return stored ? JSON.parse(stored) : true;
  });

  const toggleDarkMode = () => {
    setDarkMode(prevMode => {
      localStorage.setItem('darkMode', !prevMode);
      return !prevMode;
    });
  };

  const socialMediaOptions = [
    { id: 'telegram', name: 'تلگرام', color: 'blue' },
    { id: 'instagram', name: 'اینستاگرام', color: 'purple' },
    { id: 'linkedin', name: 'لینکدین', color: 'blue' },
    { id: 'facebook', name: 'فیسبوک', color: 'indigo' }
  ];

  return (
    <div 
      dir="rtl" 
      className={`min-h-screen transition-colors duration-300 font-vazir ${
        darkMode 
          ? 'bg-gradient-to-br from-gray-900 to-gray-800 text-white' 
          : 'bg-gradient-to-br from-blue-50 to-blue-100 text-gray-900'
      } flex items-center justify-center p-4`}
    >
      <style jsx global>{`
        @import url('https://cdn.jsdelivr.net/gh/rastikerdar/vazir-font@v30.1.0/dist/font-face.css');
        .font-vazir {
          font-family: 'Vazir', system-ui, -apple-system, sans-serif;
        }
      `}</style>

      {/* Header Controls */}
      <div className="absolute top-4 left-4 flex items-center space-x-4">
        <motion.button
          onClick={onLogout}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`p-2 rounded-full ${
            darkMode 
              ? 'bg-gray-700 text-red-400' 
              : 'bg-red-100 text-red-800'
          }`}
        >
          <LogOut />
        </motion.button>
        
        <motion.button
          onClick={toggleDarkMode}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`p-2 rounded-full ${
            darkMode 
              ? 'bg-gray-700 text-yellow-400' 
              : 'bg-blue-100 text-gray-800'
          }`}
        >
          {darkMode ? <Sun /> : <Moon />}
        </motion.button>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className={`w-full max-w-md mx-auto ${
          darkMode 
            ? 'bg-gray-800 border border-gray-700' 
            : 'bg-white'
        } shadow-2xl rounded-2xl p-6 space-y-6`}
      >
        {/* Police Logo */}
        <motion.div 
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="flex justify-center"
        >
          <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center">
            <span className="text-3xl font-bold text-white">فتا</span>
          </div>
        </motion.div>

        {/* Header */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center"
        >
          <h1 className={`text-2xl font-bold ${darkMode ? 'text-blue-300' : 'text-blue-800'}`}>
            انتخاب شبکه اجتماعی
          </h1>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} mt-2`}>
            لطفاً شبکه اجتماعی مورد نظر خود را انتخاب کنید
          </p>
        </motion.div>

        {/* Social Media Options */}
        <div className="grid grid-cols-2 gap-4">
          {socialMediaOptions.map((platform) => (
            <motion.button
              key={platform.id}
              onClick={() => onSelect(platform.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex flex-col items-center justify-center p-6 rounded-xl 
                ${darkMode 
                  ? `bg-gray-700 hover:bg-gray-600 text-${platform.color}-400` 
                  : `bg-${platform.color}-100 hover:bg-${platform.color}-200 text-${platform.color}-700`
                } transition-all duration-300`}
            >
              <div className={`text-${platform.color}-500`}>
                <SocialMediaIcon platform={platform.id} />
              </div>
              <span className="mt-2 font-medium">{platform.name}</span>
            </motion.button>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-gray-500 pt-4">
          تمامی حقوق برای پلیس فتا یزد محفوظ است
        </div>
      </motion.div>
    </div>
  );
};

export default SocialMediaSelection;