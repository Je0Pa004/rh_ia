
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { Employee, Department, SalaryRecord } from '../types';
import { Language, translations } from '../translations';

interface DashboardProps {
  employees: Employee[];
  departments: Department[];
  salaries: SalaryRecord[];
  language: Language;
}

const Dashboard: React.FC<DashboardProps> = ({ employees, departments, salaries, language }) => {
  const t = translations[language];
  
  const payrollTotal = salaries.reduce((acc, s) => acc + s.amount + s.bonus, 0);
  const activeEmployees = employees.filter(e => e.status === 'Actif').length;

  const barData = [
    { name: 'JAN', payroll: 45000, recruitment: 5 },
    { name: 'FEB', payroll: 52000, recruitment: 8 },
    { name: 'MAR', payroll: 48000, recruitment: 12 },
    { name: 'APR', payroll: 61000, recruitment: 15 },
    { name: 'MAY', payroll: 55000, recruitment: 10 },
    { name: 'JUN', payroll: 67000, recruitment: 20 },
  ];

  const pieData = [
    { name: 'Technique', value: employees.filter(e => e.departmentId === '1').length, color: '#6366f1' },
    { name: 'Marketing', value: employees.filter(e => e.departmentId === '2').length, color: '#fb7185' },
    { name: 'Autres', value: 0, color: '#94a3b8' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header Statistique */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic">Vue <span className="text-indigo-600">Omnisciente</span></h2>
          <p className="text-slate-500 font-medium mt-2">Monitoring temps réel du capital humain et des flux opérationnels.</p>
        </div>
        <div className="flex space-x-4">
           <div className="px-6 py-4 glass-panel rounded-2xl flex items-center space-x-4 border border-indigo-500/20">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-[10px] font-black uppercase tracking-widest text-indigo-500">Mise à jour : Instantanée</span>
           </div>
        </div>
      </div>

      {/* KPI Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Effectif Total', value: employees.length, sub: `${activeEmployees} Actifs`, color: 'indigo' },
          { label: 'Masse Salariale', value: `${(payrollTotal / 1000).toFixed(1)}k €`, sub: 'Cycle en cours', color: 'emerald' },
          { label: 'Taux de Rétention', value: '94.2%', sub: 'IA turnover stable', color: 'violet' },
          { label: 'Indice Climat', value: '8.4/10', sub: 'Satisfaction optimale', color: 'rose' },
        ].map((kpi, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 p-8 rounded-[40px] shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-2xl transition-all group overflow-hidden relative">
             <div className={`absolute top-0 right-0 w-32 h-32 bg-${kpi.color}-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700`}></div>
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">{kpi.label}</p>
             <h3 className="text-4xl font-black text-slate-800 dark:text-white tracking-tighter">{kpi.value}</h3>
             <p className={`text-[10px] font-bold text-${kpi.color}-500 mt-2 uppercase`}>{kpi.sub}</p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 p-10 rounded-[56px] shadow-sm border border-slate-100 dark:border-slate-800 h-[500px]">
          <div className="flex justify-between items-center mb-12">
            <h3 className="text-xl font-black text-slate-800 dark:text-white uppercase tracking-tighter italic">Dépenses & Recrutement</h3>
            <div className="flex space-x-4">
               <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-indigo-600 rounded-full"></div>
                  <span className="text-[10px] font-black uppercase text-slate-400">Salaires</span>
               </div>
               <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-rose-500 rounded-full"></div>
                  <span className="text-[10px] font-black uppercase text-slate-400">Talents</span>
               </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height="80%">
            <AreaChart data={barData}>
              <defs>
                <linearGradient id="colorPayroll" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.1} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 800}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 800}} />
              <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 20px 50px rgba(0,0,0,0.1)'}} />
              <Area type="monotone" dataKey="payroll" stroke="#6366f1" strokeWidth={4} fillOpacity={1} fill="url(#colorPayroll)" />
              <Area type="monotone" dataKey="recruitment" stroke="#fb7185" strokeWidth={4} fill="none" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="lg:col-span-4 bg-white dark:bg-slate-900 p-10 rounded-[56px] shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col items-center">
           <h3 className="text-xl font-black text-slate-800 dark:text-white mb-10 uppercase tracking-tighter italic self-start">Distribution Unités</h3>
           <div className="h-64 w-full relative">
             <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} innerRadius={80} outerRadius={110} paddingAngle={10} dataKey="value">
                    {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
             </ResponsiveContainer>
             <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-black text-slate-800 dark:text-white tracking-tighter">{employees.length}</span>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Experts</span>
             </div>
           </div>
           <div className="mt-12 space-y-4 w-full">
              {pieData.map(p => (
                <div key={p.name} className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                   <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 rounded-full" style={{backgroundColor: p.color}}></div>
                      <span className="text-xs font-black uppercase text-slate-500 tracking-wide">{p.name}</span>
                   </div>
                   <span className="text-sm font-black text-slate-900 dark:text-white">{p.value}</span>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
