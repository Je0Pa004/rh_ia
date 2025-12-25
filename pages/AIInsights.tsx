
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Employee, Department, SalaryRecord, AttendanceRecord } from '../types';
import { ICONS } from '../constants';

interface AIInsightsProps {
  employees: Employee[];
  departments: Department[];
  salaries: SalaryRecord[];
  attendance: AttendanceRecord[];
}

const AIInsights: React.FC<AIInsightsProps> = ({ employees, departments, salaries, attendance }) => {
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);

  const loadingMessages = [
    "Agrégation des vecteurs de données...",
    "Modélisation de l'architecture organisationnelle...",
    "Simulation des flux de capital humain...",
    "Génération des diagnostics stratégiques...",
    "Finalisation des insights d'élite..."
  ];

  const generateAnalysis = async () => {
    setIsLoading(true);
    setAnalysis(null);
    
    // Animation de chargement
    const interval = setInterval(() => {
      setLoadingStep((prev) => (prev + 1) % loadingMessages.length);
    }, 2000);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const context = {
        totalEmployees: employees.length,
        activeCount: employees.filter(e => e.status === 'Actif').length,
        departments: departments.map(d => ({ name: d.name, employees: d.employeeCount })),
        totalPayroll: salaries.reduce((acc, s) => acc + s.amount, 0),
        attendanceRate: employees.length > 0 ? (attendance.filter(a => a.status === 'Présent').length / employees.length) * 100 : 0
      };

      const prompt = `En tant qu'expert en stratégie RH de haut niveau (Elite Consultant), analyse les données suivantes de mon entreprise :
      - Nombre total de talents : ${context.totalEmployees}
      - Répartition par unité : ${JSON.stringify(context.departments)}
      - Masse salariale globale : ${context.totalPayroll}€
      - Taux de présence moyen : ${context.attendanceRate}%
      
      Fournis un rapport structuré incluant :
      1. Diagnostic global de santé organisationnelle.
      2. Détection de risques potentiels (turnover, déséquilibres).
      3. 3 Recommandations stratégiques concrètes pour optimiser la performance des talents.
      
      Réponds en français avec un ton professionnel, analytique et visionnaire. Utilise du Markdown pour le formatage.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: prompt,
        config: {
          thinkingConfig: { thinkingBudget: 32768 }
        }
      });

      setAnalysis(response.text || "Impossible de générer l'analyse pour le moment.");
    } catch (error) {
      console.error("AI Error:", error);
      setAnalysis("Une erreur cryptographique est survenue lors de la communication avec le noyau d'intelligence. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
      clearInterval(interval);
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-4">
            <span className="p-3 bg-indigo-600 rounded-2xl shadow-xl shadow-indigo-500/20">{ICONS.AI}</span>
            Intelligence Stratégique
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium mt-2">Exploitez la puissance du raisonnement neuronal pour optimiser votre empire.</p>
        </div>
        {!isLoading && (
          <button 
            onClick={generateAnalysis}
            className="group flex items-center space-x-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white px-10 py-5 rounded-[24px] transition-all shadow-2xl shadow-indigo-500/30 active:scale-95 font-black uppercase tracking-[0.2em] text-xs"
          >
            <span>Lancer Diagnostic IA</span>
            <div className="p-1 bg-white/20 rounded-lg group-hover:rotate-180 transition-transform duration-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
          </button>
        )}
      </div>

      {!analysis && !isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Détection d'Anomalies", desc: "Identifie les déséquilibres dans les charges de travail et les présences." },
            { title: "Équité Salariale", desc: "Analyse la distribution des compensations par rapport aux benchmarks." },
            { title: "Projection de Croissance", desc: "Prévisions basées sur l'évolution actuelle de vos unités stratégiques." }
          ].map((feature, i) => (
            <div key={i} className="bg-white dark:bg-slate-900 p-10 rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-sm hover:border-indigo-500/30 transition-all cursor-default group">
              <div className="w-14 h-14 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl flex items-center justify-center text-indigo-600 mb-6 group-hover:scale-110 transition-transform">
                {ICONS.AI}
              </div>
              <h3 className="text-xl font-black text-slate-800 dark:text-white mb-3">{feature.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      )}

      {isLoading && (
        <div className="flex flex-col items-center justify-center py-40 space-y-12 animate-in zoom-in duration-500">
          <div className="relative">
            <div className="w-32 h-32 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-indigo-600 rounded-3xl animate-pulse shadow-[0_0_50px_rgba(79,70,229,0.5)] flex items-center justify-center text-white">
                {ICONS.AI}
              </div>
            </div>
          </div>
          <div className="text-center space-y-4">
            <h4 className="text-2xl font-black text-slate-900 dark:text-white animate-pulse uppercase tracking-widest">{loadingMessages[loadingStep]}</h4>
            <p className="text-slate-500 dark:text-slate-400 font-bold italic">Analyse du noyau Gemini 3 Pro en cours...</p>
          </div>
        </div>
      )}

      {analysis && (
        <div className="bg-white dark:bg-slate-900 rounded-[48px] shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden animate-in slide-in-from-bottom-12 duration-700">
          <div className="p-10 bg-gradient-to-r from-indigo-600/5 to-violet-600/5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
             <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-indigo-600 text-white rounded-xl flex items-center justify-center shadow-lg">
                   {ICONS.AI}
                </div>
                <div>
                   <p className="text-xs font-black text-indigo-500 uppercase tracking-widest">Rapport Stratégique</p>
                   <p className="text-lg font-bold text-slate-900 dark:text-white">Généré le {new Date().toLocaleDateString('fr-FR')}</p>
                </div>
             </div>
             <button 
               onClick={() => setAnalysis(null)}
               className="px-6 py-3 bg-slate-50 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all"
             >
                Nouvelle Requête
             </button>
          </div>
          <div className="p-12 prose dark:prose-invert max-w-none">
             <div className="text-slate-700 dark:text-slate-300 font-medium leading-loose space-y-6 whitespace-pre-wrap">
                {analysis}
             </div>
          </div>
          <div className="p-10 border-t border-slate-50 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 flex items-center justify-between">
             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">© Diagnostic IA Certifié HR PRO CONNECT</p>
             <button className="flex items-center space-x-2 text-indigo-600 font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform">
                <span>Exporter vers PDF</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
             </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIInsights;
