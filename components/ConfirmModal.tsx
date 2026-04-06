import React, { useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import { AppContext } from '../App';

interface ConfirmModalProps {
  isOpen: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ isOpen, message, onConfirm, onCancel }) => {
  const { t } = useContext(AppContext);
  
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onCancel}
          />
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }} 
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative bg-white dark:bg-slate-800 rounded-xl shadow-2xl max-w-md w-full p-6 overflow-hidden transition-colors"
          >
             <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mb-4 text-amber-600 dark:text-amber-400">
                    <AlertTriangle size={24} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{t('confirm_title')}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">{message}</p>
                
                <div className="flex gap-3 w-full">
                    <button 
                        onClick={onCancel}
                        className="flex-1 py-2 px-4 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-700 dark:text-slate-200 rounded-lg transition-colors"
                    >
                        {t('confirm_cancel')}
                    </button>
                    <button 
                        onClick={onConfirm}
                        className="flex-1 py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                    >
                        {t('confirm_yes')}
                    </button>
                </div>
             </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmModal;
