
import React, { useState } from 'react';
import { Asset, Employee } from '../types';
import { ICONS } from '../constants';

const AssetTracking: React.FC<{ employees: Employee[] }> = ({ employees }) => {
  const [assets, setAssets] = useState<Asset[]>([
    { id: 'A1', name: 'MacBook Pro M3', type: 'Laptop', serialNumber: 'SN-098234', assignedTo: '1', status: 'Assigné' },
    { id: 'A2', name: 'iPhone 15 Pro', type: 'Phone', serialNumber: 'SN-772211', assignedTo: '2', status: 'Assigné' },
    { id: 'A3', name: 'Badge Alpha-01', type: 'Badge', serialNumber: 'BDG-001', assignedTo: '1', status: 'Assigné' },
  ]);

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-6xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">Inventaire <span className="text-indigo-600">Matériel</span></h2>
          <p className="text-slate-500 font-medium mt-4 text-lg">Tracez et gérez les actifs physiques de votre organisation.</p>
        </div>
        <button className="flex items-center space-x-3 bg-indigo-600 text-white px-10 py-5 rounded-[32px] transition-all shadow-2xl font-black uppercase tracking-widest text-xs active:scale-95">
          <span>Nouvel Actif</span>
          {ICONS.Plus}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {assets.map(asset => {
          const emp = employees.find(e => e.id === asset.assignedTo);
          return (
            <div key={asset.id} className="bg-white dark:bg-slate-900 p-8 rounded-[48px] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl transition-all group">
              <div className="flex justify-between items-start mb-6">
                <div className={`p-4 rounded-3xl ${asset.type === 'Laptop' ? 'bg-indigo-50 text-indigo-600' : 'bg-amber-50 text-amber-600'}`}>
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                </div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{asset.serialNumber}</span>
              </div>
              <h4 className="text-xl font-black text-slate-800 dark:text-white">{asset.name}</h4>
              <p className="text-[10px] text-indigo-500 font-black uppercase tracking-widest mt-1">{asset.type}</p>
              
              <div className="mt-8 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl flex items-center space-x-3">
                <div className="w-10 h-10 bg-white dark:bg-slate-700 rounded-xl flex items-center justify-center font-bold text-xs">
                  {emp?.firstName[0]}{emp?.lastName[0]}
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-700 dark:text-slate-200">{emp?.firstName} {emp?.lastName}</p>
                  <p className="text-[9px] text-slate-400 font-bold uppercase">Assigné le 12/03/24</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AssetTracking;
