import React, { useContext, useState } from 'react';
import { AppContext } from '../App';
import { ArrowRight, Download, Layout, Type, Palette, Printer, Stamp, Eye, Settings2, Maximize2, X, ChevronRight } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import TimetableTemplate from './TimetableTemplate';

interface Props {
  onBack: () => void;
}

type TabType = 'layout' | 'content' | 'style' | 'extras';

const PrintPreviewPage: React.FC<Props> = ({ onBack }) => {
  const { state, dispatch, addToast, t } = useContext(AppContext);
  const { printDesign } = state;
  const [activeTab, setActiveTab] = useState<TabType>('layout');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const updateDesign = (key: keyof typeof printDesign, value: any) => {
    dispatch({ type: 'UPDATE_PRINT_DESIGN', payload: { [key]: value } });
  };

  const handleDownload = async () => {
    const element = document.getElementById('export-canvas-container');
    if (!element) return;

    addToast('info', t('toast_pro_download'));

    try {
        await new Promise(r => setTimeout(r, 500));

        const canvas = await html2canvas(element, {
            scale: 3,
            useCORS: true,
            logging: false,
            backgroundColor: '#ffffff',
        });

        const imgData = canvas.toDataURL('image/jpeg', 0.95);
        const pdf = new jsPDF({
            orientation: 'landscape',
            unit: 'mm',
            format: 'a4'
        });

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgProps = pdf.getImageProperties(imgData);
        const ratio = imgProps.width / imgProps.height;
        
        let renderWidth = pdfWidth;
        let renderHeight = pdfWidth / ratio;

        if (renderHeight > pdfHeight) {
             renderHeight = pdfHeight;
             renderWidth = pdfHeight * ratio;
        }

        const x = (pdfWidth - renderWidth) / 2;
        const y = (pdfHeight - renderHeight) / 2;

        pdf.addImage(imgData, 'JPEG', x, y, renderWidth, renderHeight);
        
        const date = new Date();
        const dateStr = date.getFullYear() + 
                        String(date.getMonth() + 1).padStart(2, '0') + 
                        String(date.getDate()).padStart(2, '0');

        pdf.save(`timetable_pro_${dateStr}.pdf`);
        addToast('success', t('toast_pdf_success'));

    } catch (e) {
        console.error(e);
        addToast('error', t('toast_error'));
    }
  };

  const TabButton = ({ id, label, icon }: { id: TabType, label: string, icon: React.ReactNode }) => (
    <button 
        onClick={() => setActiveTab(id)}
        className={`flex-1 py-3 flex flex-col items-center justify-center gap-1 text-xs font-medium transition-all border-b-2 ${
            activeTab === id 
            ? 'border-indigo-600 text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30' 
            : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
        }`}
    >
        {icon}
        <span>{label}</span>
    </button>
  );

  return (
    <div className="h-full flex flex-col bg-slate-100 dark:bg-slate-950 transition-colors duration-300">
      {!isFullScreen && (
          <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 md:px-6 py-3 flex justify-between items-center shadow-sm z-20 flex-shrink-0 transition-colors">
            <div className="flex items-center gap-4">
                <button onClick={onBack} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-600 dark:text-slate-400" title={t('confirm_cancel')}>
                    <ArrowRight size={24} className={t('app_name') === 'مهال ویش' ? 'rotate-0' : 'rotate-180'} />
                </button>
                <div className="flex items-center gap-3">
                    <h2 className="text-lg font-bold text-slate-800 dark:text-white hidden md:block">{t('print_studio_title')}</h2>
                    <span className="bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-400 text-[10px] px-2 py-0.5 rounded-full font-bold">PRO</span>
                    
                    {!isSidebarOpen && (
                        <button 
                            onClick={() => setIsSidebarOpen(true)}
                            className="flex items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/40 px-3 py-1.5 rounded-lg border border-indigo-100 dark:border-indigo-900 transition-colors"
                        >
                            <Settings2 size={16} />
                            <span>{t('print_btn_settings')}</span>
                        </button>
                    )}
                </div>
            </div>
            <div className="flex gap-3">
                <button onClick={() => setIsFullScreen(true)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-400 transition-colors" title={t('dashboard_fullscreen')}>
                    <Maximize2 size={20} />
                </button>
                <button onClick={() => window.print()} className="px-3 md:px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg flex items-center gap-2 font-medium transition-colors text-sm">
                    <Printer size={18} />
                    <span className="hidden md:inline">{t('print_btn_print')}</span>
                </button>
                <button onClick={handleDownload} className="px-4 md:px-5 py-2 bg-indigo-600 dark:bg-indigo-500 text-white hover:bg-indigo-700 dark:hover:bg-indigo-600 rounded-lg flex items-center gap-2 shadow-lg shadow-indigo-200 dark:shadow-none font-bold transition-colors text-sm">
                    <Download size={18} />
                    <span className="hidden md:inline">{t('print_btn_download')}</span>
                </button>
            </div>
          </div>
      )}

      <div className="flex-1 overflow-hidden flex relative">
        {!isFullScreen && (
            <div className={`bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 flex flex-col shadow-xl z-10 transition-all duration-300 ease-in-out absolute inset-y-0 right-0 md:static ${isSidebarOpen ? 'w-80 translate-x-0' : 'w-0 translate-x-full opacity-0 md:opacity-100 md:w-0 md:translate-x-0 overflow-hidden'}`}>
                <button onClick={() => setIsSidebarOpen(false)} className="absolute top-1/2 -left-3 z-50 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md rounded-full p-1 text-slate-500 hover:text-indigo-600 hidden md:block">
                    <ChevronRight size={16} className={t('app_name') === 'مهال ویش' ? 'rotate-0' : 'rotate-180'} />
                </button>

                <div className="flex border-b border-slate-200 dark:border-slate-800">
                    <TabButton id="layout" label={t('print_tab_layout')} icon={<Layout size={18} />} />
                    <TabButton id="content" label={t('print_tab_content')} icon={<Type size={18} />} />
                    <TabButton id="style" label={t('print_tab_style')} icon={<Palette size={18} />} />
                    <TabButton id="extras" label={t('print_tab_extras')} icon={<Stamp size={18} />} />
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-6 pb-20 scrollbar-hide transition-colors">
                    {activeTab === 'layout' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                            <div>
                                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3 block">{t('print_cell_dims')}</label>
                                <div className="space-y-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-900/30 p-3 rounded-lg">
                                    <div>
                                        <div className="flex justify-between text-sm mb-1 text-slate-700 dark:text-slate-300 font-bold">
                                            <span>{t('print_min_height')}</span>
                                            <span className="font-mono text-slate-500 dark:text-slate-400">{printDesign.cellMinHeight || 90}px</span>
                                        </div>
                                        <input type="range" min="30" max="300" step="5" value={printDesign.cellMinHeight || 90} onChange={(e) => updateDesign('cellMinHeight', parseInt(e.target.value))} className="w-full accent-amber-600" />
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-sm mb-1 text-slate-700 dark:text-slate-300 font-bold">
                                            <span>{t('print_cell_padding')}</span>
                                            <span className="font-mono text-slate-500 dark:text-slate-400">{printDesign.cellPadding || 4}px</span>
                                        </div>
                                        <input type="range" min="0" max="50" step="1" value={printDesign.cellPadding || 4} onChange={(e) => updateDesign('cellPadding', parseInt(e.target.value))} className="w-full accent-amber-600" />
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-sm mb-1 text-slate-700 dark:text-slate-300 font-bold">
                                            <span>{t('print_cell_gap')}</span>
                                            <span className="font-mono text-slate-500 dark:text-slate-400">{printDesign.cellGap || 6}px</span>
                                        </div>
                                        <input type="range" min="0" max="50" step="1" value={printDesign.cellGap || 6} onChange={(e) => updateDesign('cellGap', parseInt(e.target.value))} className="w-full accent-amber-600" />
                                    </div>
                                    <div>
                                        <label className="block text-sm mb-1 text-slate-700 dark:text-slate-300 font-bold">{t('print_valign')}</label>
                                        <div className="flex bg-white dark:bg-slate-800 rounded-lg border border-amber-200 dark:border-amber-900/50 p-1">
                                            {['start', 'center', 'end'].map(v => (
                                                <button key={v} onClick={() => updateDesign('cellVerticalAlign', v)} className={`flex-1 py-1 text-xs rounded transition-all ${printDesign.cellVerticalAlign === v ? 'bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-300 font-bold shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'}`}>
                                                    {t(`print_valign_${v}`)}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3 block">{t('print_zoom')}</label>
                                <div className="space-y-4">
                                    <div>
                                        <div className="flex justify-between text-sm mb-1 text-slate-700 dark:text-slate-300 font-bold">
                                            <span>{t('print_zoom')}</span>
                                            <span className="font-mono text-slate-500 dark:text-slate-400">{printDesign.scale}%</span>
                                        </div>
                                        <input type="range" min="20" max="200" step="5" value={printDesign.scale} onChange={(e) => updateDesign('scale', parseInt(e.target.value))} className="w-full accent-indigo-600" />
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-sm mb-1 text-slate-700 dark:text-slate-300 font-bold">
                                            <span>{t('print_margin_y')}</span>
                                            <span className="font-mono text-slate-500 dark:text-slate-400">{printDesign.paddingY}px</span>
                                        </div>
                                        <input type="range" min="0" max="200" step="10" value={printDesign.paddingY} onChange={(e) => updateDesign('paddingY', parseInt(e.target.value))} className="w-full accent-indigo-600" />
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-sm mb-1 text-slate-700 dark:text-slate-300 font-bold">
                                            <span>{t('print_margin_x')}</span>
                                            <span className="font-mono text-slate-500 dark:text-slate-400">{printDesign.paddingX}px</span>
                                        </div>
                                        <input type="range" min="0" max="200" step="10" value={printDesign.paddingX} onChange={(e) => updateDesign('paddingX', parseInt(e.target.value))} className="w-full accent-indigo-600" />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3 block">{t('print_direction')}</label>
                                <div className="grid grid-cols-2 gap-2">
                                    <button onClick={() => updateDesign('direction', 'rtl')} className={`px-3 py-2 rounded border text-sm transition-colors ${printDesign.direction === 'rtl' ? 'bg-indigo-50 dark:bg-indigo-900/30 border-indigo-500 text-indigo-700 dark:text-indigo-300 font-bold' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'}`}>
                                        {t('print_dir_rtl')}
                                    </button>
                                    <button onClick={() => updateDesign('direction', 'ltr')} className={`px-3 py-2 rounded border text-sm transition-colors ${printDesign.direction === 'ltr' ? 'bg-indigo-50 dark:bg-indigo-900/30 border-indigo-500 text-indigo-700 dark:text-indigo-300 font-bold' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'}`}>
                                        {t('print_dir_ltr')}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'content' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                            <div>
                                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3 block">{t('print_headers_label')}</label>
                                <div className="space-y-3">
                                    <input type="text" placeholder={t('print_main_title')} value={printDesign.title} onChange={(e) => updateDesign('title', e.target.value)} className="w-full px-3 py-2 border dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm bg-white dark:bg-slate-800 dark:text-white" />
                                    <input type="text" placeholder={t('print_sub_title')} value={printDesign.subtitle} onChange={(e) => updateDesign('subtitle', e.target.value)} className="w-full px-3 py-2 border dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm bg-white dark:bg-slate-800 dark:text-white" />
                                </div>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3 block">{t('menu_settings')}</label>
                                <div className="space-y-2">
                                    {[
                                        { key: 'showTimes', label: t('print_show_times') },
                                        { key: 'showLegend', label: t('print_show_legend') },
                                        { key: 'showFooter', label: t('print_show_footer') },
                                    ].map((item) => (
                                        <label key={item.key} className="flex items-center gap-3 p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl cursor-pointer transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700">
                                            <input type="checkbox" checked={printDesign[item.key as keyof typeof printDesign] as boolean} onChange={(e) => updateDesign(item.key as keyof typeof printDesign, e.target.checked)} className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4" />
                                            <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{item.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'style' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                            <div>
                                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3 block">{t('print_teacher_mode')}</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {['badge', 'text', 'dot', 'hidden'].map((mode) => (
                                        <button key={mode} onClick={() => updateDesign('teacherDisplayMode', mode)} className={`px-2 py-2 rounded-xl border text-xs transition-all ${(printDesign.teacherDisplayMode || 'badge') === mode ? 'bg-indigo-50 dark:bg-indigo-900/40 border-indigo-500 dark:border-indigo-400 text-indigo-700 dark:text-indigo-300 font-bold shadow-sm' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'}`}>
                                            {t(`print_mode_${mode}`)}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3 block">{t('print_typography')}</label>
                                <div className="space-y-4 bg-slate-50 dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700 transition-colors">
                                    {[
                                        { key: 'fontSizeTitle', label: t('print_font_title') },
                                        { key: 'fontSizeHeader', label: t('print_font_header') },
                                        { key: 'fontSizeSubject', label: t('print_font_subject') },
                                        { key: 'fontSizeTeacher', label: t('print_font_teacher') },
                                    ].map(item => (
                                        <div key={item.key}>
                                            <div className="flex justify-between text-xs mb-1 text-slate-600 dark:text-slate-400 font-bold">
                                                <span>{item.label}</span>
                                                <span className="font-mono">{printDesign[item.key as keyof typeof printDesign] as number}px</span>
                                            </div>
                                            <input type="range" min="6" max="100" step="1" value={printDesign[item.key as keyof typeof printDesign] as number} onChange={(e) => updateDesign(item.key as keyof typeof printDesign, parseInt(e.target.value))} className="w-full accent-indigo-600" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="border-t dark:border-slate-800 pt-4">
                                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3 block">{t('print_themes_label')}</label>
                                <div className="grid grid-cols-2 gap-2 mb-4">
                                    {['classic', 'modern', 'minimal', 'colorful', 'corporate'].map((theme) => (
                                        <button key={theme} onClick={() => updateDesign('theme', theme)} className={`px-3 py-2 rounded-xl border text-sm capitalize transition-all ${printDesign.theme === theme ? 'bg-indigo-50 dark:bg-indigo-900/40 border-indigo-500 dark:border-indigo-400 text-indigo-700 dark:text-indigo-300 font-bold shadow-sm' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'}`}>
                                            {t(`print_theme_${theme}`)}
                                        </button>
                                    ))}
                                </div>
                                <div className="flex gap-3 items-center bg-slate-50 dark:bg-slate-800 p-3 rounded-xl border dark:border-slate-700 transition-colors">
                                    <input type="color" value={printDesign.primaryColor} onChange={(e) => updateDesign('primaryColor', e.target.value)} className="w-8 h-8 rounded cursor-pointer border shadow-sm dark:bg-slate-900 border-none" />
                                    <div className="flex-1"><div className="text-xs font-bold text-slate-700 dark:text-slate-300">{t('settings_color_label')}</div></div>
                                </div>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3 block">{t('print_header_style')}</label>
                                <select value={printDesign.headerStyle} onChange={(e) => updateDesign('headerStyle', e.target.value)} className="w-full px-3 py-2 border dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-sm dark:text-white font-bold outline-none">
                                    <option value="solid">{t('print_header_solid')}</option>
                                    <option value="outline">{t('print_header_outline')}</option>
                                    <option value="simple">{t('print_header_simple')}</option>
                                </select>
                            </div>
                        </div>
                    )}

                    {activeTab === 'extras' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                            <div>
                                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3 block">{t('print_watermark_label')}</label>
                                <div className="space-y-3 bg-slate-50 dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700 transition-colors">
                                    <label className="flex items-center gap-2 cursor-pointer font-bold">
                                        <input type="checkbox" checked={printDesign.showWatermark} onChange={(e) => updateDesign('showWatermark', e.target.checked)} className="rounded text-indigo-600" />
                                        <span className="text-sm text-slate-700 dark:text-slate-300">{t('print_watermark_enable')}</span>
                                    </label>
                                    {printDesign.showWatermark && (
                                        <input type="text" value={printDesign.watermarkText} onChange={(e) => updateDesign('watermarkText', e.target.value)} className="w-full px-3 py-2 border dark:border-slate-700 rounded-lg text-sm bg-white dark:bg-slate-900 dark:text-white font-bold outline-none" placeholder={t('print_watermark_placeholder')} />
                                    )}
                                </div>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3 block">{t('print_footer_custom')}</label>
                                <textarea value={printDesign.footerText} onChange={(e) => updateDesign('footerText', e.target.value)} className="w-full px-3 py-2 border dark:border-slate-700 rounded-xl text-sm h-24 bg-white dark:bg-slate-800 dark:text-white font-bold outline-none" placeholder={t('print_footer_placeholder')} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )}

        <div className={`flex-1 overflow-auto flex items-center justify-center relative transition-all duration-300 ${isFullScreen ? 'fixed inset-0 z-50 bg-slate-900' : 'bg-slate-200/80 dark:bg-slate-950/80'}`}>
            {isFullScreen && (
                <button onClick={() => setIsFullScreen(false)} className="absolute top-4 right-4 z-50 p-3 bg-white/10 text-white hover:bg-white/20 backdrop-blur rounded-full transition-all">
                    <X size={24} />
                </button>
            )}
            <div className="absolute top-4 left-4 flex gap-2 z-10 pointer-events-none">
                <div className="bg-slate-800 text-white px-3 py-1 rounded-md text-xs shadow-sm opacity-70 backdrop-blur-sm">{printDesign.scale}% {t('print_scale_label')}</div>
                <div className="bg-slate-800 text-white px-3 py-1 rounded-md text-xs shadow-sm opacity-70 backdrop-blur-sm">A4 {t('print_landscape')}</div>
            </div>
            <div className="bg-white shadow-2xl transition-all duration-300 origin-top flex flex-col overflow-hidden" style={{ width: '297mm', height: '210mm', transform: 'scale(0.65)' }}>
                <TimetableTemplate state={state} previewMode={true} />
            </div>
        </div>
      </div>
    </div>
  );
};

export default PrintPreviewPage;