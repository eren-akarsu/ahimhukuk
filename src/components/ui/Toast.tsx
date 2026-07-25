import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  addToast: (message: string, type: ToastType) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = useCallback((message: string, type: ToastType) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    
    // Auto dismiss after 4 seconds
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      
      {/* Toast Notification Container in Bottom-Right */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3 max-w-sm w-full pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => {
            // Determine styles and icon
            const typeStyles = {
              success: 'bg-[#0b2e3b]/95 border-emerald-500/40 text-emerald-400',
              error: 'bg-[#0b2e3b]/95 border-rose-500/40 text-rose-400',
              warning: 'bg-[#0b2e3b]/95 border-gold/40 text-gold',
              info: 'bg-[#0b2e3b]/95 border-primary-light/40 text-primary-light',
            };

            const icons = {
              success: <CheckCircle className="flex-shrink-0" size={18} />,
              error: <AlertCircle className="flex-shrink-0" size={18} />,
              warning: <AlertCircle className="flex-shrink-0" size={18} />,
              info: <Info className="flex-shrink-0" size={18} />,
            };

            return (
              <motion.div
                key={toast.id}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.9, transition: { duration: 0.2 } }}
                className={`p-4 rounded-xl border backdrop-blur-md shadow-2xl flex items-start space-x-3 pointer-events-auto ${typeStyles[toast.type]}`}
              >
                {icons[toast.type]}
                <div className="flex-grow text-xs md:text-sm font-medium pr-2 leading-relaxed">
                  {toast.message}
                </div>
                <button
                  onClick={() => removeToast(toast.id)}
                  className="text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer flex-shrink-0"
                >
                  <X size={14} />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};
