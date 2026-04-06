import React, { useContext, useState } from 'react';
import { AppContext } from '../App';
import { Plus, Trash2, Edit2, Check, X, GraduationCap } from 'lucide-react';
import { generateId } from '../utils';
import ConfirmModal from './ConfirmModal';

const Classes: React.FC = () => {
  const { state, dispatch, addToast, t } = useContext(AppContext);
  const [newClassName, setNewClassName] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClassName.trim()) return;

    dispatch({ 
        type: 'ADD_CLASS', 
        payload: { id: generateId(), name: newClassName } 
    });
    setNewClassName('');
    addToast('success', t('toast_class_added'));
  };

  const startEdit = (c: any) => {
    setEditingId(c.id);
    setEditName(c.name);
  };

  const saveEdit = (c: any) => {
    dispatch({ type: 'UPDATE_CLASS', payload: { ...c, name: editName } });
    setEditingId(null);
    addToast('success', t('toast_updated'));
  };

  const confirmDelete = () => {
    if (deleteId) {
        dispatch({ type: 'DELETE_CLASS', payload: deleteId });
        addToast('success', t('toast_deleted'));
        setDeleteId(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
      <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">{t('class_mgmt_title')}</h2>
      
      <form onSubmit={handleAdd} className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 mb-8 flex gap-4 transition-colors">
        <input 
          type="text" 
          value={newClassName}
          onChange={(e) => setNewClassName(e.target.value)}
          placeholder={t('class_name_placeholder')}
          className="flex-1 px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none dark:bg-slate-900 dark:text-white"
        />
        <button 
            type="submit"
            disabled={!newClassName.trim()}
            className="bg-primary-600 hover:bg-primary-700 text-white px-6 rounded-xl flex items-center gap-2 disabled:opacity-50 transition-colors font-bold"
        >
            <Plus size={20} />
            <span>{t('teacher_add_btn')}</span>
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {state.classes.map(c => (
            <div key={c.id} className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 flex items-center justify-between group transition-colors">
                {editingId === c.id ? (
                    <div className="flex items-center gap-2 w-full">
                        <input 
                            type="text" 
                            value={editName} 
                            onChange={(e) => setEditName(e.target.value)}
                            className="flex-1 px-2 py-1 border dark:border-slate-600 rounded bg-slate-50 dark:bg-slate-900 dark:text-white"
                            autoFocus
                        />
                        <button onClick={() => saveEdit(c)} className="text-green-600 p-1 bg-green-50 dark:bg-green-900/20 rounded hover:bg-green-100"><Check size={16} /></button>
                        <button onClick={() => setEditingId(null)} className="text-slate-400 p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded"><X size={16} /></button>
                    </div>
                ) : (
                    <>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                                <GraduationCap size={20} />
                            </div>
                            <span className="font-medium text-slate-700 dark:text-slate-200">{c.name}</span>
                        </div>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => startEdit(c)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                                <Edit2 size={18} />
                            </button>
                            <button onClick={() => setDeleteId(c.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </>
                )}
            </div>
        ))}
      </div>

      <ConfirmModal 
        isOpen={!!deleteId}
        message={t('class_confirm_delete')}
        onCancel={() => setDeleteId(null)}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default Classes;