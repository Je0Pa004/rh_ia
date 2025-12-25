
import React from 'react';
import { Employee, Department } from '../types';

const OrgChart: React.FC<{ employees: Employee[], departments: Department[] }> = ({ employees, departments }) => {
  const getManager = (managerId?: string) => employees.find(e => e.id === managerId);

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-6xl font-black text-slate-900 dark:text-white tracking-tighter leading-none mb-4">Architecture <span className="text-indigo-600">Humaine</span></h2>
        <p className="text-slate-500 font-medium text-lg">Visualisation spatiale de la hiérarchie et des flux de commandement.</p>
      </div>

      <div className="flex flex-col items-center space-y-16 py-10 overflow-x-auto">
        {/* CEO / Top Level */}
        <div className="relative">
          <div className="bg-indigo-600 text-white p-8 rounded-[40px] shadow-2xl border border-white/20 w-80 text-center animate-bounce-slow">
            <div className="w-20 h-20 rounded-3xl bg-white/20 mx-auto mb-4 flex items-center justify-center font-black text-2xl">SJ</div>
            <h4 className="text-xl font-black">Scarlett Johansson</h4>
            <p className="text-xs text-indigo-200 font-bold uppercase tracking-widest mt-1">VP of Culture & Strategy</p>
          </div>
          <div className="absolute top-full left-1/2 w-[2px] h-16 bg-slate-200 dark:bg-slate-800 -translate-x-1/2"></div>
        </div>

        {/* Mid Level - Departments */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
          {departments.map(dept => (
            <div key={dept.id} className="relative flex flex-col items-center">
              <div className="bg-white dark:bg-slate-900 p-8 rounded-[40px] shadow-xl border border-slate-100 dark:border-slate-800 w-72 text-center group hover:scale-105 transition-all">
                <div className="w-16 h-16 rounded-2xl bg-slate-50 dark:bg-slate-800 mx-auto mb-4 flex items-center justify-center font-black text-indigo-500">
                  {dept.name[0]}
                </div>
                <h4 className="text-lg font-black text-slate-800 dark:text-white">{dept.manager}</h4>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Chef de l'unité {dept.name}</p>
              </div>
              
              {/* Branching Lines for employees in dept */}
              <div className="w-[2px] h-12 bg-slate-200 dark:bg-slate-800"></div>
              <div className="flex space-x-4">
                {employees.filter(e => e.departmentId === dept.id && e.lastName !== dept.manager.split(' ')[1]).slice(0, 2).map(emp => (
                  <div key={emp.id} className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-3xl border border-slate-100 dark:border-slate-800 w-32 text-center">
                    <p className="text-[10px] font-black text-slate-800 dark:text-white">{emp.firstName} {emp.lastName[0]}.</p>
                    <p className="text-[8px] text-slate-400 font-bold uppercase mt-1">Expert</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrgChart;
