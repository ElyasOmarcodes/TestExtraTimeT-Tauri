import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, AlertTriangle, Sparkles, ArrowRight } from 'lucide-react';
import { Schedule, ClassGroup, TimeSlot, Teacher, DesignSettings } from '../types';
import { detectConflicts } from '../utils';
import TimetableGrid from './TimetableGrid';
import { AppContext } from '../App';

interface Proposal {
    id: string;
    schedule: Schedule;
    conflictCount: number;
}

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onApply: (schedule: Schedule) => void;
    proposals: Proposal[];
    classes: ClassGroup[];
    slots: TimeSlot[];
    teachers: Teacher[];
    design: DesignSettings;
}

const OptimizationModal: React.FC<Props> = ({
    isOpen, onClose, onApply, proposals, classes, slots, teachers, design
}) => {
    const { t } = useContext(AppContext);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    useEffect(() => {
        if (isOpen && proposals.length > 0) {
            setSelectedId(proposals[0].id);
        }
    }, [isOpen, proposals]);

    const selectedProposal = proposals.find(p => p.id === selectedId);
    
    // Calculate conflicts live for the preview
    const previewConflicts = selectedProposal 
        ? detectConflicts(selectedProposal.schedule, teachers, classes, slots) 
        : {};

    const handleApply = () => {
        if (selectedProposal) {
            onApply(selectedProposal.schedule);
            onClose();
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 lg:p-8">
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                        onClick={onClose}
                    />
                    <motion.div 
                        initial={{ scale: 0.95, opacity: 0, y: 20 }} 
                        animate={{ scale: 1, opacity: 1, y: 0 }} 
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-7xl h-[85vh] flex flex-col overflow-hidden border border-slate-200 dark:border-slate-800 transition-colors"
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 z-10 transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded-lg text-indigo-600 dark:text-indigo-400">
                                    <Sparkles size={24} />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-slate-800 dark:text-white">{t('opt_modal_title')}</h2>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">{t('opt_modal_subtitle')}</p>
                                </div>
                            </div>
                            <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
                                <X size={24} />
                            </button>
                        </div>

                        <div className="flex flex-1 overflow-hidden">
                            
                            {/* Sidebar List */}
                            <div className="w-80 bg-slate-50 dark:bg-slate-950 border-l border-slate-200 dark:border-slate-800 flex flex-col overflow-y-auto p-4 gap-3 transition-colors">
                                {proposals.map((p, index) => (
                                    <button
                                        key={p.id}
                                        onClick={() => setSelectedId(p.id)}
                                        className={`text-right p-4 rounded-xl border transition-all relative overflow-hidden group ${
                                            selectedId === p.id 
                                            ? 'bg-white dark:bg-slate-800 border-indigo-500 dark:border-indigo-400 shadow-md ring-1 ring-indigo-500 dark:ring-indigo-400' 
                                            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-sm'
                                        }`}
                                    >
                                        <div className="flex justify-between items-center mb-2">
                                            <span className={`font-bold ${selectedId === p.id ? 'text-indigo-700 dark:text-indigo-300' : 'text-slate-700 dark:text-slate-200'}`}>
                                                {t('opt_option')} {index + 1}
                                            </span>
                                            {p.conflictCount === 0 && (
                                                <span className="bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 text-[10px] px-2 py-0.5 rounded-full font-bold">{t('opt_best')}</span>
                                            )}
                                        </div>
                                        
                                        <div className={`flex items-center gap-2 text-sm ${p.conflictCount === 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>
                                            {p.conflictCount === 0 ? <Check size={16} /> : <AlertTriangle size={16} />}
                                            <span>{p.conflictCount} {t('opt_conflict_found')}</span>
                                        </div>

                                        {selectedId === p.id && (
                                            <div className="absolute inset-y-0 right-0 w-1.5 bg-indigo-500 dark:bg-indigo-400" />
                                        )}
                                    </button>
                                ))}
                            </div>

                            {/* Preview Area */}
                            <div className="flex-1 bg-slate-100 dark:bg-slate-950 p-4 overflow-hidden relative flex flex-col transition-colors">
                                <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 flex-1 overflow-hidden relative transition-colors">
                                     <div className="absolute inset-0 overflow-auto p-4">
                                         {selectedProposal && (
                                             <TimetableGrid 
                                                 classes={classes}
                                                 slots={slots}
                                                 teachers={teachers}
                                                 design={design}
                                                 schedule={selectedProposal.schedule}
                                                 conflicts={previewConflicts}
                                                 readOnly={true}
                                             />
                                         )}
                                     </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer Actions */}
                        <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 flex justify-between items-center transition-colors">
                            <div className="text-sm text-slate-500 dark:text-slate-400">
                                {proposals.length} {t('opt_total_found')}
                            </div>
                            <div className="flex gap-3">
                                <button 
                                    onClick={onClose}
                                    className="px-5 py-2.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl font-medium transition-colors"
                                >
                                    {t('confirm_cancel')}
                                </button>
                                <button 
                                    onClick={handleApply}
                                    disabled={!selectedProposal}
                                    className="px-6 py-2.5 bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-200 dark:shadow-none flex items-center gap-2 transition-transform active:scale-95 disabled:opacity-50"
                                >
                                    <span>{t('opt_apply')}</span>
                                    <ArrowRight size={18} className={t('app_name') === 'مهال ویش' ? 'rotate-180' : ''} />
                                </button>
                            </div>
                        </div>

                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default OptimizationModal;
