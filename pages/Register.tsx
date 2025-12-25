
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface RegisterProps {
  onRegister: () => void;
}

const Register: React.FC<RegisterProps> = ({ onRegister }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRegister();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-600/20 rounded-full blur-[120px] -mr-[300px] -mt-[300px]"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[100px] -ml-[200px] -mb-[200px]"></div>
      
      <div className="max-w-[540px] w-full bg-white/[0.03] backdrop-blur-2xl p-16 rounded-[60px] shadow-2xl border border-white/10 relative z-10 animate-in zoom-in duration-500">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-gradient-to-tr from-indigo-500 to-violet-500 rounded-2xl mx-auto flex items-center justify-center shadow-2xl mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight mb-2 uppercase">Créer une <span className="text-indigo-400">Identité</span></h1>
          <p className="text-slate-400 font-medium">Initialisez votre noeud administrateur.</p>
        </div>
        
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] px-1">Identité Complète</label>
            <input
              type="text"
              required
              className="w-full px-8 py-4 bg-white/5 border border-white/10 rounded-3xl text-white focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500/50 transition-all font-bold placeholder:text-slate-600"
              placeholder="Nom Complet"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] px-1">Noeud Professionnel</label>
            <input
              type="email"
              required
              className="w-full px-8 py-4 bg-white/5 border border-white/10 rounded-3xl text-white focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500/50 transition-all font-bold placeholder:text-slate-600"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] px-1">Chaîne de Sécurité</label>
            <input
              type="password"
              required
              className="w-full px-8 py-4 bg-white/5 border border-white/10 rounded-3xl text-white focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500/50 transition-all font-bold placeholder:text-slate-600"
              placeholder="Mot de passe"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-5 px-8 mt-4 text-sm font-black rounded-3xl text-white bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 shadow-2xl transition-all active:scale-95 uppercase tracking-[0.3em]"
          >
            Autoriser l'Inscription
          </button>
        </form>

        <div className="text-center mt-10">
          <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">
            Identité déjà existante ? <Link to="/login" className="text-white hover:text-indigo-400 transition-colors border-b border-indigo-500/50 ml-2">Connexion Sécurisée</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
