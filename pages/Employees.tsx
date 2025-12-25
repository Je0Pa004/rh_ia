
import React, { useState } from 'react';
import { Employee, Department, Position } from '../types';
import { ICONS } from '../constants';

interface EmployeesProps {
  employees: Employee[];
  setEmployees: React.Dispatch<React.SetStateAction<Employee[]>>;
  departments: Department[];
  positions: Position[];
}

const Employees: React.FC<EmployeesProps> = ({ employees, setEmployees, departments, positions }) => {
  const [showModal, setShowModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    departmentId: '',
    positionId: '',
    status: 'Actif' as 'Actif' | 'Inactif' | 'Congé',
    taskProgress: 0
  });

  const handleOpenModal = (employee?: Employee) => {
    if (employee) {
      setEditingEmployee(employee);
      setFormData({
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.email,
        phone: employee.phone,
        departmentId: employee.departmentId,
        positionId: employee.positionId,
        status: employee.status,
        taskProgress: employee.taskProgress
      });
    } else {
      setEditingEmployee(null);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        departmentId: departments[0]?.id || '',
        positionId: positions[0]?.id || '',
        status: 'Actif',
        taskProgress: 0
      });
    }
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingEmployee) {
      setEmployees(prev => prev.map(emp => emp.id === editingEmployee.id ? { ...editingEmployee, ...formData } : emp));
    } else {
      const newEmployee: Employee = {
        id: Math.random().toString(36).substr(2, 9),
        ...formData,
        joinDate: new Date().toISOString().split('T')[0],
        points: 0,
        badges: []
      };
      setEmployees(prev => [...prev, newEmployee]);
    }
    setShowModal(false);
  };

  const deleteEmployee = (id: string) => {
    if (confirm('Supprimer définitivement cet employé ?')) {
      setEmployees(prev => prev.filter(emp => emp.id !== id));
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic">Directoire <span className="text-indigo-600">Talents</span></h2>
          <p className="text-slate-500 font-medium mt-2">Gérez l'élite de votre capital humain.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-indigo-600 text-white px-8 py-4 rounded-[24px] font-black uppercase tracking-widest text-xs shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center space-x-3"
        >
          <span>Recruter</span>
          {ICONS.Plus}
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[40px] shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
              <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Identité</th>
              <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Unité & Poste</th>
              <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Statut</th>
              <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
            {employees.map(emp => (
              <tr key={emp.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-all group">
                <td className="px-10 py-6">
                  <div className="flex items-center space-x-4">
                    <img src={`https://ui-avatars.com/api/?name=${emp.firstName}+${emp.lastName}&background=6366f1&color=fff&bold=true`} className="w-12 h-12 rounded-2xl shadow-sm" alt="" />
                    <div>
                      <p className="font-black text-slate-800 dark:text-white">{emp.firstName} {emp.lastName}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">{emp.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-10 py-6">
                  <p className="text-xs font-black text-indigo-600 uppercase">{departments.find(d => d.id === emp.departmentId)?.name || 'N/A'}</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">{positions.find(p => p.id === emp.positionId)?.title || 'N/A'}</p>
                </td>
                <td className="px-10 py-6">
                  <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border ${
                    emp.status === 'Actif' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-slate-50 text-slate-400 border-slate-100'
                  }`}>
                    {emp.status}
                  </span>
                </td>
                <td className="px-10 py-6 text-right">
                  <div className="flex justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-all">
                    <button onClick={() => handleOpenModal(emp)} className="p-3 bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-indigo-600 rounded-2xl border border-slate-100 dark:border-slate-700 transition-all">{ICONS.Edit}</button>
                    <button onClick={() => deleteEmployee(emp.id)} className="p-3 bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-rose-500 rounded-2xl border border-slate-100 dark:border-slate-700 transition-all">{ICONS.Delete}</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xl z-[100] flex items-center justify-center p-6">
          <div className="bg-white dark:bg-slate-900 rounded-[48px] shadow-3xl w-full max-w-2xl border border-white/10 overflow-hidden animate-in zoom-in duration-300">
            <div className="p-10 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter uppercase">{editingEmployee ? 'Mise à jour' : 'Nouveau Talent'}</h3>
              <button onClick={() => setShowModal(false)} className="p-4 bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-rose-500 rounded-2xl transition-all">{ICONS.Delete}</button>
            </div>
            <form onSubmit={handleSubmit} className="p-10 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <input required placeholder="Prénom" className="w-full px-6 py-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 dark:text-white font-bold" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} />
                <input required placeholder="Nom" className="w-full px-6 py-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 dark:text-white font-bold" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} />
              </div>
              <input required type="email" placeholder="Email" className="w-full px-6 py-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 dark:text-white font-bold" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
              <div className="grid grid-cols-2 gap-6">
                <select className="w-full px-6 py-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 dark:text-white font-bold" value={formData.departmentId} onChange={e => setFormData({...formData, departmentId: e.target.value})}>
                  {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                </select>
                <select className="w-full px-6 py-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 dark:text-white font-bold" value={formData.positionId} onChange={e => setFormData({...formData, positionId: e.target.value})}>
                  {positions.filter(p => p.departmentId === formData.departmentId).map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
                </select>
              </div>
              <div className="pt-6 flex space-x-4">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-5 text-slate-500 font-black border-2 border-slate-100 dark:border-slate-800 rounded-2xl uppercase tracking-widest text-[10px]">Annuler</button>
                <button type="submit" className="flex-1 py-5 bg-indigo-600 text-white font-black rounded-2xl uppercase tracking-widest text-[10px] shadow-xl active:scale-95 transition-all">Valider</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Employees;
