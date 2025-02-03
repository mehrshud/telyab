import React, { useState } from 'react';
import { 
  Search, 
  Loader2, 
  Moon, 
  Sun, 
  CheckCircle, 
  AlertTriangle,
  RefreshCcw,
  LogOut,
  Copy
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LANG = {
  fa: {
    title: 'جستجوی نام کاربری',
    subtitle: 'ابزار تحلیل نام کاربری تلگرام',
    placeholder: 'نام کاربری را وارد کنید',
    search: 'جستجو',
    analyzing: 'در حال تحلیل...',
    searchSteps: [
      'برقراری ارتباط با سرور...',
      'جستجو در پایگاه داده...',
      'بررسی اطلاعات کاربر...',
      'تحلیل نتایج...'
    ],
    notFound: 'موجود نیست',
    result: 'نتیجه',
    reset: 'شروع مجدد',
    logout: 'خروج',
    history: 'تاریخچه جستجو',
    clearHistory: 'پاک کردن تاریخچه',
    copy: 'کپی نتیجه',
    copyright: 'تمامی حقوق محفوظ است © مهرشاد'
  }
};

const generateDeterministicResult = (username) => {
  const hashCode = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash);
  };

  const hash = hashCode(username.toLowerCase());
  return {
    found: hash % 10 < 2,
    data: hash % 10 < 2 
      ? `شماره: ${hash % 1000000}` 
      : null
  };
};

const randomDelay = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

function UsernameLookup({ onLogout }) {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem('darkMode');
    return stored ? JSON.parse(stored) : false;
  });
  const [searchStep, setSearchStep] = useState(0);
  const [history, setHistory] = useState(() => {
    const stored = localStorage.getItem('searchHistory');
    return stored ? JSON.parse(stored) : [];
  });

  const toggleDarkMode = () => {
    setDarkMode(prevMode => {
      localStorage.setItem('darkMode', !prevMode);
      return !prevMode;
    });
  };

  const handleSearch = async () => {
    setLoading(true);
    setResult(null);
    setSearchStep(0);

    // Simulate step-by-step search with randomized delays.
    for (let i = 0; i < LANG.fa.searchSteps.length; i++) {
      const delay = randomDelay(20000, 60000);
      await new Promise(resolve => setTimeout(resolve, delay));
      setSearchStep(i);
    }
    
    await new Promise(resolve => setTimeout(resolve, randomDelay(20000, 30000)));
    
    const consistentResult = generateDeterministicResult(username);
    setResult(consistentResult);
    setLoading(false);
    setSearchStep(0);

    // Save the search result to history.
    const newEntry = {
      username,
      result: consistentResult,
      timestamp: new Date().toISOString()
    };
    const newHistory = [newEntry, ...history];
    setHistory(newHistory);
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));
  };

  const handleReset = () => {
    setUsername('');
    setResult(null);
  };

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem('searchHistory');
  };

  const handleCopyResult = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('نتیجه کپی شد!');
    } catch (err) {
      alert('کپی ناموفق بود.');
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUsername(text);
    } catch (err) {
      alert('Paste failed.');
    }
  };

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
        {/* Telegram Logo */}
        <motion.div 
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="flex justify-center"
        >
          <svg className="w-16 h-16 text-blue-500" viewBox="0 0 24 24">
            <path 
              fill="currentColor" 
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.03-1.99 1.27-5.62 3.72-.53.36-1.01.54-1.44.53-.47-.01-1.38-.26-2.06-.48-.83-.27-1.49-.42-1.43-.89.03-.25.38-.51 1.05-.78 4.12-1.79 6.87-2.97 8.26-3.54 3.93-1.62 4.75-1.9 5.27-1.91.12 0 .37.03.54.17.14.12.18.28.2.45-.01.05.01.13 0 .21z"
            />
          </svg>
        </motion.div>

        {/* Header */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center"
        >
          <h1 className={`text-2xl font-bold ${darkMode ? 'text-blue-300' : 'text-blue-800'}`}>
            {LANG.fa.title}
          </h1>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} mt-2`}>
            {LANG.fa.subtitle}
          </p>
        </motion.div>

        {/* Search Input & Buttons */}
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="flex flex-col sm:flex-row items-center gap-2"
        >
          <input 
            type="text" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder={LANG.fa.placeholder}
            className={`flex-grow p-3 rounded-lg focus:outline-none focus:ring-2 ${
              darkMode 
                ? 'bg-gray-700 text-white border-gray-600 focus:ring-blue-600' 
                : 'border-2 border-blue-200 focus:ring-blue-400 text-right'
            }`}
          />
          <div className="flex gap-2">
            <motion.button 
              onClick={handleSearch}
              disabled={!username || loading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`${
                darkMode 
                  ? 'bg-blue-800 text-white hover:bg-blue-700' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              } p-3 rounded-lg disabled:opacity-50 transition-all`}
            >
              {loading ? <Loader2 className="animate-spin" /> : <Search />}
            </motion.button>
            <motion.button 
              onClick={handleReset}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`${
                darkMode 
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              } p-3 rounded-lg transition-all`}
            >
              <RefreshCcw />
            </motion.button>
            <motion.button 
              onClick={handlePaste}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`${
                darkMode 
                  ? 'bg-green-700 text-white hover:bg-green-600' 
                  : 'bg-green-500 text-white hover:bg-green-400'
              } p-3 rounded-lg transition-all`}
            >
              Paste
            </motion.button>
          </div>
        </motion.div>

        {/* Loading Steps */}
        <AnimatePresence>
          {loading && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
            >
              <motion.div 
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className={`p-6 rounded-2xl shadow-2xl space-y-4 ${
                  darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Loader2 className="animate-spin text-blue-600" />
                  <span>{LANG.fa.searchSteps[searchStep]}</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${((searchStep + 1) / LANG.fa.searchSteps.length) * 100}%` }}
                    className="h-full bg-blue-600"
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Animated Result Display */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 300 } }}
              exit={{ opacity: 0, y: -20 }}
              className={`p-4 rounded-lg text-center ${
                result.found 
                  ? (darkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800')
                  : (darkMode ? 'bg-red-900 text-red-300' : 'bg-red-100 text-red-800')
              }`}
            >
              {result.found ? (
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, transition: { type: 'spring', stiffness: 400, damping: 10 } }}
                  className="flex flex-col sm:flex-row items-center justify-center gap-2"
                >
                  <CheckCircle className="text-green-600" />
                  <span>{result.data}</span>
                  <motion.button 
                    onClick={() => handleCopyResult(result.data)}
                    whileHover={{ scale: 1.1 }}
                    className="p-1 rounded bg-gray-200 text-gray-800"
                  >
                    <Copy size={16} />
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, transition: { type: 'spring', stiffness: 400, damping: 10 } }}
                  className="flex items-center justify-center gap-2"
                >
                  <AlertTriangle className="text-red-600" />
                  <span>{LANG.fa.notFound}</span>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search History */}
        {history.length > 0 && (
          <div className="mt-4">
            <div className="flex justify-between items-center">
              <h2 className={`text-lg font-bold ${darkMode ? 'text-blue-300' : 'text-blue-800'}`}>
                {LANG.fa.history}
              </h2>
              <button 
                onClick={handleClearHistory}
                className="text-sm text-red-500 hover:underline"
              >
                {LANG.fa.clearHistory}
              </button>
            </div>
            <ul className="mt-2 space-y-2">
              {history.map((entry, index) => (
                <li key={index} className="p-2 bg-gray-100 dark:bg-gray-700 rounded flex justify-between items-center">
                  <div>
                    <p className="text-sm">{entry.username}</p>
                    <p className="text-xs text-gray-500">{new Date(entry.timestamp).toLocaleString()}</p>
                  </div>
                  <button 
                    onClick={() => handleCopyResult(entry.result.found ? entry.result.data : LANG.fa.notFound)}
                    className="p-1 rounded bg-blue-200 dark:bg-blue-600"
                  >
                    <Copy size={16} />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Footer */}
        <div className="text-center text-xs text-gray-500 pt-4">
          {LANG.fa.copyright}
        </div>
      </motion.div>
    </div>
  );
}

export default UsernameLookup;
