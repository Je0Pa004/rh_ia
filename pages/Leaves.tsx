
import React, { useState } from 'react';
import { LeaveRequest, Employee } from '../types';
import { ICONS } from '../constants';

const Leaves: React.FC<{ employees: Employee[] }> = ({ employees }) => {
  const [requests, setRequests] = useState<LeaveRequest[]>([
    { id: 'L1', employeeId: '1', type: 'Vacances', startDate: '2024-06-10', endDate: '2024-06-24', status: 'En attente', reason: 'Vacances d\'été' },
    { id: 'L2', employeeId: '2', type: 'Formation', startDate: '2024-05-15', endDate: '2024-05-17', status: 'Approuvé', reason: 'Conférence Tech' },
  ]);

  const updateStatus = (id: string, status: LeaveRequest['status']) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-6xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">Gestion des <span className="text-indigo-600">Congés</span></h2>
          <p className="text-slate-500 font-medium mt-4 text-lg">Supervisez les absences et la disponibilité de vos unités.</p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[56px] shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
              <th className="px-12 py-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Talent</th>
              <th className="px-12 py-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Type</th>
              <th className="px-12 py-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Période</th>
              <th className="px-12 py-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Statut</th>
              <th className="px-12 py-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
            {requests.map(req => {
              const emp = employees.find(e => e.id === req.employeeId);
              return (
                <tr key={req.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-all group">
                  <td className="px-12 py-8">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-indigo-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center font-black text-indigo-600">
                        {emp?.firstName[0]}{emp?.lastName[0]}
                      </div>
                      <p className="font-black text-slate-800 dark:text-white">{emp?.firstName} {emp?.lastName}</p>
                    </div>
                  </td>
                  <td className="px-12 py-8">
                    <span className="text-xs font-bold px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-600 dark:text-slate-400 uppercase tracking-widest">
                      {req.type}
                    </span>
                  </td>
                  <td className="px-12 py-8">
                    <p className="text-sm font-bold text-slate-800 dark:text-white">du {new Date(req.startDate).toLocaleDateString()}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">au {new Date(req.endDate).toLocaleDateString()}</p>
                  </td>
                  <td className="px-12 py-8">
                    <span className={`px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest border ${
                      req.status === 'Approuvé' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                      req.status === 'Refusé' ? 'bg-rose-50 text-rose-600 border-rose-100' :
                      'bg-amber-50 text-amber-600 border-amber-100'
                    }`}>
                      {req.status}
                    </span>
                  </td>
                  <td className="px-12 py-8 text-right">
                    {req.status === 'En attente' && (
                      <div className="flex justify-end space-x-3">
                        <button onClick={() => updateStatus(req.id, 'Approuvé')} className="p-3 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 rounded-2xl hover:scale-110 transition-transform">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
                        </button>
                        <button onClick={() => updateStatus(req.id, 'Refusé')} className="p-3 bg-rose-50 dark:bg-rose-900/20 text-rose-600 rounded-2xl hover:scale-110 transition-transform">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                      </div>
                    )}
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

export default Leaves;
