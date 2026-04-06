import React, { useContext, useRef, useState } from 'react';
import { AppContext } from '../App';
import { Download, Upload, Printer, AlertCircle, Eye, Share2 } from 'lucide-react';
import ConfirmModal from './ConfirmModal';

interface Props {
  setPage: (page: string) => void;
}

const ExportPage: React.FC<Props> = ({ setPage }) => {
  const { state, dispatch, addToast, t } = useContext(AppContext);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isImporting, setIsImporting] = useState(false);
  const [pendingData, setPendingData] = useState<any>(null);

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state));
    const date = new Date();
    const dateStr = date.getFullYear() + 
                    String(date.getMonth() + 1).padStart(2, '0') + 
                    String(date.getDate()).padStart(2, '0');
    const filename = `timetable_backup_${dateStr}.json`;

    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", filename);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
    addToast('success', t('toast_settings_saved'));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
        try {
            const json = JSON.parse(event.target?.result as string);
            if (json && typeof json === 'object') {
                setPendingData(json);
                setIsImporting(true);
            }
        } catch (err) { addToast('error', t('toast_error')); }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const confirmImport = () => {
    if (pendingData) {
        dispatch({ type: 'INIT', payload: pendingData });
        addToast('success', t('toast_import_success'));
        setIsImporting(false);
        setPendingData(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">{t('menu_export')}</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* JSON Section */}
        <div className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col transition-colors">
            <div className="bg-blue-500/10 w-14 h-14 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
                <Share2 size={30} />
            </div>
            <h3 className="font-bold text-xl mb-3 dark:text-white">{t('export_backup_title')}</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-8 leading-relaxed">
                {t('export_backup_desc')}
            </p>
            <div className="space-y-3 mt-auto">
                <button 
                    onClick={handleExportJSON}
                    className="w-full py-4 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-2xl flex items-center justify-center gap-2 font-bold transition-all"
                >
                    <Download size={20} />
                    <span>{t('export_json_btn')}</span>
                </button>
                <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl flex items-center justify-center gap-2 font-bold shadow-lg shadow-blue-500/20 transition-all"
                >
                    <Upload size={20} />
                    <span>{t('export_import_btn')}</span>
                </button>
                <input type="file" ref={fileInputRef} className="hidden" accept=".json" onChange={handleFileChange} />
            </div>
        </div>

        {/* PDF Section */}
        <div className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col transition-colors">
            <div className="bg-primary-500/10 w-14 h-14 rounded-2xl flex items-center justify-center text-primary-600 mb-6">
                <Printer size={30} />
            </div>
            <h3 className="font-bold text-xl mb-3 dark:text-white">{t('export_print_studio_title')}</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-8 leading-relaxed">
                {t('export_print_studio_desc')}
            </p>
            <button 
                onClick={() => setPage('print-preview')}
                className="w-full py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-2xl flex items-center justify-center gap-2 font-bold shadow-lg shadow-primary-500/20 mt-auto transition-all"
            >
                <Eye size={20} />
                <span>{t('export_print_studio_btn')}</span>
            </button>
        </div>

      </div>

      <div className="mt-8 bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800 p-5 rounded-3xl flex items-start gap-4">
          <AlertCircle className="text-amber-600 shrink-0 mt-1" size={20} />
          <p className="text-sm text-amber-800 dark:text-amber-300 leading-relaxed">
              <strong>{t('export_note')}</strong> {t('export_note_text')}
          </p>
      </div>

      <ConfirmModal 
        isOpen={isImporting}
        message={t('export_import_confirm')}
        onCancel={() => { setIsImporting(false); setPendingData(null); }}
        onConfirm={confirmImport}
      />
    </div>
  );
};

export default ExportPage;
