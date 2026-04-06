import React, { useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';
import { ToastMessage } from '../types';
import { AppContext } from '../App';

interface ToastProps {
  toasts: ToastMessage[];
  removeToast: (id: string) => void;
}

const icons = {
  success: <CheckCircle size={20} />,
  error: <AlertCircle size={20} />,
  warning: <AlertTriangle size={20} />,
  info: <Info size={20} />,
};

const Toast: React.FC<ToastProps> = ({ toasts, removeToast }) => {
  const { state } = useContext(AppContext);
  const isDark = state.ui.theme === 'dark' || (state.ui.theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-3 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
            layout
            className={`pointer-events-auto shadow-2xl rounded-2xl p-4 flex items-start gap-4 border min-w-[320px] max-w-md transition-colors duration-300
              ${isDark ? 'bg-primary-500 border-primary-400/30' : 'bg-primary-600 border-primary-500/30'}
            `}
          >
            <div className={`flex-shrink-0 mt-0.5 ${isDark ? 'text-slate-900' : 'text-white'}`}>
              {icons[toast.type]}
            </div>
            <div className="flex-1 pt-0.5">
              <p className={`text-sm font-black leading-5 ${isDark ? 'text-slate-950' : 'text-white'}`}>
                {toast.message}
              </p>
            </div>
            <button 
              onClick={() => removeToast(toast.id)}
              className={`transition-colors p-1 rounded-lg ${isDark ? 'text-slate-900/70 hover:text-slate-900 hover:bg-slate-900/10' : 'text-white/70 hover:text-white hover:bg-white/10'}`}
            >
              <X size={16} />
            </button>
            <TimeoutHandler id={toast.id} remove={removeToast} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

const TimeoutHandler = ({ id, remove }: { id: string, remove: (id: string) => void }) => {
  useEffect(() => {
    const timer = setTimeout(() => remove(id), 5000);
    return () => clearTimeout(timer);
  }, [id, remove]);
  return null;
};

export default Toast;