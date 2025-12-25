
import React, { useState } from 'react';
import { DocumentRecord, Employee } from '../types';
import { ICONS } from '../constants';

const Documents: React.FC<{ employees: Employee[] }> = ({ employees }) => {
  const [docs, setDocs] = useState<DocumentRecord[]>([
    { id: 'D1', employeeId: '1', name: 'Contrat_Travail_JD.pdf', type: 'Contrat', uploadDate: '2023-01-15', size: '2.4 MB' },
    { id: 'D2', employeeId: '1', name: 'ID_Card_JD.jpg', type: 'ID', uploadDate: '2023-01-15', size: '1.1 MB' },
    { id: 'D3', employeeId: '2', name: 'Diplome_Master_MC.pdf', type: 'Diplôme', uploadDate: '2022-06-10', size: '3.8 MB' },
  ]);

  const handleDelete = (id: string) => {
    if(confirm('Supprimer ce document ?')) {
      setDocs(docs.filter(d => d.id !== id));
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-6xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">Archives <span className="text-indigo-600">Digitales</span></h2>
          <p className="text-slate-500 font-medium mt-4 text-lg">Gérez les actifs documentaires de votre organisation.</p>
        </div>
        <button className="flex items-center space-x-3 bg-indigo-600 text-white px-10 py-5 rounded-[32px] transition-all shadow-2xl font-black uppercase tracking-widest text-xs active:scale-95">
          <span>Uploader Actif</span>
          {ICONS.Plus}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {docs.map(doc => {
          const emp = employees.find(e => e.id === doc.employeeId);
          return (
            <div key={doc.id} className="bg-white dark:bg-slate-900 p-8 rounded-[48px] border border-slate-100 dark:border-slate-800 shadow-xl hover:shadow-2xl transition-all group">
              <div className="flex justify-between items-start mb-6">
                <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 rounded-3xl">
                  {ICONS.Documents}
                </div>
                <button onClick={() => handleDelete(doc.id)} className="text-slate-400 hover:text-rose-500 p-2">
                  {ICONS.Delete}
                </button>
              </div>
              <h4 className="text-lg font-black text-slate-800 dark:text-white truncate">{doc.name}</h4>
              <p className="text-[10px] text-indigo-500 font-black uppercase tracking-widest mt-1">{doc.type}</p>
              
              <div className="mt-8 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl flex items-center space-x-3">
                <div className="w-10 h-10 bg-white dark:bg-slate-700 rounded-xl flex items-center justify-center font-bold text-xs">
                  {emp?.firstName[0]}{emp?.lastName[0]}
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-700 dark:text-slate-200">{emp?.firstName} {emp?.lastName}</p>
                  <p className="text-[9px] text-slate-400 font-bold uppercase">{doc.size} • {doc.uploadDate}</p>
                </div>
              </div>
              
              <button className="w-full mt-6 py-4 bg-slate-900 dark:bg-slate-800 text-white text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-indigo-600 transition-colors">Visualiser</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Documents;
