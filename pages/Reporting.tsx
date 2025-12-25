
import React from 'react';
import { ICONS } from '../constants';

const Reporting: React.FC = () => {
  const reports = [
    { title: 'Bilan Social Annuel', type: 'PDF', date: 'Mars 2024' },
    { title: 'Registre de Paie Global', type: 'XLSX', date: 'Mars 2024' },
    { title: 'Analyse Absentéisme Q1', type: 'PDF', date: 'Février 2024' },
    { title: 'Budget Formation 2024', type: 'XLSX', date: 'Janvier 2024' },
  ];

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-6xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">Générateur <span className="text-indigo-600">Reports</span></h2>
          <p className="text-slate-500 font-medium mt-4 text-lg">Compilez vos données en rapports stratégiques exploitables.</p>
        </div>
        <button className="bg-slate-900 dark:bg-white dark:text-slate-950 text-white px-10 py-5 rounded-[32px] font-black uppercase tracking-widest text-xs shadow-2xl active:scale-95 transition-all">
          Lancer Compilation
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {reports.map((report, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 p-8 rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-xl hover:shadow-2xl transition-all group">
            <div className={`w-14 h-14 rounded-2xl mb-8 flex items-center justify-center ${report.type === 'PDF' ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'}`}>
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            </div>
            <h3 className="text-lg font-black text-slate-800 dark:text-white line-clamp-1">{report.title}</h3>
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">{report.date}</p>
            <button className="w-full mt-8 py-4 border-2 border-slate-50 dark:border-slate-800 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all">Télécharger {report.type}</button>
          </div>
        ))}
      </div>
      
      <div className="bg-indigo-50 dark:bg-indigo-900/10 p-12 rounded-[56px] border border-indigo-100 dark:border-indigo-900/30">
        <div className="flex items-center space-x-6">
           <div className="w-16 h-16 bg-indigo-600 text-white rounded-3xl flex items-center justify-center shadow-lg">
              {ICONS.AI}
           </div>
           <div>
              <h4 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">Insights Automatisés</h4>
              <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">L'IA génère chaque lundi un résumé exécutif de vos indicateurs clés.</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Reporting;
