
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface LandingProps {
  isDark: boolean;
  toggleTheme: () => void;
}

const Landing: React.FC<LandingProps> = ({ isDark, toggleTheme }) => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`min-h-screen selection:bg-indigo-500/30 font-sans transition-colors duration-500 ${isDark ? 'bg-slate-950 text-white' : 'bg-white text-slate-950'}`}>
      {/* Navigation Elite */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 px-6 py-4 ${scrolled ? 'pt-2' : 'pt-6'}`}>
        <div className={`max-w-6xl mx-auto px-8 h-20 flex items-center justify-between transition-all duration-500 rounded-[32px] border ${scrolled ? (isDark ? 'bg-slate-900/40 backdrop-blur-3xl border-white/10 shadow-2xl' : 'bg-white/40 backdrop-blur-3xl border-slate-200 shadow-2xl') : 'bg-transparent border-transparent'}`}>
          <div className="flex items-center space-x-4 group cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className={`${isDark ? 'bg-white text-slate-950' : 'bg-slate-950 text-white'} w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-500`}>
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className={`text-2xl font-black tracking-tighter uppercase italic ${isDark ? 'text-white' : 'text-slate-950'}`}>HR PRO <span className="font-extralight not-italic text-slate-500">CONNECT</span></span>
          </div>

          <div className="hidden lg:flex items-center space-x-12">
            {['Écosystème', 'Talents', 'Compensations'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-[11px] font-bold uppercase tracking-[0.4em] text-slate-400 hover:text-indigo-500 transition-all hover:tracking-[0.6em]">{item}</a>
            ))}
          </div>

          <div className="flex items-center space-x-6">
            {/* Theme Toggle Button */}
            <button 
              onClick={toggleTheme}
              className={`p-3 rounded-2xl transition-all border ${isDark ? 'bg-slate-800/50 border-white/10 text-indigo-400' : 'bg-slate-100 border-slate-200 text-indigo-600'} hover:scale-110 active:scale-95`}
            >
              {isDark ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" /></svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" /></svg>
              )}
            </button>

            <Link to="/login" className={`text-[11px] font-bold uppercase tracking-[0.3em] transition-colors ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-950'}`}>Portail</Link>
            <Link to="/register" className="relative group px-8 py-3.5 overflow-hidden rounded-2xl">
              <div className={`absolute inset-0 transition-colors duration-500 ${isDark ? 'bg-white group-hover:bg-indigo-500' : 'bg-slate-950 group-hover:bg-indigo-600'}`}></div>
              <span className={`relative text-[11px] font-black uppercase tracking-[0.3em] transition-colors duration-500 ${isDark ? 'text-slate-950 group-hover:text-white' : 'text-white'}`}>Accès Alpha</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO SECTION: Architecture Humaine */}
      <section className="relative pt-64 pb-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <div className={`inline-flex items-center space-x-3 px-6 py-2.5 rounded-full border mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000 ${isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'}`}>
            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-indigo-400">Elite HR Engine • Opérationnel</span>
          </div>

          <h1 className="text-[8vw] lg:text-[9vw] font-black tracking-tighter leading-[0.8] text-center mb-16 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <span className="inline-block hover:scale-[1.02] transition-transform duration-500 cursor-default">DOMINEZ VOTRE</span> <br />
            <span className={`text-transparent bg-clip-text italic inline-block hover:skew-x-2 transition-all duration-700 ${isDark ? 'bg-gradient-to-r from-white via-indigo-300 to-slate-500' : 'bg-gradient-to-r from-slate-950 via-indigo-600 to-slate-600'}`}>EMPIRE RH</span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl text-center font-light leading-relaxed mb-20 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
            L'architecture logicielle ultime pour centraliser vos talents, automatiser vos flux financiers et monitorer chaque présence avec une précision chirurgicale.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-8 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500">
            <button 
              onClick={() => navigate('/register')}
              className={`px-16 py-7 rounded-[32px] text-sm font-black uppercase tracking-[0.4em] hover:scale-105 active:scale-95 transition-all shadow-2xl ${isDark ? 'bg-white text-slate-950 shadow-white/5' : 'bg-slate-950 text-white shadow-slate-950/20'}`}
            >
              Initialiser la Suite
            </button>
            <button 
              onClick={() => navigate('/login')}
              className={`px-12 py-7 glass-panel rounded-[32px] text-sm font-black uppercase tracking-[0.4em] hover:bg-white/10 transition-all flex items-center space-x-4 group ${isDark ? 'text-white' : 'text-slate-950 border-slate-200'}`}
            >
               <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
               <span>Portail RH</span>
            </button>
          </div>
        </div>

        {/* Dynamic HR Preview */}
        <div className="max-w-6xl mx-auto mt-40 relative animate-float">
          <div className="absolute inset-0 bg-indigo-500/10 rounded-[60px] blur-[120px] -z-10"></div>
          <div className={`glass-panel p-4 rounded-[64px] border shadow-2xl ${isDark ? 'border-white/20' : 'border-slate-200'}`}>
            <div className={`${isDark ? 'bg-slate-950' : 'bg-white'} rounded-[50px] aspect-[16/10] overflow-hidden relative border ${isDark ? 'border-white/5' : 'border-slate-100'}`}>
               <div className={`absolute top-0 w-full h-16 flex items-center px-12 justify-between ${isDark ? 'bg-white/5' : 'bg-slate-50'}`}>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500/40"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-500/40"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-500/40"></div>
                  </div>
                  <div className={`flex-1 max-w-md mx-8 h-8 rounded-xl border ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'}`}></div>
                  <div className="w-10 h-10 rounded-full bg-indigo-500/20"></div>
               </div>
               <div className="pt-24 px-12 grid grid-cols-12 gap-8">
                  <div className="col-span-3 space-y-6">
                     <div className={`h-32 rounded-3xl animate-pulse flex items-center justify-center ${isDark ? 'bg-white/5' : 'bg-slate-50'}`}>
                        <div className="w-12 h-12 bg-indigo-500/20 rounded-full blur-xl"></div>
                     </div>
                     <div className={`h-48 rounded-3xl ${isDark ? 'bg-white/5' : 'bg-slate-50'}`}></div>
                  </div>
                  <div className={`col-span-6 bg-gradient-to-br from-indigo-500/10 to-violet-500/10 rounded-[40px] border border-indigo-500/20 flex flex-col items-center justify-center p-10 text-center`}>
                     <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.5em] mb-4">Analyse Prédictive</p>
                     <div className={`text-4xl font-black mb-6 ${isDark ? 'text-white' : 'text-slate-950'}`}>+24.8%</div>
                     <div className={`w-full h-2 rounded-full overflow-hidden ${isDark ? 'bg-white/5' : 'bg-slate-200'}`}>
                        <div className="w-3/4 h-full bg-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.5)]"></div>
                     </div>
                  </div>
                  <div className="col-span-3 space-y-6">
                     <div className="h-20 bg-emerald-500/10 rounded-2xl border border-emerald-500/20"></div>
                     <div className={`h-60 rounded-3xl ${isDark ? 'bg-white/5' : 'bg-slate-50'}`}></div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* BENTO GRID: Capacités RH Stratégiques */}
      <section id="écosystème" className="py-40 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
             <div className="max-w-2xl">
                <h2 className={`text-5xl md:text-7xl font-black tracking-tighter mb-8 uppercase leading-tight ${isDark ? 'text-white' : 'text-slate-950'}`}>CAPACITÉS <br /><span className="text-indigo-500 italic">OMNISCIENTES</span></h2>
                <p className="text-xl text-slate-500 font-medium">Contrôlez chaque vecteur de votre organisation avec une clarté absolue.</p>
             </div>
             <div className="flex gap-4">
                <div className="glass-panel p-6 rounded-3xl text-center w-44 border border-slate-200 dark:border-white/10">
                   <p className={`text-3xl font-black ${isDark ? 'text-white' : 'text-slate-950'}`}>98%</p>
                   <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-2">Rétention Talents</p>
                </div>
                <div className="glass-panel p-6 rounded-3xl text-center w-44 border border-slate-200 dark:border-white/10">
                   <p className={`text-3xl font-black ${isDark ? 'text-white' : 'text-slate-950'}`}>0.0s</p>
                   <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-2">Erreur Paie</p>
                </div>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 grid-rows-2 gap-8 h-auto md:h-[800px]">
             {/* Feature 1: Employés */}
             <div className="md:col-span-8 md:row-span-1 glass-panel rounded-[48px] p-12 relative overflow-hidden group border border-slate-200 dark:border-white/10">
                <div className="relative z-10">
                   <div className="w-16 h-16 bg-indigo-500/10 rounded-2xl mb-8 flex items-center justify-center">
                      <svg className="w-8 h-8 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                   </div>
                   <h3 className={`text-3xl font-black mb-4 uppercase tracking-tight ${isDark ? 'text-white' : 'text-slate-950'}`}>Directoire de Talents</h3>
                   <p className="text-slate-500 dark:text-slate-400 text-lg max-w-md font-light leading-relaxed">Profilage complet de vos collaborateurs. Suivi des performances, des compétences et du potentiel de croissance en un coup d'œil.</p>
                </div>
                <div className="absolute bottom-[-30%] right-[-10%] w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[100px] group-hover:bg-indigo-600/20 transition-all duration-1000"></div>
             </div>
             
             {/* Feature 2: Salaires */}
             <div className="md:col-span-4 md:row-span-1 bg-gradient-to-br from-indigo-600 to-violet-700 rounded-[48px] p-12 shadow-2xl relative overflow-hidden group">
                <div className="relative z-10">
                   <div className="w-16 h-16 bg-white/10 rounded-2xl mb-8 flex items-center justify-center">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2" /></svg>
                   </div>
                   <h3 className="text-3xl font-black mb-4 uppercase tracking-tight text-white">Ingénierie Salariale</h3>
                   <p className="text-indigo-100 font-light leading-relaxed">Gestion automatisée des compensations, primes et audits fiscaux à haute vélocité.</p>
                </div>
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
             </div>

             {/* Feature 3: Présences */}
             <div className="md:col-span-4 md:row-span-1 glass-panel rounded-[48px] p-12 hover:border-white/20 transition-all group border border-slate-200 dark:border-white/10">
                <div className="w-16 h-16 bg-slate-500/10 rounded-2xl mb-8 flex items-center justify-center">
                   <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                </div>
                <h3 className={`text-3xl font-black mb-4 uppercase tracking-tight ${isDark ? 'text-white' : 'text-slate-950'}`}>Flux de Présences</h3>
                <p className="text-slate-500 dark:text-slate-400 font-light leading-relaxed">Tracking temps réel des signaux d'activité. Identifiez les retards et absences instantanément.</p>
             </div>

             {/* Feature 4: Départements */}
             <div className="md:col-span-8 md:row-span-1 glass-panel rounded-[48px] p-12 flex items-center justify-between group overflow-hidden border border-slate-200 dark:border-white/10">
                <div className="max-w-md">
                   <div className="w-16 h-16 bg-violet-500/10 rounded-2xl mb-8 flex items-center justify-center">
                      <svg className="w-8 h-8 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5" /></svg>
                   </div>
                   <h3 className={`text-3xl font-black mb-4 uppercase tracking-tight ${isDark ? 'text-white' : 'text-slate-950'}`}>Unités Stratégiques</h3>
                   <p className="text-slate-500 dark:text-slate-400 font-light leading-relaxed">Architecture organisationnelle flexible. Segmentez votre entreprise en unités autonomes de haute performance.</p>
                </div>
                <div className={`hidden lg:flex w-48 h-48 rounded-full border items-center justify-center group-hover:scale-125 transition-transform duration-1000 ${isDark ? 'border-indigo-500/20' : 'border-indigo-500/10'}`}>
                   <div className="w-32 h-32 rounded-full border border-indigo-500/40 animate-pulse flex items-center justify-center">
                      <div className="w-16 h-16 bg-indigo-500/20 rounded-full blur-xl"></div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Trust & Global Presence */}
      <section className={`py-40 border-y ${isDark ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-100'}`}>
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h3 className="text-[10px] font-black uppercase tracking-[0.8em] text-indigo-500 mb-20">UNITÉS RH OPÉRATIONNELLES</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-20 opacity-20 hover:opacity-100 transition-all duration-1000">
             {['GENÈVE', 'SINGAPOUR', 'DUBAÏ', 'PARIS', 'TOKYO'].map(city => (
               <div key={city} className={`text-3xl font-black tracking-tighter hover:text-indigo-400 cursor-default ${isDark ? 'text-white' : 'text-slate-950'}`}>{city}</div>
             ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-40 px-6 text-center relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] -z-10"></div>
          <h2 className={`text-5xl md:text-8xl font-black tracking-tighter mb-12 uppercase italic ${isDark ? 'text-white' : 'text-slate-950'}`}>PRÊT POUR <br /><span className="text-indigo-500 not-italic">L'EXCELLENCE ?</span></h2>
          <button 
            onClick={() => navigate('/register')}
            className="px-20 py-8 bg-indigo-600 hover:bg-indigo-700 text-white rounded-[32px] text-sm font-black uppercase tracking-[0.5em] transition-all hover:scale-110 shadow-[0_40px_80px_-20px_rgba(99,102,241,0.6)] active:scale-95"
          >
            Déployer HR Pro
          </button>
      </section>

      {/* Footer Elite */}
      <footer className={`pt-40 pb-20 px-6 border-t ${isDark ? 'border-white/5' : 'border-slate-100'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-20 mb-32">
            <div className="md:col-span-6">
              <div className="flex items-center space-x-4 mb-10">
                <div className={`${isDark ? 'bg-white text-slate-950' : 'bg-slate-950 text-white'} w-14 h-14 rounded-[20px] flex items-center justify-center shadow-2xl`}>
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <span className={`text-3xl font-black tracking-tighter uppercase italic ${isDark ? 'text-white' : 'text-slate-950'}`}>HR PRO <span className="font-extralight not-italic text-slate-500">CONNECT</span></span>
              </div>
              <p className="text-2xl text-slate-500 font-light leading-relaxed max-w-lg">
                Redéfinir les standards de l'intelligence RH. Conçu pour les leaders qui bâtissent le futur.
              </p>
            </div>
            <div className="md:col-span-3">
              <h4 className={`text-[10px] font-black uppercase tracking-[0.4em] mb-10 ${isDark ? 'text-white' : 'text-slate-950'}`}>Modules Alpha</h4>
              <ul className="space-y-6 text-slate-500 font-bold text-xs uppercase tracking-[0.2em]">
                <li className={`hover:text-indigo-500 cursor-pointer transition-colors ${isDark ? 'hover:text-white' : 'hover:text-slate-950'}`}>Directoire Talents</li>
                <li className={`hover:text-indigo-500 cursor-pointer transition-colors ${isDark ? 'hover:text-white' : 'hover:text-slate-950'}`}>Flux Financiers</li>
                <li className={`hover:text-indigo-500 cursor-pointer transition-colors ${isDark ? 'hover:text-white' : 'hover:text-slate-950'}`}>Logs Présence</li>
              </ul>
            </div>
            <div className="md:col-span-3">
              <h4 className={`text-[10px] font-black uppercase tracking-[0.4em] mb-10 ${isDark ? 'text-white' : 'text-slate-950'}`}>Assistance</h4>
              <ul className="space-y-6 text-slate-500 font-bold text-xs uppercase tracking-[0.2em]">
                <li className={`hover:text-indigo-500 cursor-pointer transition-colors ${isDark ? 'hover:text-white' : 'hover:text-slate-950'}`}>Support Concierge</li>
                <li className={`hover:text-indigo-500 cursor-pointer transition-colors ${isDark ? 'hover:text-white' : 'hover:text-slate-950'}`}>API Documentation</li>
                <li className={`hover:text-indigo-500 cursor-pointer transition-colors ${isDark ? 'hover:text-white' : 'hover:text-slate-950'}`}>Sécurité Node</li>
              </ul>
            </div>
          </div>
          
          <div className={`flex flex-col md:flex-row justify-between items-center pt-20 border-t gap-8 ${isDark ? 'border-white/5' : 'border-slate-100'}`}>
            <p className="text-[9px] font-black text-slate-600 uppercase tracking-[0.6em]">© 2024 HR PRO CONNECT • ÉDITION ELITE RH • TOUS DROITS RÉSERVÉS</p>
            <div className="flex space-x-12">
               <span className={`text-[10px] font-black text-slate-500 hover:text-indigo-500 cursor-pointer transition-all uppercase tracking-widest ${isDark ? 'hover:text-white' : 'hover:text-slate-950'}`}>LinkedIn</span>
               <span className={`text-[10px] font-black text-slate-500 hover:text-indigo-500 cursor-pointer transition-all uppercase tracking-widest ${isDark ? 'hover:text-white' : 'hover:text-slate-950'}`}>Privacy Protocol</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
