import React, { useContext, useState } from 'react';
import { AppContext } from '../App';
import { ClassGroup, TimeSlot, Schedule, Teacher, DesignSettings, LessonData } from '../types';
import { Plus, Coffee, AlertCircle } from 'lucide-react';
import { getContrastColor } from '../utils';
import EditModal from './EditModal';

interface Props {
  classes: ClassGroup[];
  slots: TimeSlot[];
  schedule: Schedule;
  conflicts: { [key: string]: boolean };
  teachers: Teacher[];
  design: DesignSettings;
  readOnly?: boolean;
}

const TimetableGrid: React.FC<Props> = ({ classes, slots, schedule, conflicts, teachers, design, readOnly = false }) => {
  const { dispatch, state, t } = useContext(AppContext);
  const isDarkMode = state.ui.theme === 'dark' || (state.ui.theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  
  const [editingCell, setEditingCell] = useState<{ key: string, data: LessonData | null } | null>(null);
  const [dragSource, setDragSource] = useState<string | null>(null);
  const [dragOverKey, setDragOverKey] = useState<string | null>(null);

  const handleCellClick = (key: string) => {
    if (readOnly) return;
    setEditingCell({ key, data: schedule[key] || null });
  };

  const handleSaveLesson = (data: LessonData) => {
    if (readOnly) return;
    if (editingCell) {
      dispatch({ type: 'SET_LESSON', payload: { key: editingCell.key, data } });
    }
  };

  const handleDeleteLesson = () => {
    if (readOnly) return;
    if (editingCell) {
      dispatch({ type: 'SET_LESSON', payload: { key: editingCell.key, data: null } });
      setEditingCell(null);
    }
  };

  const onDragStart = (e: React.DragEvent, key: string) => {
    if (readOnly || !schedule[key]) {
        e.preventDefault();
        return;
    }
    setDragSource(key);
    e.dataTransfer.effectAllowed = 'move';
  };

  const onDragOver = (e: React.DragEvent, key: string) => {
    e.preventDefault(); 
    if (readOnly) return;
    const sourceClass = dragSource?.split('_')[0];
    const targetClass = key.split('_')[0];
    if (sourceClass === targetClass) {
        setDragOverKey(key);
        e.dataTransfer.dropEffect = 'move';
    } else {
        e.dataTransfer.dropEffect = 'none';
    }
  };

  const onDrop = (e: React.DragEvent, targetKey: string) => {
    e.preventDefault();
    if (readOnly) return;
    if (dragSource && dragSource !== targetKey) {
        const sourceClass = dragSource.split('_')[0];
        const targetClass = targetKey.split('_')[0];
        if (sourceClass === targetClass) {
            dispatch({ type: 'MOVE_LESSON', payload: { fromKey: dragSource, toKey: targetKey } });
        }
    }
    setDragSource(null);
    setDragOverKey(null);
  };

  const getTeacher = (id: string) => teachers.find(t_item => t_item.id === id);

  return (
    <>
      <div className="w-full h-full overflow-auto bg-white dark:bg-slate-900 rounded-2xl transition-colors">
        <div className="inline-block min-w-max">
          {/* Header Row */}
          <div className="flex sticky-header bg-slate-50 dark:bg-slate-800 shadow-sm border-b border-slate-200 dark:border-slate-700 z-20">
            <div className="sticky-col left-0 w-32 p-4 font-black text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-800 border-l border-slate-200 dark:border-slate-700 text-center flex items-center justify-center shadow-[4px_0_10px_-5px_rgba(0,0,0,0.1)] z-30">
              {t('grid_classes')}
            </div>
            {slots.map((slot) => (
              <div key={slot.id} className="w-40 p-3 text-center border-l border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
                <div className="text-sm font-black text-slate-800 dark:text-slate-100">
                    {slot.type === 'lesson' ? `${slot.index + 1} ${t('grid_lesson_unit')}` : t('grid_break')}
                </div>
                <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 mt-1 bg-slate-200 dark:bg-slate-700 inline-block px-2 py-0.5 rounded-full">
                  {slot.start} - {slot.end}
                </div>
              </div>
            ))}
          </div>

          {/* Rows */}
          {classes.map((cls) => (
            <div key={cls.id} className="flex border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
              <div className="sticky-col left-0 w-32 p-3 font-bold text-sm text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 flex items-center justify-center shadow-[4px_0_10px_-5px_rgba(0,0,0,0.1)] z-10 transition-colors">
                <div className="truncate px-1">{cls.name}</div>
              </div>

              {slots.map((slot) => {
                const key = `${cls.id}_${slot.id}`;
                const lesson = schedule[key];
                const isConflict = conflicts[key];
                const isBreak = slot.type === 'break';
                const isDraggingOver = dragOverKey === key;
                
                const style = isBreak ? design.break : design.lesson;
                const teacher = lesson ? getTeacher(lesson.teacherId) : null;
                const tColor = teacher ? teacher.color : '#ccc';
                const tContrast = teacher ? getContrastColor(tColor) : '#000';

                let cellBg = style.backgroundColor;
                if (isDarkMode && (cellBg === '#ffffff' || cellBg === 'white' || cellBg.toLowerCase() === '#fff')) {
                    cellBg = isBreak ? '#1e293b' : '#0f172a';
                }

                if (isBreak) {
                  return (
                    <div key={key} className="w-40 p-1 border-l border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20 flex items-center justify-center opacity-80 transition-colors">
                         <div className="w-full h-full flex flex-col items-center justify-center gap-1 rounded-xl text-slate-400 dark:text-slate-500" style={{ backgroundColor: cellBg }}>
                            <Coffee size={18} />
                         </div>
                    </div>
                  );
                }

                return (
                  <div key={key} className={`w-40 p-1 border-l border-slate-100 dark:border-slate-800 relative group transition-colors ${isDraggingOver ? 'bg-primary-50 dark:bg-primary-900/20' : ''}`} onDragOver={(e) => onDragOver(e, key)} onDrop={(e) => onDrop(e, key)}>
                    <div 
                        onClick={() => handleCellClick(key)} draggable={!!lesson && !readOnly} onDragStart={(e) => onDragStart(e, key)}
                        className={`w-full h-full min-h-[70px] flex flex-col items-center justify-center text-center relative transition-all ${readOnly ? '' : 'cursor-pointer'} ${lesson && !readOnly ? 'hover:scale-[1.03] hover:shadow-lg z-10' : ''} ${isConflict ? 'ring-2 ring-red-500 shadow-lg shadow-red-500/20' : ''}`}
                        style={{
                            backgroundColor: cellBg, 
                            border: lesson ? `${style.borderWidth}px ${style.borderStyle} ${isConflict ? '#ef4444' : style.borderColor}` : '1px dashed #e2e8f0',
                            borderRadius: `${style.borderRadius}px`,
                            boxShadow: lesson ? style.shadow : 'none',
                            fontSize: `${style.fontSize}px`,
                            margin: `${style.margin}px`
                        }}
                    >
                        {lesson ? (
                            <>
                                <div className="font-bold leading-tight mb-1 px-1 truncate w-full text-slate-800 dark:text-slate-100">{lesson.subject}</div>
                                {teacher && (
                                    <div className="text-[0.75em] px-2 py-0.5 rounded-full max-w-[90%] truncate font-black" style={{ backgroundColor: tColor, color: tContrast }}>{teacher.name}</div>
                                )}
                                {isConflict && (
                                    <div className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full p-1 shadow-lg z-10"><AlertCircle size={12} /></div>
                                )}
                            </>
                        ) : (
                            !readOnly && <Plus className="text-slate-300 dark:text-slate-600 w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        )}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      {!readOnly && (
          <EditModal isOpen={!!editingCell} initialData={editingCell?.data} teachers={teachers} onClose={() => setEditingCell(null)} onSave={handleSaveLesson} onDelete={handleDeleteLesson} />
      )}
    </>
  );
};

export default TimetableGrid;