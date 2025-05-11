import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, X } from 'lucide-react';

const MaintenancePopup = ({ isVisible, onClose, darkMode }) => {
  useEffect(() => {
    if (isVisible) {
      // Auto-dismiss after 5 seconds
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

 return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 flex items-center justify-center z-50"
          dir="rtl"
        >
          <div
            className={`p-6 rounded-2xl shadow-2xl max-w-sm w-full mx-4 text-right ${
              darkMode ? 'bg-gray-800 text-white border border-gray-700' : 'bg-white text-gray-900'
            }`}
            style={{ fontFamily: 'Vazir, system-ui, sans-serif' }}
          >
            <div className="flex items-center gap-3 flex-row-reverse">
              <AlertCircle className={`w-6 h-6 ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`} />
              <h2 className="text-lg font-bold">سایت در حال نگهداری است</h2>
            </div>
            <p className={`mt-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              در حال انجام به‌روزرسانی هستیم. لطفاً بعداً دوباره تلاش کنید.
            </p>
            <div className="mt-4 flex justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  darkMode ? 'bg-blue-600 text-white hover:bg-blue-500' : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
              >
                تأیید
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MaintenancePopup;