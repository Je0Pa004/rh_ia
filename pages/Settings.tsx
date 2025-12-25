
import React, { useState } from 'react';
import { ICONS } from '../constants';

const Settings: React.FC = () => {
  const [companyName, setCompanyName] = useState('Luxury Corp Worldwide');
  const [adminEmail, setAdminEmail] = useState('scarlett.j@luxury.com');
  const [notifications, setNotifications] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert("Configuration sauvegardée avec succès sur les serveurs globaux.");
    }, 1500);
  };

  const handleRotateKeys = () => {
    if(confirm("Voulez-vous vraiment renouveler les clés d'accès cryptographiques ?")) {
       alert("Nouveau cycle de clés généré. Veuillez vérifier votre canal sécurisé.");
    }
  };

  const handleHardReset = () => {
    if(confirm("ALERTE : Cette action effacera toutes les données. Êtes-vous certain ?")) {
      alert("Système réinitialisé. Reboot en cours...");
      window.location.reload();
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">Configuration Système</h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium mt-2">Ajustez votre environnement administratif et vos préférences personnelles.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl transition-all shadow-xl shadow-indigo-500/30 font-black uppercase tracking-widest active:scale-95 disabled:opacity-50"
        >
          {isSaving ? 'Synchronisation...' : 'Persister les Changements'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          {/* Profile Section */}
          <section className="bg-white dark:bg-slate-900 p-10 rounded-[40px] shadow-sm border border-slate-100 dark:border-slate-800">
            <div className="flex items-center space-x-6 mb-10">
              <div className="w-16 h-16 bg-indigo-50 dark:bg-indigo-900/20 rounded-3xl flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              </div>
              <h3 className="text-2xl font-black text-slate-800 dark:text-white uppercase tracking-tight">Hub d'Identité</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Nom de l'Admin Principal</label>
                <input 
                  type="text" 
                  value="Scarlett Johansson"
                  className="w-full px-8 py-5 rounded-3xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 dark:text-white font-bold outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all"
                  readOnly
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Email du Noeud Global</label>
                <input 
                  type="email" 
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  className="w-full px-8 py-5 rounded-3xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 dark:text-white font-bold outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all"
                />
              </div>
            </div>
          </section>

          {/* Company Section */}
          <section className="bg-white dark:bg-slate-900 p-10 rounded-[40px] shadow-sm border border-slate-100 dark:border-slate-800">
            <div className="flex items-center space-x-6 mb-10">
              <div className="w-16 h-16 bg-rose-50 dark:bg-rose-900/20 rounded-3xl flex items-center justify-center text-rose-600 dark:text-rose-400">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
              </div>
              <h3 className="text-2xl font-black text-slate-800 dark:text-white uppercase tracking-tight">Bio de l'Organisation</h3>
            </div>
            <div className="space-y-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Désignation de l'Empire</label>
                <input 
                  type="text" 
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full px-8 py-5 rounded-3xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 dark:text-white font-bold outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all"
                />
              </div>
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Siège Social Principal</label>
                   <input 
                     type="text" 
                     value="Beverly Hills, CA"
                     className="w-full px-8 py-5 rounded-3xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 dark:text-white font-bold"
                     readOnly
                   />
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Zone Opérationnelle</label>
                   <select className="w-full px-8 py-5 rounded-3xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 dark:text-white font-bold appearance-none">
                      <option>Global Elite</option>
                      <option>EU - EMEA</option>
                      <option>FR - Paris</option>
                      <option>US - West</option>
                   </select>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-10">
          {/* Preferences */}
          <section className="bg-white dark:bg-slate-900 p-10 rounded-[40px] shadow-sm border border-slate-100 dark:border-slate-800">
            <h3 className="text-xl font-black text-slate-800 dark:text-white uppercase tracking-tight mb-8">Signaux Système</h3>
            <div className="space-y-6">
               <div className="flex items-center justify-between p-6 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-800">
                  <div>
                     <p className="text-sm font-black text-slate-800 dark:text-white">Notifications Neurales</p>
                     <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">Alertes d'équipe temps réel</p>
                  </div>
                  <button 
                    onClick={() => setNotifications(!notifications)}
                    className={`w-14 h-8 rounded-full transition-all relative ${notifications ? 'bg-indigo-600' : 'bg-slate-200 dark:bg-slate-700'}`}
                  >
                     <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${notifications ? 'right-1' : 'left-1'}`}></div>
                  </button>
               </div>
               <div className="flex items-center justify-between p-6 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-800">
                  <div>
                     <p className="text-sm font-black text-slate-800 dark:text-white">Logique d'Auto-Paie</p>
                     <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">Distributions autonomes</p>
                  </div>
                  <button className="w-14 h-8 bg-slate-200 dark:bg-slate-700 rounded-full relative">
                     <div className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full"></div>
                  </button>
               </div>
            </div>
          </section>

          {/* Security */}
          <section className="bg-gradient-to-br from-indigo-600 to-violet-700 p-10 rounded-[40px] shadow-xl text-white">
            <h3 className="text-xl font-black uppercase tracking-tight mb-6">Sécurité d'Accès</h3>
            <p className="text-indigo-100 text-sm mb-8 font-medium leading-relaxed">Assurez-vous que votre identité administrative reste cryptée et sécurisée.</p>
            <button 
              onClick={handleRotateKeys}
              className="w-full py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl text-xs font-black uppercase tracking-widest transition-all"
            >
              Renouveler les Clés d'Accès
            </button>
            <button 
              onClick={handleHardReset}
              className="w-full py-4 mt-4 bg-rose-500 hover:bg-rose-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest transition-all"
            >
              Réinitialisation Système
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Settings;
