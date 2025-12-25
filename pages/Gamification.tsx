
import React from 'react';
import { Employee } from '../types';

const Gamification: React.FC<{ employees: Employee[] }> = ({ employees }) => {
  const sortedEmployees = [...employees].sort((a, b) => (b.points || 0) - (a.points || 0));

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-6xl font-black text-slate-900 dark:text-white tracking-tighter leading-none mb-4">Hall of <span className="text-indigo-600">Fame</span></h2>
        <p className="text-slate-500 font-medium text-lg">Célébrez l'excellence et l'engagement de vos unités d'élite.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-white dark:bg-slate-900 rounded-[56px] shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden">
            <div className="px-10 py-8 bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-xl font-black uppercase tracking-tighter">Leaderboard Global</h3>
            </div>
            <div className="p-8 space-y-4">
              {sortedEmployees.map((emp, idx) => (
                <div key={emp.id} className="flex items-center justify-between p-6 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-3xl transition-all group">
                  <div className="flex items-center space-x-6">
                    <span className={`text-2xl font-black ${idx === 0 ? 'text-amber-500' : idx === 1 ? 'text-slate-400' : idx === 2 ? 'text-amber-700' : 'text-slate-200'}`}>#{idx + 1}</span>
                    <img src={`https://ui-avatars.com/api/?name=${emp.firstName}+${emp.lastName}&background=6366f1&color=fff&bold=true`} className="w-12 h-12 rounded-2xl shadow-lg" alt="" />
                    <div>
                      <p className="font-black text-slate-800 dark:text-white">{emp.firstName} {emp.lastName}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Expert Stratégique</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black text-indigo-600">{emp.points || 1250 + (emp.taskProgress * 10)}</p>
                    <p className="text-[9px] text-slate-400 font-black uppercase">Vecteurs d'Impact</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <div className="bg-gradient-to-br from-indigo-600 to-violet-700 p-10 rounded-[48px] shadow-2xl text-white relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-3xl font-black mb-4 italic">Next Milestone</h3>
              <p className="text-indigo-100 font-medium mb-10 leading-relaxed">Le premier talent atteignant 5000 points débloquera un pack "Privilège Elite".</p>
              <div className="w-full h-4 bg-white/10 rounded-full overflow-hidden mb-4">
                <div className="h-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.5)]" style={{ width: '74%' }}></div>
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-right">74% Progès Global</p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-10 rounded-[48px] border border-slate-100 dark:border-slate-800 shadow-sm">
            <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-8">Badges Récents</h4>
            <div className="grid grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="aspect-square bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center group hover:scale-110 transition-transform">
                  <div className="w-10 h-10 bg-indigo-500/20 rounded-full blur-lg absolute group-hover:opacity-100 opacity-0 transition-opacity"></div>
                  <svg className="w-8 h-8 text-indigo-600 relative z-10" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gamification;
