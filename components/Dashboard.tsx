import React, { useContext, useMemo, useState } from 'react';
import { AppContext } from '../App';
import { calculateTimeSlots, detectConflicts, generateOptimizationProposals } from '../utils';
import { Undo, Redo, Wand2, Users, GraduationCap, AlertTriangle, Maximize2, X } from 'lucide-react';
import { Schedule } from '../types';
import TimetableGrid from './TimetableGrid';
import OptimizationModal from './OptimizationModal';

const Dashboard: React.FC = () => {
  const { state, dispatch, canUndo, canRedo, addToast, t } = useContext(AppContext);
  const { teachers, classes, schedule, settings } = state;

  const timeSlots = useMemo(() => calculateTimeSlots(settings), [settings]);
  const conflicts = useMemo(() => detectConflicts(schedule, teachers, classes, timeSlots), [schedule, teachers, classes, timeSlots]);
  const conflictCount = Object.keys(conflicts).length;

  const [isOptimizing, setIsOptimizing] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  
  const [showOptModal, setShowOptModal] = useState(false);
  const [optProposals, setOptProposals] = useState<{id: string, schedule: Schedule, conflictCount: number}[]>([]);

  const handleOptimizeStart = async () => {
    setIsOptimizing(true);
    setTimeout(() => {
        try {
            const proposals = generateOptimizationProposals(schedule, classes, timeSlots);
            if (proposals.length === 0) {
                addToast('info', t('dashboard_already_best'));
            } else {
                setOptProposals(proposals);
                setShowOptModal(true);
            }
        } catch (e) {
            console.error(e);
            addToast('error', t('toast_error'));
        } finally {
            setIsOptimizing(false);
        }
    }, 100);
  };

  const handleApplyOptimization = (newSchedule: Schedule) => {
      dispatch({ type: 'REPLACE_SCHEDULE', payload: newSchedule });
      addToast('success', t('toast_optimized'));
      setShowOptModal(false);
  };

  return (
    <div className="flex flex-col h-full gap-6 animate-in fade-in duration-500">
      {!isFullScreen && (
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center bg-white dark:bg-slate-800 p-4 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 transition-colors">
            <div className="flex flex-wrap gap-4">
            <StatBadge icon={<Users size={18} />} label={t('dashboard_stats_teachers')} value={teachers.length} color="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300" />
            <StatBadge icon={<GraduationCap size={18} />} label={t('dashboard_stats_classes')} value={classes.length} color="bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300" />
            <StatBadge 
                icon={<AlertTriangle size={18} />} 
                label={t('dashboard_stats_conflicts')} 
                value={conflictCount} 
                color={conflictCount > 0 ? "bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300" : "bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400"} 
            />
            </div>

            <div className="flex gap-2 w-full md:w-auto">
            <div className="flex gap-1 bg-slate-100 dark:bg-slate-700 p-1 rounded-xl">
                <button onClick={() => dispatch({ type: 'UNDO' })} disabled={!canUndo} className="p-2 hover:bg-white dark:hover:bg-slate-600 rounded-lg disabled:opacity-30 transition-all" title={t('dashboard_undo')}>
                    <Undo size={20} />
                </button>
                <button onClick={() => dispatch({ type: 'REDO' })} disabled={!canRedo} className="p-2 hover:bg-white dark:hover:bg-slate-600 rounded-lg disabled:opacity-30 transition-all" title={t('dashboard_redo')}>
                    <Redo size={20} />
                </button>
            </div>
            
            <button onClick={() => setIsFullScreen(true)} className="p-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300 rounded-xl transition-colors" title={t('dashboard_fullscreen')}>
                <Maximize2 size={20} />
            </button>

            <button
                onClick={handleOptimizeStart}
                disabled={isOptimizing}
                className="flex-1 md:flex-none flex items-center gap-2 bg-gradient-to-r from-primary-600 to-primary-500 hover:scale-105 text-white px-6 py-2 rounded-xl shadow-lg transition-all disabled:opacity-70 font-bold"
            >
                <Wand2 size={18} className={isOptimizing ? "animate-spin" : ""} />
                <span>{isOptimizing ? t('dashboard_optimizing') : t('dashboard_optimize_btn')}</span>
            </button>
            </div>
        </div>
      )}

      <div className={`
        ${isFullScreen 
            ? 'fixed inset-0 z-50 bg-slate-100 dark:bg-slate-950 p-8 flex flex-col items-center justify-center' 
            : 'flex-1 bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden relative'
        }
      `}>
         {isFullScreen && (
            <div className="absolute top-4 right-4 z-50 flex gap-2">
                 <button onClick={() => setIsFullScreen(false)} className="p-2 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-800 rounded-full transition-colors shadow-sm">
                    <X size={24} />
                 </button>
            </div>
         )}

         <div className={`w-full h-full overflow-hidden ${isFullScreen ? 'max-w-[95vw] max-h-[90vh] bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 flex flex-col' : ''}`}>
             <TimetableGrid classes={classes} slots={timeSlots} schedule={schedule} conflicts={conflicts} teachers={teachers} design={state.design} />
         </div>
      </div>

      <OptimizationModal isOpen={showOptModal} onClose={() => setShowOptModal(false)} onApply={handleApplyOptimization} proposals={optProposals} classes={classes} slots={timeSlots} teachers={teachers} design={state.design} />
    </div>
  );
};

const StatBadge = ({ icon, label, value, color }: any) => (
  <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${color} font-black text-sm transition-colors shadow-sm`}>
    {icon}
    <span>{label}: {value}</span>
  </div>
);

export default Dashboard;