import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Sparkles } from 'lucide-react';
import { AppContext } from '../App';

const SplashScreen: React.FC = () => {
  const { t } = useContext(AppContext);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-900 overflow-hidden"
    >
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-600/20 rounded-full blur-[120px]"
      />
      <motion.div 
        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, delay: 1 }}
        className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-500/10 rounded-full blur-[120px]"
      />

      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
          className="relative mb-8"
        >
          <div className="bg-gradient-to-tr from-primary-600 to-indigo-400 p-6 rounded-[2rem] shadow-2xl shadow-primary-500/40 relative">
            <Calendar size={64} className="text-white" />
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute -top-2 -right-2 bg-amber-400 p-2 rounded-full shadow-lg border-4 border-slate-900"
            >
              <Sparkles size={16} className="text-slate-900" />
            </motion.div>
          </div>
          <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }} transition={{ duration: 2, repeat: Infinity }} className="absolute inset-0 bg-primary-500 rounded-[2rem] -z-10 blur-xl" />
        </motion.div>

        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-3 tracking-tight">
            {t('splash_title')}
          </h1>
          <p className="text-slate-400 text-lg font-medium mb-12">
            {t('splash_subtitle')}
          </p>
        </motion.div>

        <div className="w-64 h-1.5 bg-slate-800 rounded-full overflow-hidden relative">
          <motion.div initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 2, ease: "easeInOut" }} className="h-full bg-gradient-to-r from-primary-500 to-indigo-400" />
        </div>
        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="text-slate-500 text-[10px] uppercase tracking-[0.2em] mt-4 font-bold">
          {t('splash_loading')}
        </motion.span>
      </div>

      <div className="absolute bottom-8 text-slate-600 text-xs font-mono">
        v1.2.5 • Smart Scheduler AI
      </div>
    </motion.div>
  );
};

export default SplashScreen;
