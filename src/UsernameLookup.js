import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Loader2, 
  Moon, 
  Sun, 
  CheckCircle, 
  AlertTriangle,
  RefreshCcw,
  LogOut,
  Copy,
  Info,
  ArrowRight,
  Calendar,
  User,
  Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Papa from 'papaparse';

const LANG = {
  fa: {
    title: 'جستجوی نام کاربری',
    subtitle: 'ابزار تحلیل نام کاربری ',
    placeholder: 'نام کاربری را وارد کنید',
    search: 'جستجو',
    analyzing: 'در حال تحلیل...',
    back: 'بازگشت',
    searchSteps: [
      'برقراری ارتباط با سرور...',
      'جستجو در پایگاه داده...',
      'بررسی اطلاعات کاربر...',
      'تحلیل نتایج...'
    ],
    notFound: 'متاسفانه، نام کاربری شما در پایگاه داده موجود نیست',
    result: 'نتیجه',
    reset: 'شروع مجدد',
    logout: 'خروج',
    history: 'تاریخچه جستجو',
    clearHistory: 'پاک کردن تاریخچه',
    copy: 'کپی نتیجه',
    copyright: 'تمامی حقوق محفوظ است © پلیس فتا یزد',
    invalidUsername: 'نام کاربری نامعتبر است. باید با @ شروع شده و شامل 5 تا 32 کاراکتر (حروف، ارقام یا _) باشد.',
    accountCreated: 'تاریخ ایجاد حساب:',
    userId: 'شناسه کاربر:',
    lastActive: 'آخرین فعالیت:',
    fetchingDatabase: 'در حال دریافت پایگاه داده...',
    databaseError: 'خطا در دریافت پایگاه داده. لطفاً دوباره تلاش کنید.',
    dataFetchError: 'خطا در دریافت اطلاعات از پایگاه داده.'
  }
};

// Replace with your actual Dropbox URLs
const DATABASE_URLS = {
  telegram: 'https://www.dropbox.com/scl/fi/your-telegram-id/telegram_users.csv?dl=1',
  instagram: 'https://www.dropbox.com/scl/fi/your-instagram-id/instagram_users.csv?dl=1',
  linkedin: 'https://www.dropbox.com/scl/fi/your-linkedin-id/linkedin_users.csv?dl=1',
  facebook: 'https://www.dropbox.com/scl/fi/your-facebook-id/facebook_users.csv?dl=1'
};

// Cache for databases
const databaseCache = {};

async function fetchDatabase(platform) {
  if (databaseCache[platform]) {
    return databaseCache[platform];
  }
  
  try {
    const response = await fetch(DATABASE_URLS[platform], {
      headers: {
        'Cache-Control': 'no-cache'
      }
    });
    if (!response.ok) {
      throw new Error(`Failed to load database: ${response.statusText}`);
    }
    
    const csvText = await response.text();
    
    return new Promise((resolve, reject) => {
      Papa.parse(csvText, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: (results) => {
          // Validate required columns
          const requiredColumns = ['username', 'creation_date'];
          const columns = results.meta.fields;
          const missingColumns = requiredColumns.filter(col => !columns.includes(col));
          if (missingColumns.length > 0) {
            reject(new Error(`Database missing required columns: ${missingColumns.join(', ')}`));
            return;
          }
          
          databaseCache[platform] = results.data;
          resolve(results.data);
        },
        error: (error) => {
          reject(error);
        }
      });
    });
  } catch (error) {
    console.error('Error fetching database:', error);
    throw error;
  }
}

function searchUsername(database, username) {
  const searchTerm = username.startsWith('@') ? username.substring(1) : username;
  
  return database.find(entry => 
    entry.username && entry.username.toLowerCase() === searchTerm.toLowerCase()
  );
}

function formatDate(dateString) {
  try {
    const date = new Date(dateString);
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Intl.DateTimeFormat('fa-IR', options).format(date);
  } catch (e) {
    return dateString;
  }
}

function UsernameLookup({ onLogout, onBack, platform }) {
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
  const [inputError, setInputError] = useState('');
  const [databaseStatus, setDatabaseStatus] = useState('');

  useEffect(() => {
    const preloadDatabase = async () => {
      try {
        setDatabaseStatus(LANG.fa.fetchingDatabase);
        await fetchDatabase(platform);
        setDatabaseStatus('');
      } catch (error) {
        setDatabaseStatus(LANG.fa.databaseError);
        console.error('Failed to preload database:', error);
      }
    };
    
    preloadDatabase();
  }, [platform]);

  const validateUsername = (value) => {
    if (!value) return '';
    if (value[0] !== '@') {
      return 'نام کاربری باید با @ شروع شود.';
    }
    if (value.length < 6) return '';
    const regex = /^@([a-zA-Z0-9_]{5,32})$/;
    if (!regex.test(value)) {
      return LANG.fa.invalidUsername;
    }
    return '';
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setUsername(value);
    const errorMsg = validateUsername(value);
    setInputError(errorMsg);
  };

  const toggleDarkMode = () => {
    setDarkMode(prevMode => {
      localStorage.setItem('darkMode', !prevMode);
      return !prevMode;
    });
  };

  const simulateStepProgress = async () => {
    for (let i = 0; i < LANG.fa.searchSteps.length; i++) {
      const delay = Math.floor(Math.random() * (1500 - 800 + 1)) + 800;
      await new Promise(resolve => setTimeout(resolve, delay));
      setSearchStep(i);
    }
    
    await new Promise(resolve => setTimeout(resolve, Math.floor(Math.random() * (1000 - 500 + 1)) + 500));
  };

  const handleSearch = async () => {
    if (inputError) return;

    setLoading(true);
    setResult(null);
    setSearchStep(0);

    try {
      await simulateStepProgress();
      
      const database = await fetchDatabase(platform);
      
      const userRecord = searchUsername(database, username);
      
      let searchResult = {
        found: !!userRecord,
        data: null
      };
      
      if (userRecord) {
        searchResult.data = {
          username: userRecord.username,
          userId: userRecord.user_id || userRecord.userId || 'N/A',
          creationDate: userRecord.creation_date || userRecord.creationDate,
          lastActive: userRecord.last_active || userRecord.lastActive || 'N/A'
        };
      }
      
      setResult(searchResult);
      
      const newEntry = {
        username,
        platform,
        result: searchResult,
        timestamp: new Date().toISOString()
      };
      
      const newHistory = [newEntry, ...history];
      setHistory(newHistory);
      localStorage.setItem('searchHistory', JSON.stringify(newHistory));
      
    } catch (error) {
      console.error('Error during search:', error);
      setResult({
        found: false,
        error: LANG.fa.dataFetchError
      });
    } finally {
      setLoading(false);
      setSearchStep(0);
    }
  };

  const handleReset = () => {
    setUsername('');
    setResult(null);
    setInputError('');
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
      const errorMsg = validateUsername(text);
      setInputError(errorMsg);
    } catch (err) {
      alert('Paste failed.');
    }
  };

  const getPlatformName = () => {
    switch(platform) {
      case 'telegram': return 'تلگرام';
      case 'instagram': return 'اینستاگرام';
      case 'linkedin': return 'لینکدین';
      case 'facebook': return 'فیسبوک';
      default: return '';
    }
  };

  const getPlatformIcon = () => {
    switch(platform) {
      case 'telegram': 
        return (
          <svg className="w-16 h-16 text-blue-500" viewBox="0 0 24 24">
            <path 
              fill="currentColor" 
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.20-.08-.06-.19-.04-.27-.02-.12.03-1.99 1.27-5.62 3.72-.53.36-1.01.54-1.44.53-.47-.01-1.38-.26-2.06-.48-.83-.27-1.49-.42-1.43-.89.03-.25.38-.51 1.05-.78 4.12-1.79 6.87-2.97 8.26-3.54 3.93-1.62 4.75-1.9 5.27-1.91.12 0 .37.03.54.17.14.12.18.28.2.45-.01.05.01.13 0 .21z"
            />
          </svg>
        );
      case 'instagram':
        return (
          <svg className="w-16 h-16 text-purple-600" viewBox="0 0 24 24">
            <path 
              fill="currentColor" 
              d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153.509.5.902 1.105 1.153 1.772.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428-.254.66-.598 1.216-1.153 1.772-.5.509-1.105.902-1.772 1.153-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465-.66-.254-1.216-.598-1.772-1.153-.509-.5-.902-1.105-1.153-1.772-.247-.637-.415-1.363-.465-2.428-.047-1.066-.06-1.405-.06-4.122 0-2.717.01-3.056.06-4.122.05-1.065.218-1.79.465-2.428.254-.66.598-1.216 1.153-1.772.5-.509 1.105-.902 1.772-1.153.637-.247 1.363-.415 2.428-.465 1.066-.047 1.405-.06 4.122-.06M12 0C9.237 0 8.867.01 7.784.06 6.701.11 5.785.287 4.985.547c-.79.262-1.48.652-2.074 1.147-.695.695-1.227 1.489-1.547 2.373-.26.8-.437 1.716-.487 2.8-.047 1.082-.06 1.452-.06 4.233 0 2.78.01 3.15.06 4.233.05 1.083.227 2 .487 2.8.27.8.652 1.52 1.147 2.113.6.595 1.314 1.073 2.113 1.387.8.26 1.716.437 2.8.487 1.082.047 1.452.06 4.232.06 2.78 0 3.15-.01 4.233-.06 1.083-.05 2-.227 2.8-.487.8-.27 1.52-.652 2.113-1.147.595-.6 1.073-1.314 1.387-2.113.26-.8.437-1.716.487-2.8.047-1.082.06-1.452.06-4.232 0-2.78-.01-3.15-.06-4.233-.05-1.083-.227-2-.487-2.8-.27-.8-.652-1.52-1.147-2.113-.6-.595-1.314-1.073-2.113-1.387-.8-.26-1.716-.437-2.8-.487-1.082-.047-1.452-.06-4.232-.06h-.06zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"
            />
          </svg>
        );
      case 'linkedin':
        return (
          <svg className="w-16 h-16 text-blue-700" viewBox="0 0 24 24">
            <path 
              fill="currentColor" 
              d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"
            />
          </svg>
        );
      case 'facebook':
        return (
          <svg className="w-16 h-16 text-blue-600" viewBox="0 0 24 24">
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

      <div className="absolute top-4 right-4">
        <motion.button
          onClick={onBack}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`flex items-center gap-2 p-2 rounded-lg ${
            darkMode 
              ? 'bg-gray-700 text-blue-400 hover:bg-gray-600' 
              : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
          }`}
        >
          <ArrowRight size={16} />
          <span>{LANG.fa.back}</span>
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
        <motion.div 
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="flex justify-center"
        >
          {getPlatformIcon()}
        </motion.div>

        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center"
        >
          <h1 className={`text-2xl font-bold ${darkMode ? 'text-blue-300' : 'text-blue-800'}`}>
            {LANG.fa.title}
          </h1>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} mt-2`}>
            {`${LANG.fa.subtitle} ${getPlatformName()}`}
          </p>
          
          {databaseStatus && (
            <p className={`text-xs mt-1 ${
              databaseStatus === LANG.fa.databaseError 
                ? 'text-red-500' 
                : darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {databaseStatus}
            </p>
          )}
        </motion.div>

        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="flex flex-col sm:flex-row items-center gap-2 relative"
        >
          <input 
            type="text" 
            value={username}
            onChange={handleInputChange}
            placeholder={LANG.fa.placeholder}
            className={`flex-grow p-3 rounded-lg focus:outline-none focus:ring-2 transition-all ${
              inputError
                ? 'border-2 border-red-500 focus:ring-red-500'
                : darkMode 
                  ? 'bg-gray-700 text-white border-gray-600 focus:ring-blue-600'
                  : 'bg-white text-gray-900 border-2 border-blue-200 focus:ring-blue-400'
            }`}
          />
          {inputError && (
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
              <Info size={20} className="text-red-500" title={inputError} />
            </div>
          )}
          <div className="flex gap-2">
            <motion.button 
              onClick={handleSearch}
              disabled={!username || loading || inputError || databaseStatus === LANG.fa.fetchingDatabase}
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

        {inputError && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-red-500 text-right"
          >
            {inputError}
          </motion.div>
        )}

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

        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 300 } }}
              exit={{ opacity: 0, y: -20 }}
              className={`p-4 rounded-lg ${
                result.found 
                  ? (darkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800')
                  : (darkMode ? 'bg-red-900 text-red-300' : 'bg-red-100 text-red-800')
              }`}
            >
              {result.found ? (
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, transition: { type: 'spring', stiffness: 400, damping: 10 } }}
                  className="flex flex-col gap-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold">{LANG.fa.result}</span>
                    <motion.button 
                      onClick={() => handleCopyResult(JSON.stringify(result.data))}
                      whileHover={{ scale: 1.1 }}
                      className={`p-1 rounded ${darkMode ? 'bg-green-800 text-white' : 'bg-green-200 text-green-800'}`}
                    >
                      <Copy size={16} />
                    </motion.button>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-2 mt-2">
                    <div className={`flex items-center gap-2 p-2 rounded ${darkMode ? 'bg-green-800' : 'bg-green-50'}`}>
                      <User size={18} />
                      <span>نام کاربری: {'@' + result.data.username}</span>
                    </div>
                    <div className={`flex items-center gap-2 p-2 rounded ${darkMode ? 'bg-green-800' : 'bg-green-50'}`}>
                      <Calendar size={18} />
                      <span>{LANG.fa.accountCreated} {formatDate(result.data.creationDate)}</span>
                    </div>
                    {result.data.userId !== 'N/A' && (
                      <div className={`flex items-center gap-2 p-2 rounded ${darkMode ? 'bg-green-800' : 'bg-green-50'}`}>
                        <Info size={18} />
                        <span>{LANG.fa.userId} {result.data.userId}</span>
                      </div>
                    )}
                    {result.data.lastActive !== 'N/A' && (
                      <div className={`flex items-center gap-2 p-2 rounded ${darkMode ? 'bg-green-800' : 'bg-green-50'}`}>
                        <Clock size={18} />
                        <span>{LANG.fa.lastActive} {formatDate(result.data.lastActive)}</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, transition: { type: 'spring', stiffness: 400, damping: 10 } }}
                  className="flex items-center gap-2"
                >
                  <AlertTriangle size={20} />
                  <span>{result.error || LANG.fa.notFound}</span>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {history.length > 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold">{LANG.fa.history}</span>
              <motion.button 
                onClick={handleClearHistory}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`text-sm ${darkMode ? 'text-red-400' : 'text-red-600'}`}
              >
                {LANG.fa.clearHistory}
              </motion.button>
            </div>
            <div className="max-h-40 overflow-y-auto space-y-2">
              {history.map((entry, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm">
                      {entry.username} ({getPlatformName(entry.platform)}) - {formatDate(entry.timestamp)}
                    </span>
                    {entry.result.found && (
                      <motion.button 
                        onClick={() => handleCopyResult(JSON.stringify(entry.result.data))}
                        whileHover={{ scale: 1.1 }}
                        className={`p-1 rounded ${darkMode ? 'bg-gray-600 text-white' : 'bg-gray-200 text-gray-800'}`}
                      >
                        <Copy size={14} />
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        <div className="text-center text-xs text-gray-500 pt-4">
          {LANG.fa.copyright}
        </div>
      </motion.div>
    </div>
  );
}

export default UsernameLookup;