import React, { useContext, useState } from 'react';
import { AppContext } from '../App';
import { Save, Palette, Box, Type, Layers, Scissors, Move, LayoutTemplate } from 'lucide-react';
import { CellDesign } from '../types';

const DesignPage: React.FC = () => {
  const { state, dispatch, addToast, t } = useContext(AppContext);
  const isDarkMode = state.ui.theme === 'dark' || (state.ui.theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  
  // Deep copy to avoid reference issues during edit
  const [design, setDesign] = useState(JSON.parse(JSON.stringify(state.design)));

  const updateField = (type: 'lesson' | 'break', field: keyof CellDesign, value: any) => {
    setDesign((prev: any) => ({
        ...prev,
        [type]: { ...prev[type], [field]: value }
    }));
  };

  const handleSave = () => {
    dispatch({ type: 'UPDATE_DESIGN', payload: design });
    addToast('success', t('toast_settings_saved'));
  };

  const renderSectionHeader = (title: string, icon: React.ReactNode) => (
    <div className="flex items-center gap-3 mb-6">
        <div className="bg-primary-500 p-2.5 rounded-2xl text-white shadow-lg shadow-primary-500/20">
            {icon}
        </div>
        <h3 className="text-xl font-black text-slate-800 dark:text-white tracking-tight">{title}</h3>
    </div>
  );

  const renderControls = (type: 'lesson' | 'break', label: string) => {
    let previewBg = design[type].backgroundColor;
    if (isDarkMode && (previewBg === '#ffffff' || previewBg === 'white' || previewBg.toLowerCase() === '#fff')) {
        previewBg = type === 'break' ? '#1e293b' : '#0f172a';
    }

    return (
        <div className="bg-white dark:bg-slate-800 p-10 rounded-[3.5rem] shadow-2xl border border-slate-100 dark:border-slate-700 relative overflow-hidden transition-all duration-300">
            {renderSectionHeader(label, type === 'lesson' ? <LayoutTemplate size={24} /> : <Scissors size={24} />)}
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Controls Column */}
                <div className="lg:col-span-8 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Background Color */}
                        <div className="space-y-3">
                            <label className="text-sm font-black text-slate-500 dark:text-slate-400 flex items-center gap-2">
                                <Palette size={16} /> {t('design_bg_color')}
                            </label>
                            <div className="flex gap-3 p-1.5 bg-slate-50 dark:bg-slate-900 rounded-[1.2rem] border dark:border-slate-700 shadow-inner">
                                <input type="color" className="w-12 h-12 rounded-[0.8rem] cursor-pointer border-none bg-transparent" value={design[type].backgroundColor} onChange={(e) => updateField(type, 'backgroundColor', e.target.value)} />
                                <input type="text" className="flex-1 bg-transparent border-none text-sm font-black text-slate-700 dark:text-slate-300 outline-none px-2" value={design[type].backgroundColor} onChange={(e) => updateField(type, 'backgroundColor', e.target.value)} />
                            </div>
                        </div>

                        {/* Border Color */}
                        <div className="space-y-3">
                            <label className="text-sm font-black text-slate-500 dark:text-slate-400 flex items-center gap-2">
                                <Box size={16} /> {t('design_border_color')}
                            </label>
                            <div className="flex gap-3 p-1.5 bg-slate-50 dark:bg-slate-900 rounded-[1.2rem] border dark:border-slate-700 shadow-inner">
                                <input type="color" className="w-12 h-12 rounded-[0.8rem] cursor-pointer border-none bg-transparent" value={design[type].borderColor} onChange={(e) => updateField(type, 'borderColor', e.target.value)} />
                                <input type="text" className="flex-1 bg-transparent border-none text-sm font-black text-slate-700 dark:text-slate-300 outline-none px-2" value={design[type].borderColor} onChange={(e) => updateField(type, 'borderColor', e.target.value)} />
                            </div>
                        </div>

                        {/* Ranges */}
                        <div className="space-y-6">
                            <div>
                                <div className="flex justify-between text-xs font-black text-slate-500 dark:text-slate-400 mb-3">
                                    <span className="flex items-center gap-2"><Layers size={14} /> {t('design_border_width')}</span>
                                    <span>{design[type].borderWidth}px</span>
                                </div>
                                <input type="range" min="0" max="5" className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary-500" value={design[type].borderWidth} onChange={(e) => updateField(type, 'borderWidth', parseInt(e.target.value))} />
                            </div>

                            <div>
                                <div className="flex justify-between text-xs font-black text-slate-500 dark:text-slate-400 mb-3">
                                    <span className="flex items-center gap-2"><Move size={14} /> {t('design_border_radius')}</span>
                                    <span>{design[type].borderRadius}px</span>
                                </div>
                                <input type="range" min="0" max="24" className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary-500" value={design[type].borderRadius} onChange={(e) => updateField(type, 'borderRadius', parseInt(e.target.value))} />
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <div className="flex justify-between text-xs font-black text-slate-500 dark:text-slate-400 mb-3">
                                    <span className="flex items-center gap-2"><Move size={14} /> {t('design_margin')}</span>
                                    <span>{design[type].margin}px</span>
                                </div>
                                <input type="range" min="0" max="12" className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary-500" value={design[type].margin} onChange={(e) => updateField(type, 'margin', parseInt(e.target.value))} />
                            </div>

                            {type === 'lesson' && (
                                <div>
                                    <div className="flex justify-between text-xs font-black text-slate-500 dark:text-slate-400 mb-3">
                                        <span className="flex items-center gap-2"><Type size={14} /> {t('design_font_size')}</span>
                                        <span>{design[type].fontSize}px</span>
                                    </div>
                                    <input type="range" min="10" max="22" className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary-500" value={design[type].fontSize} onChange={(e) => updateField(type, 'fontSize', parseInt(e.target.value))} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Preview Column */}
                <div className="lg:col-span-4 flex flex-col items-center justify-center border-r dark:border-slate-700 pr-0 lg:pr-10 border-t lg:border-t-0 pt-10 lg:pt-0">
                    <div className="text-center mb-6">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{t('design_preview_text')}</span>
                    </div>
                    <div 
                        className="transition-all duration-500 shadow-2xl flex items-center justify-center p-6 text-center"
                        style={{
                            width: '180px', height: '110px',
                            backgroundColor: previewBg,
                            borderColor: design[type].borderColor,
                            borderWidth: `${design[type].borderWidth}px`,
                            borderStyle: design[type].borderStyle,
                            borderRadius: `${design[type].borderRadius}px`,
                            fontSize: `${design[type].fontSize || 13}px`,
                            boxShadow: design[type].shadow === 'none' ? '0 25px 50px -12px rgba(0, 0, 0, 0.1)' : 'inset 0 2px 10px 0 rgb(0 0 0 / 0.1)',
                            color: isDarkMode && (previewBg === '#1e293b' || previewBg === '#0f172a') ? '#f8fafc' : '#1e293b'
                        }}
                    >
                        <span className="font-black opacity-90">{t('design_preview_text')}</span>
                    </div>
                    <div className="mt-8 p-4 bg-primary-50 dark:bg-slate-900 rounded-2xl border border-primary-100 dark:border-slate-700">
                        <p className="text-[11px] font-black text-primary-700 dark:text-primary-400 leading-relaxed text-center">
                            دا ډیزاین به ستاسو په ټول مهال ویش کې په هره حجره (Cell) کې په اتومات ډول پلي شي.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto pb-24 px-4 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
            <h2 className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter mb-2">{t('design_title')}</h2>
            <p className="text-slate-500 dark:text-slate-400 font-bold">{t('app_settings_theme_desc')}</p>
        </div>
        <button 
            onClick={handleSave}
            className="group relative bg-primary-500 hover:bg-primary-600 text-white px-12 py-5 rounded-[2rem] flex items-center gap-3 shadow-[0_20px_40px_rgba(99,102,241,0.3)] transition-all hover:scale-105 active:scale-95 font-black text-xl overflow-hidden"
        >
            <Save size={26} className="relative z-10" />
            <span className="relative z-10">{t('edit_modal_save')}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </button>
      </div>
      
      <div className="space-y-12">
        {renderControls('lesson', t('design_lesson_style'))}
        {renderControls('break', t('design_break_style'))}
      </div>

      {/* Modern Branding Hint */}
      <div className="mt-20 text-center">
         <div className="inline-flex items-center gap-3 px-8 py-3 bg-white dark:bg-slate-900 rounded-full border dark:border-slate-800 shadow-xl opacity-50">
            <div className="w-2 h-2 rounded-full bg-primary-500" />
            <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.4em]">Design Engine V2.0</span>
         </div>
      </div>
    </div>
  );
};

export default DesignPage;