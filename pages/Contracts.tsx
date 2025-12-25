
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
// Fixed: Removed unused 'Contract' import that was causing errors as it's not defined in types.ts
import { Employee } from '../types';
import { ICONS } from '../constants';
import { Language, translations } from '../translations';

const AIContracts: React.FC<{ employees: Employee[], language: Language }> = ({ employees, language }) => {
  const t = translations[language];
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(employees[0]?.id || '');
  const [contractType, setContractType] = useState<'CDI' | 'CDD' | 'Freelance'>('CDI');
  const [generatedContract, setGeneratedContract] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const generateContract = async () => {
    setIsLoading(true);
    setGeneratedContract(null);
    const emp = employees.find(e => e.id === selectedEmployeeId);
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Génère un contrat de travail de type ${contractType} complet en français pour :
      - Nom : ${emp?.firstName} ${emp?.lastName}
      - Email : ${emp?.email}
      - Date d'embauche : ${emp?.joinDate}
      
      Le contrat doit inclure les clauses standards (rémunération, durée, congés, confidentialité). Utilise un ton juridique formel et structure le document avec du Markdown.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });

      setGeneratedContract(response.text || "Erreur de génération.");
    } catch (e) {
      setGeneratedContract("Une erreur est survenue lors de la communication avec le noyau d'IA.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-700 bg-[#f8f9ff] dark:bg-slate-950 p-8 rounded-3xl min-h-full">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic">HR <span className="text-indigo-600 font-thin not-italic">LEGAL IA</span></h2>
          <p className="text-slate-500 font-medium mt-4 text-lg">Générez des contrats juridiquement valides en quelques secondes.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800">
            <h3 className="text-lg font-bold mb-8 uppercase tracking-widest text-indigo-500">Paramètres</h3>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Choisir Talent</label>
                <select 
                  className="w-full px-4 py-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 dark:text-white font-bold"
                  value={selectedEmployeeId}
                  onChange={e => setSelectedEmployeeId(e.target.value)}
                >
                  {employees.map(e => <option key={e.id} value={e.id}>{e.firstName} {e.lastName}</option>)}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Type de Contrat</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['CDI', 'CDD', 'Freelance'] as const).map(type => (
                    <button 
                      key={type}
                      onClick={() => setContractType(type)}
                      className={`py-3 rounded-xl text-[10px] font-black uppercase transition-all ${contractType === type ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-50 text-slate-400 hover:text-slate-600'}`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <button 
                onClick={generateContract}
                disabled={isLoading}
                className="w-full mt-8 py-5 bg-indigo-600 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-2xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
              >
                {isLoading ? 'RÉDACTION EN COURS...' : 'GÉNÉRER LE CONTRAT'}
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8">
          {generatedContract ? (
            <div className="bg-white dark:bg-slate-900 p-12 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 prose dark:prose-invert max-w-none overflow-y-auto max-h-[700px]">
              <div className="whitespace-pre-wrap font-medium text-slate-700 dark:text-slate-200">
                {generatedContract}
              </div>
            </div>
          ) : (
            <div className="bg-slate-100/50 dark:bg-slate-900/50 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl h-full min-h-[500px] flex flex-col items-center justify-center text-center p-12">
              <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-400 mb-6">
                {ICONS.Documents}
              </div>
              <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">Le contrat généré par l'IA s'affichera ici.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIContracts;
