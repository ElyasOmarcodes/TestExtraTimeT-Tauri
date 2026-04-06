import React, { useRef, useContext } from 'react';
import { motion } from 'framer-motion';
import { FilePlus, FolderOpen, ArrowRight, ShieldCheck, Sparkles, Layout } from 'lucide-react';
import { AppContext } from '../App';

interface ProjectSelectorProps {
  onNewProject: () => void;
  onImportProject: (data: any) => void;
}

const ProjectSelector: React.FC<ProjectSelectorProps> = ({ onNewProject, onImportProject }) => {
  const { t } = useContext(AppContext);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (json && typeof json === 'object') {
          onImportProject(json);
        }
      } catch (err) {
        alert(t('toast_error'));
      }
    };
    reader.readAsText(file);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-50 dark:bg-slate-950 overflow-hidden transition-colors duration-300">
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-[100px]" />
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-5xl w-full px-6 relative z-10"
      >
        <motion.div variants={itemVariants} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white dark:bg-slate-900 px-4 py-2 rounded-full shadow-sm border border-slate-100 dark:border-slate-800 mb-4 transition-colors">
            <Sparkles size={16} className="text-amber-500" />
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">{t('selector_badge')}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight transition-colors">
            {t('selector_title')}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto transition-colors">
            {t('selector_subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div variants={itemVariants}>
            <button
              onClick={onNewProject}
              className="w-full text-right group relative bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-black/50 transition-all hover:border-emerald-300 dark:hover:border-emerald-700 hover:shadow-emerald-100 dark:hover:shadow-emerald-900/20 flex flex-col h-full overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 dark:bg-emerald-950/30 rounded-bl-[5rem] -mr-10 -mt-10 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/40 transition-colors" />
              
              <div className="relative mb-8">
                <div className="w-16 h-16 bg-emerald-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-200 dark:shadow-emerald-900/40 group-hover:scale-110 transition-transform">
                  <FilePlus size={32} />
                </div>
              </div>

              <div className="relative flex-1">
                <h2 className="text-2xl font-black text-slate-800 dark:text-white mb-3 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">{t('selector_new_title')}</h2>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-8 transition-colors">
                  {t('selector_new_desc')}
                </p>
              </div>

              <div className="relative mt-auto flex items-center justify-between">
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold">
                  <span>{t('selector_new_btn')}</span>
                  <ArrowRight size={20} className="rotate-180 group-hover:-translate-x-1 transition-transform" />
                </div>
                <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg group-hover:bg-emerald-50 dark:group-hover:bg-emerald-900/50 transition-colors">
                  <Layout size={18} className="text-slate-400 dark:text-slate-500 group-hover:text-emerald-500" />
                </div>
              </div>
            </button>
          </motion.div>

          <motion.div variants={itemVariants}>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full text-right group relative bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-black/50 transition-all hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-indigo-100 dark:hover:shadow-indigo-900/20 flex flex-col h-full overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 dark:bg-indigo-950/30 rounded-bl-[5rem] -mr-10 -mt-10 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/40 transition-colors" />
              
              <div className="relative mb-8">
                <div className="w-16 h-16 bg-indigo-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200 dark:shadow-indigo-900/40 group-hover:scale-110 transition-transform">
                  <FolderOpen size={32} />
                </div>
              </div>

              <div className="relative flex-1">
                <h2 className="text-2xl font-black text-slate-800 dark:text-white mb-3 group-hover:text-indigo-700 dark:group-hover:text-indigo-400 transition-colors">{t('selector_import_title')}</h2>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-8 transition-colors">
                  {t('selector_import_desc')}
                </p>
              </div>

              <div className="relative mt-auto flex items-center justify-between">
                <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold">
                  <span>{t('selector_import_btn')}</span>
                  <ArrowRight size={20} className="rotate-180 group-hover:-translate-x-1 transition-transform" />
                </div>
                <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/50 transition-colors">
                  <ShieldCheck size={18} className="text-slate-400 dark:text-slate-500 group-hover:text-indigo-500" />
                </div>
              </div>
              <input type="file" ref={fileInputRef} className="hidden" accept=".json,application/json" onChange={handleFileChange} />
            </button>
          </motion.div>
        </div>

        <motion.div variants={itemVariants} className="mt-16 flex flex-col items-center gap-4">
          <div className="h-px w-24 bg-slate-200 dark:bg-slate-800" />
          <div className="flex items-center gap-3 text-slate-400 dark:text-slate-500 text-sm bg-white dark:bg-slate-900 px-6 py-2 rounded-full border border-slate-100 dark:border-slate-800 shadow-sm transition-colors text-center">
            <ShieldCheck size={16} className="text-emerald-500 shrink-0" />
            <span>{t('selector_security')}</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProjectSelector;
