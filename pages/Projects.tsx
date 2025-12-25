
import React, { useState } from 'react';
import { Project, Employee } from '../types';
import { ICONS } from '../constants';
import { Language, translations } from '../translations';

const ProjectHub: React.FC<{ employees: Employee[], language: Language }> = ({ employees, language }) => {
  const t = translations[language];
  const [projects, setProjects] = useState<Project[]>([
    { id: 'P1', name: 'Refonte UI Elite', description: 'Nouveaux standards visuels 2024.', status: 'En cours', deadline: '2024-08-01', progress: 65, team: ['1', '2'] },
    { id: 'P2', name: 'Déploiement Core AI', description: 'Intégration Gemini 3 Pro.', status: 'En attente', deadline: '2024-12-15', progress: 0, team: ['1'] },
  ]);

  return (
    <div className="space-y-12 animate-in fade-in duration-700 bg-[#f8f9ff] dark:bg-slate-950 p-8 rounded-3xl min-h-full">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic">{t.project_mastery.split(' ')[0]} <span className="text-indigo-600 font-thin not-italic">{t.project_mastery.split(' ')[1]}</span></h2>
          <p className="text-slate-500 font-medium mt-4 text-lg">Suivez l'exécution stratégique de vos unités opérationnelles.</p>
        </div>
        <button className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest text-xs shadow-2xl hover:scale-105 transition-all">
          {language === 'fr' ? 'Nouveau Projet' : 'New Project'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map(project => (
          <div key={project.id} className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm hover:shadow-2xl transition-all border border-slate-100 dark:border-slate-800 group">
            <div className="flex justify-between items-start mb-6">
              <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                project.status === 'En cours' ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-50 text-slate-400'
              }`}>
                {project.status}
              </span>
              <p className="text-[10px] font-bold text-slate-400">{project.deadline}</p>
            </div>

            <h3 className="text-xl font-black text-slate-800 dark:text-white mb-2">{project.name}</h3>
            <p className="text-xs text-slate-500 font-medium mb-8 leading-relaxed">{project.description}</p>

            <div className="flex -space-x-2 mb-8">
              {project.team.map(id => {
                const emp = employees.find(e => e.id === id);
                return (
                  <img 
                    key={id} 
                    src={`https://ui-avatars.com/api/?name=${emp?.firstName}+${emp?.lastName}&background=6366f1&color=fff&bold=true`} 
                    className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                    alt="" 
                  />
                );
              })}
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-[10px] font-black uppercase text-slate-400 tracking-widest">
                <span>Progression</span>
                <span className="text-indigo-600">{project.progress}%</span>
              </div>
              <div className="w-full h-2 bg-slate-50 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-600 transition-all duration-1000" style={{ width: `${project.progress}%` }}></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectHub;
