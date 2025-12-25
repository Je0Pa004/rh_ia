
import React, { useState } from 'react';
import { AttendanceRecord, Employee } from '../types';
import { ICONS } from '../constants';

interface AttendanceProps {
  attendance: AttendanceRecord[];
  setAttendance: React.Dispatch<React.SetStateAction<AttendanceRecord[]>>;
  employees: Employee[];
}

const Attendance: React.FC<AttendanceProps> = ({ attendance, setAttendance, employees }) => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const stats = {
    present: attendance.filter(a => a.status === 'Présent').length,
    absent: attendance.filter(a => a.status === 'Absent').length,
    late: attendance.filter(a => a.status === 'Retard').length,
  };

  const toggleStatus = (employeeId: string) => {
    setAttendance(prev => {
      const existing = prev.find(a => a.employeeId === employeeId && a.date === selectedDate);
      if (existing) {
        const statuses: ('Présent' | 'Absent' | 'Retard')[] = ['Présent', 'Absent', 'Retard'];
        const nextIdx = (statuses.indexOf(existing.status as any) + 1) % statuses.length;
        return prev.map(a => (a.id === existing.id ? { ...a, status: statuses[nextIdx] } : a));
      } else {
        return [...prev, {
          id: Math.random().toString(36).substr(2, 9),
          employeeId,
          date: selectedDate,
          checkIn: '09:00',
          checkOut: '18:00',
          status: 'Présent'
        }];
      }
    });
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">Logs d'Accès</h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium mt-2">Surveillez les signaux de présence et les vérifications d'activité.</p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-2 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center space-x-3">
          <svg className="w-5 h-5 text-indigo-500 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          <input 
            type="date" 
            className="border-none focus:ring-0 text-sm font-black bg-transparent dark:text-white px-3 py-2 cursor-pointer"
            value={selectedDate}
            onChange={e => setSelectedDate(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { label: 'Présence Active', value: stats.present, color: 'emerald', sub: 'Talents en ligne' },
          { label: 'Signal Perdu', value: stats.absent, color: 'rose', sub: 'Noeuds manquants' },
          { label: 'Synchronisation Retardée', value: stats.late, color: 'amber', sub: 'Arrivées tardives' },
        ].map((stat, i) => (
          <div key={i} className={`bg-white dark:bg-slate-900 p-8 rounded-[40px] shadow-sm border border-slate-100 dark:border-slate-800 border-l-[12px] border-l-${stat.color}-500 group hover:scale-105 transition-all`}>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{stat.label}</p>
            <p className={`text-5xl font-black text-slate-800 dark:text-white mt-4 tracking-tighter`}>{stat.value}</p>
            <p className="text-xs text-slate-400 font-bold mt-2 uppercase tracking-widest">{stat.sub}</p>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[40px] shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 dark:bg-slate-800/50">
              <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Identité du Talent</th>
              <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Vecteur d'Entrée</th>
              <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Vecteur de Sortie</th>
              <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Statut Actuel</th>
              <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Vérification</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
            {employees.map((employee) => {
              const record = attendance.find(a => a.employeeId === employee.id && a.date === selectedDate);
              return (
                <tr key={employee.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors group">
                  <td className="px-10 py-6">
                    <div className="flex items-center space-x-5">
                      <img 
                        src={`https://ui-avatars.com/api/?name=${employee.firstName}+${employee.lastName}&background=f1f5f9&color=6366f1&bold=true`} 
                        className="w-14 h-14 rounded-[20px] shadow-sm border border-slate-100 dark:border-slate-700" 
                        alt="" 
                      />
                      <div>
                        <p className="text-sm font-black text-slate-800 dark:text-white group-hover:text-indigo-600 transition-colors">{employee.firstName} {employee.lastName}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Lien Actif Établi</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-6 font-mono text-sm font-bold text-slate-600 dark:text-slate-400">
                    {record?.checkIn || '00:00'}
                  </td>
                  <td className="px-10 py-6 font-mono text-sm font-bold text-slate-600 dark:text-slate-400">
                    {record?.checkOut || '00:00'}
                  </td>
                  <td className="px-10 py-6">
                    <button 
                      onClick={() => toggleStatus(employee.id)}
                      className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all hover:scale-105 active:scale-95 ${
                        record?.status === 'Présent' ? 'bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-900/20 dark:border-emerald-800' : 
                        record?.status === 'Absent' ? 'bg-rose-50 text-rose-600 border-rose-100 dark:bg-rose-900/20 dark:border-rose-800' : 
                        record?.status === 'Retard' ? 'bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-900/20 dark:border-amber-800' : 
                        'bg-slate-50 text-slate-400 border-slate-100 dark:bg-slate-800 dark:border-slate-700'
                      }`}
                    >
                      {record?.status || 'Aucun Signal'}
                    </button>
                  </td>
                  <td className="px-10 py-6 text-right">
                    <button 
                      onClick={() => toggleStatus(employee.id)}
                      className="p-3 text-indigo-600 hover:bg-indigo-50 dark:hover:bg-slate-800 rounded-2xl transition-all shadow-sm border border-slate-100 dark:border-slate-700"
                    >
                      {ICONS.Edit}
                    </button>
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

export default Attendance;
