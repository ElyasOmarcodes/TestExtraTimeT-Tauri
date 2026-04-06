import React, { useContext } from 'react';
import { AppContext } from '../App';
import { Palette, Monitor, Sun, Moon, Check, Languages } from 'lucide-react';
import { AppTheme, PRIMARY_BRAND_COLORS, AppLanguage } from '../types';

const DataMgmt: React.FC = () => {
  const { state, dispatch, t } = useContext(AppContext);

  const handleUiChange = (key: string, value: any) => {
    dispatch({ type: 'UPDATE_UI', payload: { [key]: value } });
  };

  return (
    <div className="max-w-4xl mx-auto pb-20 space-y-8 animate-in fade-in duration-500">
      <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">{t('app_settings_title')}</h2>
      
      {/* Theme & Colors Section */}
      <div className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3 mb-8">
              <div className="bg-primary-500 p-2.5 rounded-xl text-white shadow-lg shadow-primary-500/30"><Palette size={24} /></div>
              <div>
                  <h3 className="font-bold text-xl dark:text-white">{t('settings_theme_label')}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{t('app_settings_theme_desc')}</p>
              </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Theme Selector */}
              <div>
                  <label className="block text-sm font-bold text-slate-500 dark:text-slate-400 mb-4 uppercase tracking-wider">{t('settings_theme_label')}</label>
                  <div className="grid grid-cols-3 gap-3">
                      {[
                          { id: 'system', label: t('theme_system'), icon: <Monitor size={20} /> },
                          { id: 'light', label: t('theme_light'), icon: <Sun size={20} /> },
                          { id: 'dark', label: t('theme_dark'), icon: <Moon size={20} /> },
                      ].map((t_item) => (
                          <button
                              key={t_item.id}
                              onClick={() => handleUiChange('theme', t_item.id as AppTheme)}
                              className={`
                                  flex flex-col items-center justify-center gap-2 py-4 rounded-2xl border-2 transition-all duration-300
                                  ${state.ui.theme === t_item.id 
                                      ? 'bg-primary-50 border-primary-500 text-primary-700 dark:bg-primary-900/30 dark:border-primary-400 dark:text-primary-400 shadow-lg' 
                                      : 'bg-slate-50 dark:bg-slate-900 border-transparent text-slate-400 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700'
                                  }
                              `}
                          >
                              {t_item.icon}
                              <span className="font-bold text-xs">{t_item.label}</span>
                          </button>
                      ))}
                  </div>
              </div>

              {/* Color Picker */}
              <div>
                  <label className="block text-sm font-bold text-slate-500 dark:text-slate-400 mb-4 uppercase tracking-wider">{t('settings_color_label')}</label>
                  <div className="flex flex-wrap gap-3">
                      {PRIMARY_BRAND_COLORS.map((color) => (
                          <button
                              key={color}
                              onClick={() => handleUiChange('primaryColor', color)}
                              className={`
                                  w-10 h-10 rounded-full flex items-center justify-center transition-all transform hover:scale-125 shadow-md border-2 border-white dark:border-slate-700
                                  ${state.ui.primaryColor === color ? 'ring-4 ring-primary-400/30 scale-125 z-10' : 'opacity-80 hover:opacity-100'}
                              `}
                              style={{ backgroundColor: color }}
                          >
                              {state.ui.primaryColor === color && <Check size={20} className="text-white drop-shadow-md" />}
                          </button>
                      ))}
                  </div>
              </div>
          </div>
      </div>

      {/* Language Section */}
      <div className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] shadow-sm border border-slate-200 dark:border-slate-700 transition-colors">
          <div className="flex items-center gap-3 mb-8">
              <div className="bg-indigo-500 p-2.5 rounded-xl text-white shadow-lg shadow-indigo-500/30"><Languages size={24} /></div>
              <div>
                  <h3 className="font-bold text-xl dark:text-white">{t('settings_lang_label')}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{t('settings_lang_desc')}</p>
              </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                  { id: 'ps', label: 'پښتو' },
                  { id: 'fa', label: 'فارسی' },
                  { id: 'ar', label: 'العربية' },
                  { id: 'en', label: 'English' },
              ].map((l) => (
                  <button
                      key={l.id}
                      onClick={() => handleUiChange('language', l.id as AppLanguage)}
                      className={`py-4 rounded-2xl border-2 font-black transition-all text-sm ${
                          state.ui.language === l.id 
                          ? 'bg-indigo-50 border-indigo-500 text-indigo-700 dark:bg-indigo-900/30 dark:border-indigo-400 dark:text-indigo-400 shadow-md'
                          : 'bg-slate-50 dark:bg-slate-900 border-transparent text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
                      }`}
                  >
                      {l.label}
                  </button>
              ))}
          </div>
      </div>
    </div>
  );
};

export default DataMgmt;