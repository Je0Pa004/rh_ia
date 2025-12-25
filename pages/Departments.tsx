
import React, { useState } from 'react';
import { Department } from '../types';
import { ICONS } from '../constants';

interface DepartmentsProps {
  departments: Department[];
  setDepartments: React.Dispatch<React.SetStateAction<Department[]>>;
}

const Departments: React.FC<DepartmentsProps> = ({ departments, setDepartments }) => {
  const [showModal, setShowModal] = useState(false);
  const [editingDept, setEditingDept] = useState<Department | null>(null);
  const [formData, setFormData] = useState({ name: '', manager: '' });

  const handleOpenModal = (dept?: Department) => {
    if (dept) {
      setEditingDept(dept);
      setFormData({ name: dept.name, manager: dept.manager });
    } else {
      setEditingDept(null);
      setFormData({ name: '', manager: '' });
    }
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingDept) {
      setDepartments(prev => prev.map(d => d.id === editingDept.id ? { ...d, ...formData } : d));
    } else {
      const newDept: Department = {
        id: Math.random().toString(36).substr(2, 9),
        ...formData,
        employeeCount: 0
      };
      setDepartments(prev => [...prev, newDept]);
    }
    setShowModal(false);
  };

  const deleteDept = (id: string) => {
    if (confirm('Toute suppression d\'unité est irréversible. Confirmer ?')) {
      setDepartments(prev => prev.filter(d => d.id !== id));
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic">Unités <span className="text-indigo-600">Stratégiques</span></h2>
          <p className="text-slate-500 font-medium mt-2">Structurez l'architecture de votre organisation.</p>
        </div>
        <button onClick={() => handleOpenModal()} className="bg-indigo-600 text-white px-8 py-4 rounded-[24px] font-black uppercase tracking-widest text-xs shadow-xl flex items-center space-x-3 active:scale-95 transition-all">
          <span>Créer Unité</span>
          {ICONS.Plus}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {departments.map(dept => (
          <div key={dept.id} className="bg-white dark:bg-slate-900 p-8 rounded-[40px] shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-2xl transition-all group">
            <div className="flex justify-between items-start mb-8">
              <div className="w-16 h-16 bg-indigo-50 dark:bg-indigo-900/20 rounded-3xl flex items-center justify-center text-indigo-600">
                {ICONS.Departments}
              </div>
              <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-all">
                <button onClick={() => handleOpenModal(dept)} className="p-3 bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-indigo-600 rounded-xl border border-slate-100 dark:border-slate-700">{ICONS.Edit}</button>
                <button onClick={() => deleteDept(dept.id)} className="p-3 bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-rose-500 rounded-xl border border-slate-100 dark:border-slate-700">{ICONS.Delete}</button>
              </div>
            </div>
            <h3 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">{dept.name}</h3>
            <div className="mt-6 space-y-4">
              <div className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Responsable</span>
                <span className="text-xs font-bold text-slate-700 dark:text-white">{dept.manager}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Effectif</span>
                <span className="text-xs font-black text-indigo-600">{dept.employeeCount} Experts</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xl z-[100] flex items-center justify-center p-6">
          <div className="bg-white dark:bg-slate-900 rounded-[48px] shadow-3xl w-full max-w-xl border border-white/10 overflow-hidden animate-in zoom-in duration-300">
            <div className="p-10 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter uppercase">{editingDept ? 'Configuration' : 'Nouvelle Unité'}</h3>
              <button onClick={() => setShowModal(false)} className="p-4 bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-rose-500 rounded-2xl transition-all">{ICONS.Delete}</button>
            </div>
            <form onSubmit={handleSubmit} className="p-10 space-y-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Nom de l'Unité</label>
                <input required placeholder="ex: Marketing Digital" className="w-full px-8 py-5 rounded-3xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 dark:text-white font-bold" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Directeur de l'Unité</label>
                <input required placeholder="ex: Jean Dupont" className="w-full px-8 py-5 rounded-3xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 dark:text-white font-bold" value={formData.manager} onChange={e => setFormData({...formData, manager: e.target.value})} />
              </div>
              <div className="pt-6 flex space-x-4">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-6 text-slate-500 font-black border-2 border-slate-100 dark:border-slate-800 rounded-3xl uppercase tracking-widest text-xs">Annuler</button>
                <button type="submit" className="flex-1 py-6 bg-indigo-600 text-white font-black rounded-3xl uppercase tracking-widest text-xs shadow-xl active:scale-95 transition-all">Déployer</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Departments;
