import React, { useContext } from 'react';
import { BookOpen, MousePointer, ShieldCheck, Zap, Printer, Plus, Wand2 } from 'lucide-react';
import { AppContext } from '../App';

const HelpPage: React.FC = () => {
  const { t } = useContext(AppContext);

  return (
    <div className="max-w-4xl mx-auto pb-12 animate-in fade-in duration-500">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-black text-slate-800 dark:text-white mb-4">{t('help_title')}</h2>
        <p className="text-slate-500 dark:text-slate-400 font-bold">{t('help_subtitle')}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Step 1 */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 transition-colors">
            <div className="flex items-center gap-3 mb-6 text-primary-600 dark:text-primary-400">
                <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center">
                    <BookOpen size={24} />
                </div>
                <h3 className="text-xl font-bold">{t('help_step1_title')}</h3>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6 font-medium">
                {t('help_step1_text')}
            </p>
            <div className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-dashed border-slate-300 dark:border-slate-600 transition-colors">
                <div className="w-8 h-8 rounded bg-emerald-100 text-emerald-600 flex items-center justify-center"><Plus size={18} /></div>
                <span className="text-sm font-bold text-slate-500 dark:text-slate-400">{t('help_step1_badge')}</span>
            </div>
        </div>

        {/* Step 2 */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 transition-colors">
            <div className="flex items-center gap-3 mb-6 text-indigo-600 dark:text-indigo-400">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center">
                    <MousePointer size={24} />
                </div>
                <h3 className="text-xl font-bold">{t('help_step2_title')}</h3>
            </div>
            <div className="space-y-4 text-slate-600 dark:text-slate-300">
                <p className="font-medium">
                    {t('help_step2_text')}
                </p>
                <div className="p-4 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl flex items-center justify-center bg-slate-50 dark:bg-slate-900/50">
                     <div className="w-24 h-12 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg flex items-center justify-center shadow-sm">
                        <Plus className="text-slate-300" size={16} />
                     </div>
                </div>
            </div>
        </div>

        {/* Step 3 */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 transition-colors">
            <div className="flex items-center gap-3 mb-6 text-amber-600 dark:text-amber-400">
                <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center">
                    <Zap size={24} />
                </div>
                <h3 className="text-xl font-bold">{t('help_step3_title')}</h3>
            </div>
            <p className="text-slate-600 dark:text-slate-300 mb-6 font-medium">
                {t('help_step3_text')}
            </p>
            <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary-600 to-primary-400 text-white py-3 rounded-xl font-black shadow-lg shadow-primary-500/20">
                <Wand2 size={18} />
                <span>{t('dashboard_optimize_btn')}</span>
            </button>
            <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-3 text-center font-bold">{t('help_step3_badge')}</p>
        </div>

        {/* Step 4 */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 transition-colors">
            <div className="flex items-center gap-3 mb-6 text-purple-600 dark:text-purple-400">
                <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center">
                    <Printer size={24} />
                </div>
                <h3 className="text-xl font-bold">{t('help_step4_title')}</h3>
            </div>
            <p className="text-slate-600 dark:text-slate-300 mb-6 font-medium">
                {t('help_step4_text')}
            </p>
            <div className="bg-slate-100 dark:bg-slate-900 p-4 rounded-xl flex items-center justify-between border dark:border-slate-700">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                    <span className="text-xs font-black text-slate-700 dark:text-slate-200">{t('help_step4_badge')}</span>
                </div>
                <div className="bg-indigo-600 text-white text-[10px] px-2 py-0.5 rounded font-black">PRO</div>
            </div>
        </div>

      </div>

      <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-6 rounded-3xl flex items-start gap-4 transition-colors">
          <div className="bg-blue-500 text-white p-2 rounded-xl shrink-0"><ShieldCheck size={20} /></div>
          <div>
              <h4 className="font-black text-blue-900 dark:text-blue-200 mb-1">{t('help_security_title')}</h4>
              <p className="text-sm text-blue-800 dark:text-blue-300 leading-relaxed font-bold">{t('help_security_text')}</p>
          </div>
      </div>
    </div>
  );
};

export default HelpPage;