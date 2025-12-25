
import React, { useState, useRef } from 'react';
import { Expense, Employee } from '../types';
import { Language, translations } from '../translations';
import { GoogleGenAI } from "@google/genai";
import { ICONS } from '../constants';

const ExpenseHub: React.FC<{ employees: Employee[], language: Language }> = ({ employees, language }) => {
  const t = translations[language];
  const [expenses, setExpenses] = useState<Expense[]>([
    { id: 'E1', employeeId: '1', description: 'Vol Paris-New York', category: 'Voyage', amount: 1250, date: '2024-03-20', status: 'En attente' },
    { id: 'E2', employeeId: '2', description: 'Repas client Elite', category: 'Repas', amount: 340, date: '2024-03-22', status: 'Approuvé' },
  ]);
  const [isScanning, setIsScanning] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const updateStatus = (id: string, status: Expense['status']) => {
    setExpenses(expenses.map(e => e.id === id ? { ...e, status } : e));
  };

  const handleScan = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsScanning(true);
    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64 = (event.target?.result as string).split(',')[1];
      try {
        // Correct initialization of GoogleGenAI client with apiKey
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          // Refactored to use nested parts object as per guidelines
          contents: {
            parts: [
              { inlineData: { mimeType: file.type, data: base64 } },
              { text: "Extrais le montant total, la date et la catégorie de ce reçu au format JSON simple: {amount, date, category, description}. Ne renvoie que le JSON sans texte additionnel." }
            ]
          },
          config: {
            // Requesting JSON response mime type for reliable parsing
            responseMimeType: "application/json"
          }
        });
        
        try {
          // Access .text property directly
          const textResponse = response.text || '{}';
          const data = JSON.parse(textResponse);
          const newExp: Expense = {
            id: Math.random().toString(36).substr(2, 9),
            employeeId: '1',
            description: data.description || 'Scan IA',
            category: data.category || 'Autre',
            amount: Number(data.amount) || 0,
            date: data.date || new Date().toISOString().split('T')[0],
            status: 'En attente'
          };
          setExpenses(prev => [newExp, ...prev]);
        } catch {
          alert("Erreur de parsing OCR.");
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsScanning(false);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-6xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">{t.expenses.split(' ')[0]} <span className="text-indigo-600">{t.expenses.split(' ').slice(1).join(' ')}</span></h2>
          <p className="text-slate-500 font-medium mt-4 text-lg">{language === 'fr' ? 'Contrôlez les flux avec l\'aide de l\'IA Vision.' : 'Control flows with AI Vision aid.'}</p>
        </div>
        <div className="flex space-x-4">
          <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleScan} />
          <button onClick={() => fileInputRef.current?.click()} className="bg-indigo-600 text-white px-10 py-5 rounded-[32px] font-black uppercase tracking-widest text-xs shadow-2xl hover:scale-105 transition-all flex items-center space-x-3">
             <span>{isScanning ? 'Scan en cours...' : 'Scan Reçu IA'}</span>
             {ICONS.AI}
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[56px] shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
              <th className="px-12 py-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">{t.employees}</th>
              <th className="px-12 py-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Détails Transaction</th>
              <th className="px-12 py-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Capital</th>
              <th className="px-12 py-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">{t.status}</th>
              <th className="px-12 py-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] text-right">{t.actions}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
            {expenses.map(exp => {
              const emp = employees.find(e => e.id === exp.employeeId);
              return (
                <tr key={exp.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-all group">
                  <td className="px-12 py-8">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center font-black text-indigo-600">
                        {emp?.firstName[0]}{emp?.lastName[0]}
                      </div>
                      <p className="font-black text-slate-800 dark:text-white">{emp?.firstName} {emp?.lastName}</p>
                    </div>
                  </td>
                  <td className="px-12 py-8">
                    <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{exp.description}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{exp.category} • {new Date(exp.date).toLocaleDateString()}</p>
                  </td>
                  <td className="px-12 py-8 text-lg font-black text-slate-900 dark:text-white">
                    {exp.amount.toLocaleString()} €
                  </td>
                  <td className="px-12 py-8">
                    <span className={`px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest border ${
                      exp.status === 'Approuvé' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                      exp.status === 'Refusé' ? 'bg-rose-50 text-rose-600 border-rose-100' :
                      'bg-amber-50 text-amber-600 border-amber-100'
                    }`}>
                      {exp.status}
                    </span>
                  </td>
                  <td className="px-12 py-8 text-right">
                    {exp.status === 'En attente' && (
                      <div className="flex justify-end space-x-3">
                        <button onClick={() => updateStatus(exp.id, 'Approuvé')} className="p-3 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 rounded-2xl hover:scale-110 transition-transform">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
                        </button>
                        <button onClick={() => updateStatus(exp.id, 'Refusé')} className="p-3 bg-rose-50 dark:bg-rose-900/20 text-rose-600 rounded-2xl hover:scale-110 transition-transform">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpenseHub;
