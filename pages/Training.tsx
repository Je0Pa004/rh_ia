
import React, { useState } from 'react';
import { Training, Employee } from '../types';
import { ICONS } from '../constants';
import { Language, translations } from '../translations';

const TrainingCenter: React.FC<{ employees: Employee[], language: Language }> = ({ employees, language }) => {
  const t = translations[language];
  const [trainings, setTrainings] = useState<Training[]>([
    { id: 'T1', employeeId: '1', title: 'Intelligence Artificielle Générative', provider: 'DeepLearning.AI', startDate: '2024-03-01', endDate: '2024-04-01', progress: 75, status: 'En cours' },
    { id: 'T2', employeeId: '2', title: 'Management Stratégique', provider: 'HEC Paris', startDate: '2024-01-10', endDate: '2024-02-10', progress: 100, status: 'Terminé' },
  ]);

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-6xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">{t.training_center.split(' ')[0]} <span className="text-indigo-600">{t.training_center.split(' ').slice(1).join(' ')}</span></h2>
          <p className="text-slate-500 font-medium mt-4 text-lg">{language === 'fr' ? 'Élevez les compétences de vos talents vers l\'excellence.' : 'Elevate your talents\' skills to excellence.'}</p>
        </div>
        <button className="bg-indigo-600 text-white px-8 py-4 rounded-[28px] font-black uppercase tracking-widest text-xs shadow-2xl hover:scale-105 transition-all">
          {language === 'fr' ? 'Assigner Formation' : 'Assign Training'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {trainings.map(course => {
          const emp = employees.find(e => e.id === course.employeeId);
          return (
            <div key={course.id} className="bg-white dark:bg-slate-900 p-8 rounded-[48px] shadow-sm border border-slate-100 dark:border-slate-800 group hover:shadow-2xl transition-all">
              <div className="flex justify-between items-start mb-6">
                <div className="w-14 h-14 bg-indigo-50 dark:bg-slate-800 rounded-3xl flex items-center justify-center text-indigo-600">
                   <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253" /></svg>
                </div>
                <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${course.status === 'Terminé' ? 'bg-emerald-50 text-emerald-600' : 'bg-indigo-50 text-indigo-600'}`}>
                  {course.status}
                </span>
              </div>
              
              <h4 className="text-xl font-black text-slate-800 dark:text-white line-clamp-2 min-h-[3.5rem] leading-tight">{course.title}</h4>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-2">{course.provider}</p>

              <div className="mt-8 flex items-center space-x-3 mb-8">
                <img src={`https://ui-avatars.com/api/?name=${emp?.firstName}+${emp?.lastName}&background=f1f5f9&color=6366f1&bold=true`} className="w-10 h-10 rounded-xl" alt="" />
                <div>
                   <p className="text-xs font-black text-slate-700 dark:text-white">{emp?.firstName} {emp?.lastName}</p>
                   <p className="text-[9px] text-slate-400 font-bold uppercase">{language === 'fr' ? 'Apprenant' : 'Learner'}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                   <span>{language === 'fr' ? 'Progression' : 'Progress'}</span>
                   <span className="text-indigo-600">{course.progress}%</span>
                </div>
                <div className="w-full h-2 bg-slate-50 dark:bg-slate-800 rounded-full overflow-hidden">
                   <div className="h-full bg-indigo-600 transition-all duration-1000" style={{ width: `${course.progress}%` }}></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TrainingCenter;
