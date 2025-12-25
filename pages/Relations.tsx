
import React, { useState } from 'react';
import { DisciplineRecord, Employee } from '../types';
import { ICONS } from '../constants';

const Relations: React.FC<{ employees: Employee[] }> = ({ employees }) => {
  const [records, setRecords] = useState<DisciplineRecord[]>([
    { id: 'D1', employeeId: '1', type: 'Avertissement', date: '2024-02-10', reason: 'Retards répétés non justifiés.', status: 'Clos' },
    { id: 'D2', employeeId: '2', type: 'Blâme', date: '2024-03-05', reason: 'Non-respect des procédures de sécurité.', status: 'Actif' },
  ]);

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-6xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">Relations <span className="text-rose-600">Sociales</span></h2>
          <p className="text-slate-500 font-medium mt-4 text-lg">Gérez le règlement intérieur, la discipline et la médiation.</p>
        </div>
        <button className="bg-rose-600 text-white px-10 py-5 rounded-[32px] font-black uppercase tracking-widest text-xs shadow-2xl active:scale-95 transition-all">
          Nouvelle Mesure
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[56px] shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
              <th className="px-12 py-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Talent Concerné</th>
              <th className="px-12 py-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Type de Mesure</th>
              <th className="px-12 py-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Motif & Date</th>
              <th className="px-12 py-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Statut</th>
              <th className="px-12 py-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] text-right">Dossier</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
            {records.map(rec => {
              const emp = employees.find(e => e.id === rec.employeeId);
              return (
                <tr key={rec.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-all group">
                  <td className="px-12 py-8">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-rose-50 dark:bg-rose-900/20 rounded-2xl flex items-center justify-center font-black text-rose-600">
                        {emp?.firstName[0]}{emp?.lastName[0]}
                      </div>
                      <p className="font-black text-slate-800 dark:text-white">{emp?.firstName} {emp?.lastName}</p>
                    </div>
                  </td>
                  <td className="px-12 py-8">
                    <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest bg-rose-50 text-rose-600 border border-rose-100`}>
                      {rec.type}
                    </span>
                  </td>
                  <td className="px-12 py-8">
                    <p className="text-sm font-bold text-slate-800 dark:text-white line-clamp-1">{rec.reason}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{rec.date}</p>
                  </td>
                  <td className="px-12 py-8">
                    <span className={`px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest border ${
                      rec.status === 'Clos' ? 'bg-slate-100 text-slate-400 border-slate-200' : 'bg-amber-50 text-amber-600 border-amber-100'
                    }`}>
                      {rec.status}
                    </span>
                  </td>
                  <td className="px-12 py-8 text-right">
                    <button className="text-xs font-black text-indigo-500 uppercase tracking-widest hover:underline">Voir détails</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Relations;
