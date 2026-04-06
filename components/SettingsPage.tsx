import React, { useContext, useState } from 'react';
import { AppContext } from '../App';
import { Save, Clock, Split } from 'lucide-react';

const SettingsPage: React.FC = () => {
  const { state, dispatch, addToast, t } = useContext(AppContext);
  const [values, setValues] = useState(state.settings);

  const handleChange = (key: keyof typeof values, value: any) => {
    setValues(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    dispatch({ type: 'UPDATE_SETTINGS', payload: values });
    addToast('success', t('toast_settings_saved'));
  };

  return (
    <div className="max-w-3xl mx-auto pb-12 animate-in fade-in duration-500">
      <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">{t('settings_title')}</h2>
      
      <div className="space-y-6">
        
        {/* Main Settings Card */}
        <div className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] shadow-sm border border-slate-200 dark:border-slate-700 transition-colors">
            <h3 className="text-lg font-bold text-slate-700 dark:text-slate-200 mb-6 flex items-center gap-2">
                <Clock size={20} className="text-primary-500" />
                {t('settings_time_mgmt')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Start Time */}
                <div>
                    <label className="block text-sm font-bold text-slate-500 dark:text-slate-400 mb-2">{t('settings_start_time')}</label>
                    <input 
                        type="time" 
                        value={values.startTime}
                        onChange={(e) => handleChange('startTime', e.target.value)}
                        className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary-500 text-slate-900 dark:text-white outline-none"
                    />
                </div>
                
                {/* Total Lessons */}
                <div>
                    <label className="block text-sm font-bold text-slate-500 dark:text-slate-400 mb-2">{t('settings_total_lessons')}</label>
                    <input 
                        type="number" min="1" max="15"
                        value={values.totalLessons}
                        onChange={(e) => handleChange('totalLessons', parseInt(e.target.value))}
                        className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary-500 text-slate-900 dark:text-white outline-none"
                    />
                </div>

                {/* Duration */}
                <div>
                    <label className="block text-sm font-bold text-slate-500 dark:text-slate-400 mb-2">{t('settings_lesson_duration')}</label>
                    <input 
                        type="number" min="15" max="120"
                        value={values.lessonDuration}
                        onChange={(e) => handleChange('lessonDuration', parseInt(e.target.value))}
                        className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary-500 text-slate-900 dark:text-white outline-none"
                    />
                </div>

                {/* Break Duration */}
                <div>
                    <label className="block text-sm font-bold text-slate-500 dark:text-slate-400 mb-2">{t('settings_break_duration')}</label>
                    <input 
                        type="number" min="5" max="60"
                        value={values.breakDuration}
                        onChange={(e) => handleChange('breakDuration', parseInt(e.target.value))}
                        className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary-500 text-slate-900 dark:text-white outline-none"
                    />
                </div>

                {/* Lessons Before Break - Updated to 7 Options */}
                <div className="md:col-span-2 p-6 bg-primary-50 dark:bg-slate-900/50 border border-primary-100 dark:border-slate-700 rounded-3xl flex items-center gap-4 transition-colors">
                    <div className="bg-primary-500 p-3 rounded-2xl text-white shadow-lg shadow-primary-500/20">
                        <Split size={24} />
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-black text-primary-800 dark:text-primary-400 mb-2">{t('settings_lessons_before_break')}</label>
                        <select 
                            value={values.lessonsBeforeBreak}
                            onChange={(e) => handleChange('lessonsBeforeBreak', parseInt(e.target.value))}
                            className="w-full bg-white dark:bg-slate-800 border border-primary-200 dark:border-slate-600 rounded-xl px-4 py-2.5 text-sm font-bold focus:ring-2 focus:ring-primary-500 text-slate-900 dark:text-white outline-none transition-all shadow-sm appearance-none"
                        >
                            {[1, 2, 3, 4, 5, 6, 7].map(num => (
                                <option key={num} value={num}>{num}</option>
                            ))}
                            <option value="0">{t('settings_off')}</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>

        {/* Save Button Container */}
        <div className="flex justify-end pt-4">
            <button 
                onClick={handleSave}
                className="bg-primary-500 hover:bg-primary-600 text-white px-10 py-4 rounded-2xl flex items-center gap-2 shadow-xl shadow-primary-500/30 transition-all active:scale-95 font-black text-lg"
            >
                <Save size={24} />
                <span>{t('settings_save')}</span>
            </button>
        </div>

      </div>
    </div>
  );
};

export default SettingsPage;