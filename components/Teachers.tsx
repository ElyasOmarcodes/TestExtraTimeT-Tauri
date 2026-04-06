import React, { useContext, useState } from 'react';
import { AppContext } from '../App';
import { Plus, Trash2, Edit2, Check, X, Palette, Shuffle } from 'lucide-react';
import { generateId } from '../utils';
import { COLORS } from '../types';
import ConfirmModal from './ConfirmModal';

const Teachers: React.FC = () => {
  const { state, dispatch, addToast, t } = useContext(AppContext);
  const [newTeacherName, setNewTeacherName] = useState('');
  const [colorMode, setColorMode] = useState<'random' | 'custom'>('random');
  const [customColor, setCustomColor] = useState('#3b82f6');

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTeacherName.trim()) return;
    const color = colorMode === 'random' ? COLORS[Math.floor(Math.random() * COLORS.length)] : customColor;
    dispatch({ type: 'ADD_TEACHER', payload: { id: generateId(), name: newTeacherName, color } });
    setNewTeacherName('');
    addToast('success', t('toast_teacher_added'));
  };

  const startEdit = (t_item: any) => {
    setEditingId(t_item.id);
    setEditName(t_item.name);
  };

  const saveEdit = (t_item: any) => {
    dispatch({ type: 'UPDATE_TEACHER', payload: { ...t_item, name: editName } });
    setEditingId(null);
    addToast('success', t('toast_updated'));
  };

  const confirmDelete = () => {
    if (deleteId) {
        dispatch({ type: 'DELETE_TEACHER', payload: deleteId });
        addToast('success', t('toast_deleted'));
        setDeleteId(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
      <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">{t('teacher_mgmt_title')}</h2>
      
      <form onSubmit={handleAdd} className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] shadow-sm border border-slate-200 dark:border-slate-700 mb-8 transition-colors">
        <div className="flex flex-col gap-6">
            <div className="flex gap-4">
                <input 
                type="text" 
                value={newTeacherName}
                onChange={(e) => setNewTeacherName(e.target.value)}
                placeholder={t('teacher_name_placeholder')}
                className="flex-1 px-6 py-4 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-2xl focus:ring-2 focus:ring-primary-500 outline-none dark:text-white transition-all font-bold"
                />
                <button 
                    type="submit"
                    disabled={!newTeacherName.trim()}
                    className="bg-primary-600 hover:bg-primary-700 text-white px-8 rounded-2xl flex items-center gap-2 disabled:opacity-50 transition-all whitespace-nowrap font-black shadow-lg shadow-primary-500/20"
                >
                    <Plus size={20} />
                    <span>{t('teacher_add_btn')}</span>
                </button>
            </div>
            
            <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl transition-colors border dark:border-slate-700">
                <span className="text-sm font-black text-slate-600 dark:text-slate-400">{t('teacher_color_mode')}:</span>
                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={() => setColorMode('random')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all border ${
                            colorMode === 'random' 
                            ? 'bg-white dark:bg-slate-800 border-primary-500 text-primary-600 dark:text-primary-400 shadow-md' 
                            : 'bg-transparent border-transparent text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
                        }`}
                    >
                        <Shuffle size={16} />
                        <span>{t('teacher_color_random')}</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => setColorMode('custom')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all border ${
                            colorMode === 'custom' 
                            ? 'bg-white dark:bg-slate-800 border-primary-500 text-primary-600 dark:text-primary-400 shadow-md' 
                            : 'bg-transparent border-transparent text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
                        }`}
                    >
                        <Palette size={16} />
                        <span>{t('teacher_color_custom')}</span>
                    </button>
                </div>
                {colorMode === 'custom' && (
                    <div className="flex items-center gap-2 animate-in slide-in-from-right-4 duration-300">
                        <input type="color" value={customColor} onChange={(e) => setCustomColor(e.target.value)} className="w-10 h-10 rounded-xl cursor-pointer border-2 border-white dark:border-slate-700 shadow-md" />
                    </div>
                )}
            </div>
        </div>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {state.teachers.map(t_item => (
            <div key={t_item.id} className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 flex items-center justify-between group transition-all hover:shadow-md">
                {editingId === t_item.id ? (
                    <div className="flex items-center gap-2 w-full">
                        <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} className="flex-1 px-3 py-2 border dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-900 dark:text-white font-bold" autoFocus />
                        <button onClick={() => saveEdit(t_item)} className="text-green-600 p-2 bg-green-50 dark:bg-green-900/20 rounded-xl hover:bg-green-100"><Check size={20} /></button>
                    </div>
                ) : (
                    <>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black shadow-lg border-2 border-white dark:border-slate-700 text-xl" style={{ backgroundColor: t_item.color }}>
                                {t_item.name.charAt(0)}
                            </div>
                            <span className="font-black text-slate-800 dark:text-slate-200">{t_item.name}</span>
                        </div>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => startEdit(t_item)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl"><Edit2 size={20} /></button>
                            <button onClick={() => setDeleteId(t_item.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl"><Trash2 size={20} /></button>
                        </div>
                    </>
                )}
            </div>
        ))}
      </div>
      <ConfirmModal isOpen={!!deleteId} message={t('teacher_confirm_delete')} onCancel={() => setDeleteId(null)} onConfirm={confirmDelete} />
    </div>
  );
};

export default Teachers;
