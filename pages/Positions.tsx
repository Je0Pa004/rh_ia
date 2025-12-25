
import React, { useState } from 'react';
import { Position, Department } from '../types';
import { ICONS } from '../constants';

interface PositionsProps {
  positions: Position[];
  setPositions: React.Dispatch<React.SetStateAction<Position[]>>;
  departments: Department[];
}

const Positions: React.FC<PositionsProps> = ({ positions, setPositions, departments }) => {
  const [showModal, setShowModal] = useState(false);
  const [editingPos, setEditingPos] = useState<Position | null>(null);
  const [formData, setFormData] = useState({ title: '', baseSalary: 0, departmentId: '' });

  const handleOpenModal = (pos?: Position) => {
    if (pos) {
      setEditingPos(pos);
      setFormData({ title: pos.title, baseSalary: pos.baseSalary, departmentId: pos.departmentId });
    } else {
      setEditingPos(null);
      setFormData({ title: '', baseSalary: 4500, departmentId: departments[0]?.id || '' });
    }
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPos) {
      setPositions(prev => prev.map(p => p.id === editingPos.id ? { ...p, ...formData } : p));
    } else {
      const newPos: Position = {
        id: Math.random().toString(36).substr(2, 9),
        ...formData
      };
      setPositions(prev => [...prev, newPos]);
    }
    setShowModal(false);
  };

  const deletePos = (id: string) => {
    if (confirm('Supprimer cette fonction du catalogue ?')) {
      setPositions(prev => prev.filter(p => p.id !== id));
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic">Catalogue <span className="text-indigo-600">Fonctions</span></h2>
          <p className="text-slate-500 font-medium mt-2">Gérez les rôles et grilles salariales.</p>
        </div>
        <button onClick={() => handleOpenModal()} className="bg-indigo-600 text-white px-8 py-4 rounded-[24px] font-black uppercase tracking-widest text-xs shadow-xl flex items-center space-x-3 active:scale-95 transition-all">
          <span>Définir Rôle</span>
          {ICONS.Plus}
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[40px] shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
              <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Intitulé</th>
              <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Unité</th>
              <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Base Salaire</th>
              <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
            {positions.map(pos => (
              <tr key={pos.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-all group">
                <td className="px-10 py-6 font-black text-slate-800 dark:text-white uppercase tracking-tight text-sm">{pos.title}</td>
                <td className="px-10 py-6">
                  <span className="text-xs font-bold text-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 px-4 py-2 rounded-xl">
                    {departments.find(d => d.id === pos.departmentId)?.name || 'N/A'}
                  </span>
                </td>
                <td className="px-10 py-6 font-black text-slate-900 dark:text-white">{pos.baseSalary.toLocaleString()} €</td>
                <td className="px-10 py-6 text-right">
                  <div className="flex justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-all">
                    <button onClick={() => handleOpenModal(pos)} className="p-3 bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-indigo-600 rounded-xl border border-slate-100 dark:border-slate-700">{ICONS.Edit}</button>
                    <button onClick={() => deletePos(pos.id)} className="p-3 bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-rose-500 rounded-xl border border-slate-100 dark:border-slate-700">{ICONS.Delete}</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xl z-[100] flex items-center justify-center p-6">
          <div className="bg-white dark:bg-slate-900 rounded-[48px] shadow-3xl w-full max-w-xl border border-white/10 overflow-hidden animate-in zoom-in duration-300">
            <div className="p-10 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter uppercase">{editingPos ? 'Configuration' : 'Nouveau Rôle'}</h3>
              <button onClick={() => setShowModal(false)} className="p-4 bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-rose-500 rounded-2xl transition-all">{ICONS.Delete}</button>
            </div>
            <form onSubmit={handleSubmit} className="p-10 space-y-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Intitulé du Poste</label>
                <input required placeholder="ex: Analyste Senior" className="w-full px-8 py-5 rounded-3xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 dark:text-white font-bold" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Unité</label>
                  <select className="w-full px-8 py-5 rounded-3xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 dark:text-white font-bold" value={formData.departmentId} onChange={e => setFormData({...formData, departmentId: e.target.value})}>
                    {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Base Salaire (€)</label>
                  <input required type="number" className="w-full px-8 py-5 rounded-3xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 dark:text-white font-bold" value={formData.baseSalary} onChange={e => setFormData({...formData, baseSalary: Number(e.target.value)})} />
                </div>
              </div>
              <div className="pt-6 flex space-x-4">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-6 text-slate-500 font-black border-2 border-slate-100 dark:border-slate-800 rounded-3xl uppercase tracking-widest text-xs">Annuler</button>
                <button type="submit" className="flex-1 py-6 bg-indigo-600 text-white font-black rounded-3xl uppercase tracking-widest text-xs shadow-xl active:scale-95 transition-all">Enregistrer</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Positions;
