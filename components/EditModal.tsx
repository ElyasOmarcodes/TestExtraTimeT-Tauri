import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Check } from 'lucide-react';
import { Teacher, LessonData } from '../types';
import { AppContext } from '../App';

interface EditModalProps {
  isOpen: boolean;
  initialData?: LessonData | null;
  teachers: Teacher[];
  onClose: () => void;
  onSave: (data: LessonData) => void;
  onDelete: () => void;
}

const EditModal: React.FC<EditModalProps> = ({ 
  isOpen, initialData, teachers, onClose, onSave, onDelete 
}) => {
  const { t } = useContext(AppContext);
  const [subject, setSubject] = useState('');
  const [teacherId, setTeacherId] = useState('');
  const [difficulty, setDifficulty] = useState<'hard' | 'medium' | 'easy'>('medium');

  useEffect(() => {
    if (isOpen) {
      setSubject(initialData?.subject || '');
      setTeacherId(initialData?.teacherId || '');
      setDifficulty(initialData?.difficulty || 'medium');
    }
  }, [isOpen, initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (subject && teacherId) {
      onSave({ subject, teacherId, difficulty });
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div 
            initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }}
            className="relative bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-sm p-6 border border-slate-200 dark:border-slate-700 transition-colors"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">{t('edit_modal_title')}</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('edit_modal_subject')}</label>
                <input 
                  type="text" 
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all dark:text-white"
                  placeholder={t('edit_modal_placeholder')}
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('edit_modal_teacher')}</label>
                <select 
                  value={teacherId}
                  onChange={(e) => setTeacherId(e.target.value)}
                  className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all dark:text-white"
                >
                  <option value="">{t('edit_modal_teacher')}</option>
                  {teachers.map(t_item => (
                    <option key={t_item.id} value={t_item.id}>{t_item.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">د مضمون کټګوري (د سمون لپاره)</label>
                <div className="flex bg-gray-100 dark:bg-slate-700 p-1 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setDifficulty('hard')}
                    className={`flex-1 py-1 text-sm rounded-md transition-colors ${difficulty === 'hard' ? 'bg-white dark:bg-slate-800 shadow-sm text-red-600 font-bold' : 'text-gray-600 dark:text-gray-300'}`}
                  >
                    سخت
                  </button>
                  <button
                    type="button"
                    onClick={() => setDifficulty('medium')}
                    className={`flex-1 py-1 text-sm rounded-md transition-colors ${difficulty === 'medium' ? 'bg-white dark:bg-slate-800 shadow-sm text-blue-600 font-bold' : 'text-gray-600 dark:text-gray-300'}`}
                  >
                    متوسط
                  </button>
                  <button
                    type="button"
                    onClick={() => setDifficulty('easy')}
                    className={`flex-1 py-1 text-sm rounded-md transition-colors ${difficulty === 'easy' ? 'bg-white dark:bg-slate-800 shadow-sm text-green-600 font-bold' : 'text-gray-600 dark:text-gray-300'}`}
                  >
                    اسان
                  </button>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                {initialData && (
                  <button 
                    type="button"
                    onClick={onDelete}
                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    title={t('confirm_cancel')}
                  >
                    <Trash2 size={20} />
                  </button>
                )}
                <button 
                  type="submit"
                  disabled={!subject || !teacherId}
                  className="flex-1 flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-bold"
                >
                  <Check size={18} />
                  <span>{t('edit_modal_save')}</span>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default EditModal;
