
import React, { useState } from 'react';
import { Candidate } from '../types';

const Recruitment: React.FC = () => {
  const [candidates] = useState<Candidate[]>([
    { id: 'C1', name: 'Alice Vasseur', role: 'UX Designer', stage: 'Entretien', email: 'alice@test.com', appliedDate: '2024-05-20' },
    { id: 'C2', name: 'Bob Martin', role: 'DevOps Lead', stage: 'Candidature', email: 'bob@test.com', appliedDate: '2024-05-22' },
    { id: 'C3', name: 'Claire Dubois', role: 'Product Manager', stage: 'Offre', email: 'claire@test.com', appliedDate: '2024-05-18' },
  ]);

  const stages: Candidate['stage'][] = ['Candidature', 'Entretien', 'Offre', 'Rejeté'];

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div>
        <h2 className="text-6xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">Pipeline <span className="text-indigo-600">Recrutement</span></h2>
        <p className="text-slate-500 font-medium mt-4 text-lg">Attirez et engagez les meilleurs talents du marché.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {stages.map(stage => (
          <div key={stage} className="space-y-6">
            <div className="flex items-center justify-between px-6 py-4 bg-white dark:bg-slate-900 rounded-[24px] border border-slate-100 dark:border-slate-800 shadow-sm">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{stage}</span>
              <span className="bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 px-3 py-1 rounded-lg text-[10px] font-black">{candidates.filter(c => c.stage === stage).length}</span>
            </div>

            <div className="space-y-4">
              {candidates.filter(c => c.stage === stage).map(candidate => (
                <div key={candidate.id} className="bg-white dark:bg-slate-900 p-8 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all group">
                  <h4 className="text-lg font-black text-slate-800 dark:text-white tracking-tight">{candidate.name}</h4>
                  <p className="text-[10px] text-indigo-500 font-black uppercase tracking-widest mt-1">{candidate.role}</p>
                  <div className="mt-6 pt-6 border-t border-slate-50 dark:border-slate-800 flex justify-between items-center">
                    <p className="text-[9px] text-slate-400 font-bold">{new Date(candidate.appliedDate).toLocaleDateString()}</p>
                    <button className="text-[10px] font-black text-indigo-600 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Détails</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recruitment;
