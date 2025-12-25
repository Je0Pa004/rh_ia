
import React from 'react';
import { ICONS } from '../constants';

const Compliance: React.FC = () => {
  const audits = [
    { area: 'Sécurité Incendie', status: 'Conforme', lastAudit: '12/01/2024', nextAudit: '12/07/2024' },
    { area: 'Protection des Données (RGPD)', status: 'Alerte', lastAudit: '05/11/2023', nextAudit: '05/05/2024' },
    { area: 'Accidents du Travail', status: 'Conforme', lastAudit: 'En continu', nextAudit: '-' },
  ];

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div>
        <h2 className="text-6xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">Sécurité & <span className="text-indigo-600">Conformité</span></h2>
        <p className="text-slate-500 font-medium mt-4 text-lg">Garantissez un environnement de travail sûr et conforme aux régulations.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {audits.map((audit, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 p-10 rounded-[48px] border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden group">
            <div className={`absolute top-0 right-0 p-8 ${audit.status === 'Alerte' ? 'text-rose-500' : 'text-emerald-500'}`}>
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            </div>
            <h3 className="text-xl font-black text-slate-800 dark:text-white mb-8">{audit.area}</h3>
            <div className="space-y-4">
               <div className="flex justify-between items-center py-3 border-b border-slate-50 dark:border-slate-800">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Dernier Audit</span>
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-200">{audit.lastAudit}</span>
               </div>
               <div className="flex justify-between items-center py-3">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Statut</span>
                  <span className={`text-[10px] font-black uppercase tracking-widest ${audit.status === 'Conforme' ? 'text-emerald-500' : 'text-rose-500'}`}>{audit.status}</span>
               </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 text-white p-12 rounded-[56px] shadow-2xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
           <div className="max-w-xl text-center md:text-left">
              <h3 className="text-3xl font-black mb-4 uppercase italic">Ressources Santé & Sécurité</h3>
              <p className="text-slate-400 text-lg font-light leading-relaxed">Consultez le catalogue complet des protocoles HSE et les registres d'accidents du travail.</p>
           </div>
           <button className="px-12 py-6 bg-white text-slate-950 rounded-3xl font-black uppercase tracking-widest text-xs hover:scale-105 transition-all">Télécharger Protocoles</button>
        </div>
      </div>
    </div>
  );
};

export default Compliance;
