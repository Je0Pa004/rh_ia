
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Employee, SalaryRecord, AttendanceRecord } from '../types';
import { ICONS } from '../constants';

const TurnoverPredictor: React.FC<{ employees: Employee[], salaries: SalaryRecord[], attendance: AttendanceRecord[] }> = ({ employees, salaries, attendance }) => {
  const [prediction, setPrediction] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const startAnalysis = async () => {
    setIsLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `En tant qu'analyste data RH expert, prédis le risque de turnover pour cette équipe de ${employees.length} talents. 
      Donne un indice de risque global (%) et 3 actions correctives. 
      Voici les indicateurs: 
      - Taux d'activité moyen: ${employees.reduce((a, b) => a + b.taskProgress, 0) / employees.length}%
      - Salaire moyen: ${salaries.reduce((a, b) => a + b.amount, 0) / salaries.length}€
      - Ratio présence/absence: ${attendance.length / employees.length}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: prompt,
        config: { thinkingConfig: { thinkingBudget: 20000 } }
      });
      setPrediction(response.text || "Analyse indisponible.");
    } catch (e) {
      setPrediction("Échec de la modélisation prédictive.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-6xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">IA <span className="text-rose-600">Turnover</span></h2>
          <p className="text-slate-500 font-medium mt-4 text-lg">Modélisez les risques de départ avant qu'ils ne surviennent.</p>
        </div>
        <button onClick={startAnalysis} disabled={isLoading} className="bg-rose-600 text-white px-10 py-5 rounded-[32px] font-black uppercase tracking-widest text-xs shadow-2xl active:scale-95 transition-all">
          {isLoading ? 'Modélisation...' : 'Lancer Simulation Prédictive'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-1 bg-white dark:bg-slate-900 p-10 rounded-[56px] border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col items-center justify-center text-center">
            <div className="w-32 h-32 rounded-full border-[8px] border-slate-50 dark:border-slate-800 flex items-center justify-center relative">
               <svg className="w-28 h-28 -rotate-90">
                  <circle cx="56" cy="56" r="48" fill="none" stroke="currentColor" strokeWidth="8" className="text-slate-100 dark:text-slate-800" />
                  <circle cx="56" cy="56" r="48" fill="none" stroke="#e11d48" strokeWidth="8" strokeDasharray={301} strokeDashoffset={301 - (301 * 12) / 100} strokeLinecap="round" className="animate-pulse" />
               </svg>
               <span className="absolute text-3xl font-black">12%</span>
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mt-6">Indice de Risque Global</p>
        </div>

        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-12 rounded-[56px] border border-slate-100 dark:border-slate-800 shadow-2xl min-h-[400px]">
           {prediction ? (
             <div className="prose dark:prose-invert max-w-none">
                <h4 className="text-xs font-black uppercase tracking-[0.4em] text-indigo-500 mb-8">Rapport de Simulation</h4>
                <div className="whitespace-pre-wrap font-medium text-slate-700 dark:text-slate-300 leading-loose">{prediction}</div>
             </div>
           ) : (
             <div className="h-full flex flex-col items-center justify-center text-center opacity-30">
                {ICONS.AI}
                <p className="mt-4 font-black uppercase tracking-widest text-xs">Simulateur en attente de données</p>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default TurnoverPredictor;
