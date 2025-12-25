
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('admin@hrpro.com');
  const [password, setPassword] = useState('password123');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-600/20 rounded-full blur-[120px] -mr-[300px] -mt-[300px]"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[100px] -ml-[200px] -mb-[200px]"></div>
      
      <div className="max-w-[540px] w-full bg-white/[0.03] backdrop-blur-2xl p-16 rounded-[60px] shadow-2xl border border-white/10 relative z-10">
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-tr from-indigo-500 to-violet-500 rounded-3xl mx-auto flex items-center justify-center shadow-2xl shadow-indigo-500/40 mb-8 active-glow">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 className="text-4xl font-black text-white tracking-tight mb-3 italic">HR PRO <span className="font-thin not-italic text-slate-400">CONNECT</span></h1>
          <p className="text-slate-400 font-medium text-lg">Suite de Gestion des Talents d'Élite</p>
        </div>
        
        <form className="space-y-8" onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div className="space-y-2 group">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] px-1 group-focus-within:text-indigo-400 transition-colors">Noeud d'Accès</label>
              <div className="relative">
                <input
                  type="email"
                  required
                  className="w-full px-8 py-5 bg-white/5 border border-white/10 rounded-3xl text-white focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500/50 transition-all font-bold text-lg placeholder:text-slate-600"
                  placeholder="nom@organisation.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-2 group">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] px-1 group-focus-within:text-indigo-400 transition-colors">Clé de Sécurité</label>
              <div className="relative">
                <input
                  type="password"
                  required
                  className="w-full px-8 py-5 bg-white/5 border border-white/10 rounded-3xl text-white focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500/50 transition-all font-bold text-lg placeholder:text-slate-600"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-5 px-8 border border-transparent text-sm font-black rounded-3xl text-white bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 focus:outline-none shadow-2xl shadow-indigo-500/40 transition-all active:scale-95 uppercase tracking-[0.3em]"
          >
            Authentifier l'Accès
          </button>
        </form>

        <div className="text-center mt-12 pt-8 border-t border-white/5">
          <p className="text-sm text-slate-500 font-medium">
            Nouveau chef d'unité ? <Link to="/register" className="font-black text-white hover:text-indigo-400 transition-colors uppercase tracking-widest text-xs">Créer un Profil</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
