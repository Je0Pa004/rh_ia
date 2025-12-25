
import React, { useState } from 'react';
import { Employee, OnboardingTask } from '../types';

const Onboarding: React.FC<{ employees: Employee[] }> = ({ employees }) => {
  const [tasks, setTasks] = useState<OnboardingTask[]>([
    { id: '1', employeeId: '1', title: 'Signature du contrat', isCompleted: true, category: 'Administratif' },
    { id: '2', employeeId: '1', title: 'Remise du MacBook Pro', isCompleted: false, category: 'Matériel' },
    { id: '3', employeeId: '1', title: 'Session de bienvenue', isCompleted: false, category: 'Culture' },
    { id: '4', employeeId: '2', title: 'Création compte Slack', isCompleted: true, category: 'Administratif' },
  ]);

  // Fixed: changed 'r' to 't' to correctly return the unmodified task object
  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, isCompleted: !t.isCompleted } : t));
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div>
        <h2 className="text-6xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">Vecteur d'<span className="text-indigo-600">Intégration</span></h2>
        <p className="text-slate-500 font-medium mt-4 text-lg">Assurez une immersion parfaite pour chaque nouveau talent d'élite.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {employees.map(emp => {
          const empTasks = tasks.filter(t => t.employeeId === emp.id);
          const progress = Math.round((empTasks.filter(t => t.isCompleted).length / empTasks.length) * 100) || 0;

          return (
            <div key={emp.id} className="bg-white dark:bg-slate-900 p-10 rounded-[56px] shadow-2xl border border-slate-100 dark:border-slate-800">
              <div className="flex justify-between items-start mb-10">
                <div className="flex items-center space-x-6">
                  <div className="w-16 h-16 bg-indigo-600 rounded-[24px] flex items-center justify-center text-white text-xl font-black">
                    {emp.firstName[0]}{emp.lastName[0]}
                  </div>
                  <div>
                    <h4 className="text-2xl font-black text-slate-800 dark:text-white">{emp.firstName} {emp.lastName}</h4>
                    <p className="text-[10px] text-indigo-500 font-black uppercase tracking-widest mt-1">Nouveau Talent • Arrivée {emp.joinDate}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-4xl font-black text-slate-900 dark:text-white">{progress}%</span>
                  <p className="text-[9px] text-slate-400 font-black uppercase mt-1">Immersion</p>
                </div>
              </div>

              <div className="space-y-4">
                {empTasks.map(task => (
                  <div 
                    key={task.id} 
                    // Refactored: used toggleTask function instead of inline dispatch
                    onClick={() => toggleTask(task.id)}
                    className={`flex items-center justify-between p-6 rounded-[28px] border cursor-pointer transition-all ${
                      task.isCompleted ? 'bg-emerald-50/50 border-emerald-100' : 'bg-slate-50/50 border-slate-100 hover:border-indigo-300'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${task.isCompleted ? 'bg-emerald-500 text-white' : 'border-2 border-slate-200'}`}>
                        {task.isCompleted && <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>}
                      </div>
                      <span className={`font-bold ${task.isCompleted ? 'text-slate-400 line-through' : 'text-slate-700 dark:text-slate-200'}`}>{task.title}</span>
                    </div>
                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{task.category}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Onboarding;
