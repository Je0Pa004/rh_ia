
import React, { useState } from 'react';
import { PerformanceReview, Employee } from '../types';
import { ICONS } from '../constants';

const Performance: React.FC<{ employees: Employee[] }> = ({ employees }) => {
  const [reviews, setReviews] = useState<PerformanceReview[]>([
    { id: 'R1', employeeId: '1', reviewer: 'CEO', date: '2024-01-10', score: 4.8, comment: 'Performance exceptionnelle sur le projet Core.' },
    { id: 'R2', employeeId: '2', reviewer: 'HR Manager', date: '2024-02-15', score: 4.2, comment: 'Bonne progression, doit se focaliser sur le lead.' },
  ]);

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-6xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">Indice de <span className="text-indigo-600">Performance</span></h2>
          <p className="text-slate-500 font-medium mt-4 text-lg">Analysez et scorez l'excellence opérationnelle de vos talents.</p>
        </div>
        <button className="flex items-center space-x-3 bg-indigo-600 text-white px-10 py-5 rounded-[32px] transition-all shadow-2xl font-black uppercase tracking-widest text-xs active:scale-95">
          <span>Nouvelle Évaluation</span>
          {ICONS.Plus}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {reviews.map(review => {
          const emp = employees.find(e => e.id === review.employeeId);
          return (
            <div key={review.id} className="bg-white dark:bg-slate-900 p-10 rounded-[56px] border border-slate-100 dark:border-slate-800 shadow-xl flex flex-col md:flex-row gap-8">
              <div className="flex-shrink-0 flex flex-col items-center">
                <div className="w-24 h-24 rounded-[32px] bg-indigo-600 text-white flex items-center justify-center text-3xl font-black shadow-lg mb-4">
                  {review.score}
                </div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Score</span>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-2xl font-black text-slate-800 dark:text-white">{emp?.firstName} {emp?.lastName}</h4>
                    <p className="text-[10px] text-indigo-500 font-black uppercase tracking-widest">Évalué par {review.reviewer}</p>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">{review.date}</span>
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed italic">"{review.comment}"</p>
                <div className="mt-8 flex gap-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <div key={star} className={`w-8 h-2 rounded-full ${star <= review.score ? 'bg-indigo-500' : 'bg-slate-100 dark:bg-slate-800'}`}></div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Performance;
