
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { ICONS } from '../constants';

const SocialSurveys: React.FC = () => {
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const mockResponses = [
    "L'ambiance est excellente mais le workflow est parfois lourd.",
    "Je me sens épanoui, les nouveaux bureaux sont parfaits.",
    "Trop de réunions inutiles le lundi matin.",
    "Le management est à l'écoute, j'apprécie la flexibilité."
  ];

  const analyzeClimat = async () => {
    setIsLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Analyse ces retours d'employés et donne un score de climat social sur 100, ainsi qu'une recommandation : ${mockResponses.join(' | ')}`;
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt
      });
      setAnalysis(response.text || "Analyse impossible.");
    } catch (e) {
      setAnalysis("Erreur de connexion neurale.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-6xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">Climat <span className="text-indigo-600">Social</span></h2>
          <p className="text-slate-500 font-medium mt-4 text-lg">Écoutez le pouls de votre organisation avec l'IA.</p>
        </div>
        <button onClick={analyzeClimat} disabled={isLoading} className="bg-indigo-600 text-white px-10 py-5 rounded-[32px] font-black uppercase tracking-widest text-xs shadow-2xl active:scale-95 transition-all flex items-center space-x-4">
          <span>{isLoading ? 'Analyse...' : 'Analyse Sentiment IA'}</span>
          {ICONS.AI}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-6">
          <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-8">Flux de Réponses Récent</h3>
          {mockResponses.map((res, i) => (
            <div key={i} className="bg-white dark:bg-slate-900 p-8 rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500 group-hover:w-2 transition-all"></div>
              <p className="text-slate-700 dark:text-slate-200 font-medium italic">"{res}"</p>
            </div>
          ))}
        </div>

        <div className="bg-white dark:bg-slate-900 p-12 rounded-[56px] border border-slate-100 dark:border-slate-800 shadow-2xl flex flex-col items-center justify-center text-center">
          {analysis ? (
            <div className="animate-in fade-in duration-500">
              <div className="w-24 h-24 bg-indigo-600 text-white rounded-full flex items-center justify-center text-3xl font-black mx-auto mb-8 shadow-2xl shadow-indigo-500/40">82</div>
              <h4 className="text-2xl font-black mb-4 uppercase tracking-tighter">Diagnostic IA</h4>
              <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed whitespace-pre-wrap">{analysis}</p>
            </div>
          ) : (
            <div className="space-y-6 opacity-30">
              <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-full mx-auto"></div>
              <p className="text-sm font-black uppercase tracking-widest">En attente de diagnostic</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SocialSurveys;
