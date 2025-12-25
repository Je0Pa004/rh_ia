
import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { SalaryRecord, Employee } from '../types';
import { ICONS } from '../constants';

interface SalariesProps {
  salaries: SalaryRecord[];
  setSalaries: React.Dispatch<React.SetStateAction<SalaryRecord[]>>;
  employees: Employee[];
}

const Salaries: React.FC<SalariesProps> = ({ salaries, setSalaries, employees }) => {
  const [isGeneratingSEPA, setIsGeneratingSEPA] = useState(false);

  const chartData = useMemo(() => {
    const lastSixMonths = ['Janvier 2024', 'Février 2024', 'Mars 2024', 'Avril 2024', 'Mai 2024', 'Juin 2024'];
    return lastSixMonths.map(monthLabel => ({
      name: monthLabel.split(' ')[0],
      total: salaries.filter(s => s.month === monthLabel).reduce((sum, s) => sum + s.amount + s.bonus, 0) || (Math.random() * 2000 + 4000)
    }));
  }, [salaries]);

  const generateSEPA = () => {
    setIsGeneratingSEPA(true);
    setTimeout(() => {
      setIsGeneratingSEPA(false);
      alert("Fichier de virement SEPA XML généré avec succès. 14 virements prêts pour transmission bancaire.");
      setSalaries(salaries.map(s => ({ ...s, sepaGenerated: true, status: 'Payé' })));
    }, 2000);
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic">Flux <span className="text-indigo-600">Financiers</span></h2>
          <p className="text-slate-500 font-medium mt-4 text-lg">Gérez la distribution du capital et les audits salariaux avec automatisation SEPA.</p>
        </div>
        <div className="flex space-x-4">
          <button 
            onClick={generateSEPA}
            disabled={isGeneratingSEPA}
            className="flex items-center space-x-4 bg-slate-950 dark:bg-white dark:text-slate-950 text-white px-10 py-6 rounded-[32px] transition-all shadow-2xl font-black uppercase tracking-widest text-[11px] active:scale-95"
          >
            <span>{isGeneratingSEPA ? 'Traitement Bancaire...' : 'Générer SEPA XML'}</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4 space-y-8">
           <div className="bg-white dark:bg-slate-900 p-12 rounded-[56px] border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8">
                 <div className="w-12 h-12 bg-indigo-600/10 rounded-2xl flex items-center justify-center text-indigo-600">
                    {ICONS.Salaries}
                 </div>
              </div>
              <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-10">Masse Salariale / Cycle</p>
              <h3 className="text-6xl font-black text-slate-900 dark:text-white tracking-tighter">142.5k €</h3>
              <p className="text-xs font-bold text-emerald-500 mt-4 uppercase">+2.4% vs mois précédent</p>
              <div className="mt-12 pt-10 border-t border-slate-50 dark:border-slate-800 grid grid-cols-2 gap-8">
                 <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Bonus</p>
                    <p className="text-xl font-black text-slate-800 dark:text-white">12.4k €</p>
                 </div>
                 <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Cotisations</p>
                    <p className="text-xl font-black text-rose-500">28.9k €</p>
                 </div>
              </div>
           </div>

           <div className="bg-gradient-to-br from-indigo-600 to-violet-700 p-12 rounded-[56px] shadow-2xl text-white">
              <h4 className="text-xl font-black uppercase tracking-tighter mb-4 italic">Optimisation IA</h4>
              <p className="text-indigo-100 text-sm font-medium leading-relaxed mb-8">L'IA suggère un rééquilibrage de 4% sur les primes de l'unité Technique pour maintenir la compétitivité.</p>
              <button className="w-full py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">Lancer Audit Comparatif</button>
           </div>
        </div>

        <div className="lg:col-span-8 bg-white dark:bg-slate-900 p-12 rounded-[56px] border border-slate-100 dark:border-slate-800 shadow-sm h-full">
          <div className="flex justify-between items-center mb-12">
             <h3 className="text-xl font-black text-slate-800 dark:text-white uppercase tracking-tighter italic">Évolution Trésorerie RH</h3>
             <select className="bg-slate-50 dark:bg-slate-800 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border-none outline-none">
                <option>Année 2024</option>
                <option>Année 2023</option>
             </select>
          </div>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.1} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 800}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 800}} />
                <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.1)'}} />
                <Bar dataKey="total" radius={[16, 16, 0, 0]} barSize={50}>
                   {chartData.map((entry, index) => <Cell key={`cell-${index}`} fill={index === 5 ? '#6366f1' : '#e2e8f0'} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[56px] shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden mt-12">
        <div className="p-10 border-b border-slate-50 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
           <h4 className="text-xl font-black uppercase tracking-tighter">Registre des Bulletins</h4>
           <button className="text-xs font-black text-indigo-500 uppercase tracking-widest hover:text-indigo-600">Tout Télécharger (Zip)</button>
        </div>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-50 dark:border-slate-800">
              <th className="px-12 py-8 text-[11px] font-black text-slate-400 uppercase tracking-widest">Identité Talent</th>
              <th className="px-12 py-8 text-[11px] font-black text-slate-400 uppercase tracking-widest">Base Imposable</th>
              <th className="px-12 py-8 text-[11px] font-black text-slate-400 uppercase tracking-widest">Primes & Bonus</th>
              <th className="px-12 py-8 text-[11px] font-black text-slate-400 uppercase tracking-widest">Déductions</th>
              <th className="px-12 py-8 text-[11px] font-black text-slate-400 uppercase tracking-widest">Net à Payer</th>
              <th className="px-12 py-8 text-[11px] font-black text-slate-400 uppercase tracking-widest text-right">Statut</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
            {salaries.map(salary => {
              const emp = employees.find(e => e.id === salary.employeeId);
              const net = salary.amount + salary.bonus - salary.deductions;
              return (
                <tr key={salary.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-all group">
                  <td className="px-12 py-8 font-black text-slate-800 dark:text-white">{emp?.firstName} {emp?.lastName}</td>
                  <td className="px-12 py-8 font-bold text-slate-600 dark:text-slate-400">{salary.amount.toLocaleString()} €</td>
                  <td className="px-12 py-8 font-bold text-emerald-500">+{salary.bonus.toLocaleString()} €</td>
                  <td className="px-12 py-8 font-bold text-rose-500">-{salary.deductions.toLocaleString()} €</td>
                  <td className="px-12 py-8 font-black text-xl text-slate-900 dark:text-white">{net.toLocaleString()} €</td>
                  <td className="px-12 py-8 text-right">
                     <span className={`px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest border ${
                       salary.status === 'Payé' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'
                     }`}>
                       {salary.status} {salary.sepaGenerated && '• SEPA'}
                     </span>
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

export default Salaries;
