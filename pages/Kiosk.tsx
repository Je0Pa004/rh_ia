
import React, { useState, useRef, useEffect } from 'react';
import { ICONS } from '../constants';

const Kiosk: React.FC = () => {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [currentTime, setCurrentTime] = useState(new Date());
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const startKiosk = async () => {
    setIsCameraActive(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch (err) {
      alert("Accès caméra requis pour le mode Kiosque.");
      setIsCameraActive(false);
    }
  };

  const simulateScan = (type: string) => {
    setStatus('success');
    setTimeout(() => setStatus('idle'), 3000);
  };

  return (
    <div className="min-h-full flex items-center justify-center bg-slate-900 rounded-[60px] relative overflow-hidden p-12 border border-white/5">
      <div className="absolute inset-0 bg-indigo-600/5 blur-[120px]"></div>
      
      <div className="max-w-4xl w-full flex flex-col items-center text-center relative z-10">
        <div className="mb-12">
           <div className="text-8xl font-black text-white tracking-tighter mb-2">
             {currentTime.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
           </div>
           <p className="text-indigo-400 font-black uppercase tracking-[0.6em] text-xs">Station de Pointage Alpha</p>
        </div>

        <div className="w-full aspect-video bg-black rounded-[56px] border-[6px] border-white/10 shadow-3xl overflow-hidden relative group">
          {isCameraActive ? (
            <>
              <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover grayscale opacity-50" />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                 <div className="w-80 h-80 border-2 border-indigo-500/40 rounded-full animate-pulse flex items-center justify-center">
                    <div className="w-64 h-64 border border-indigo-500/20 rounded-full animate-ping"></div>
                 </div>
              </div>
              <div className="absolute bottom-10 left-10 flex items-center space-x-3 bg-white/10 backdrop-blur-xl px-6 py-3 rounded-2xl border border-white/10">
                 <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                 <span className="text-[10px] font-black text-white uppercase tracking-widest">Reconnaissance Active</span>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full space-y-8 bg-gradient-to-br from-slate-900 to-black">
              <div className="w-24 h-24 bg-indigo-600/20 text-indigo-500 rounded-full flex items-center justify-center animate-shimmer">
                {ICONS.AI}
              </div>
              <div className="space-y-4">
                 <h4 className="text-2xl font-black text-white uppercase tracking-tighter italic">Terminal de Sécurité</h4>
                 <p className="text-slate-500 font-medium">L'authentification faciale est requise pour toute interaction.</p>
              </div>
              <button onClick={startKiosk} className="px-16 py-6 bg-white text-slate-950 rounded-[32px] font-black uppercase tracking-[0.3em] text-[11px] hover:scale-110 active:scale-95 transition-all shadow-2xl">
                Activer Terminal
              </button>
            </div>
          )}
          
          {status === 'success' && (
            <div className="absolute inset-0 bg-emerald-500/95 flex flex-col items-center justify-center animate-in fade-in zoom-in duration-500">
               <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center text-emerald-500 mb-8 shadow-3xl">
                  <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" /></svg>
               </div>
               <p className="text-5xl font-black text-white uppercase tracking-tighter italic">Accès Validé</p>
               <div className="mt-4 px-8 py-3 bg-white/20 rounded-2xl border border-white/20">
                  <p className="text-white font-black uppercase tracking-widest text-xs">Bienvenue, Jean Dupont</p>
               </div>
            </div>
          )}
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-2xl">
          <button 
            onClick={() => simulateScan('IN')} 
            disabled={!isCameraActive}
            className="p-10 bg-white/5 border border-white/10 rounded-[48px] text-white hover:bg-emerald-500/10 hover:border-emerald-500/30 transition-all flex flex-col items-center group disabled:opacity-20"
          >
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-125 transition-transform duration-500">
               <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            </div>
            <span className="text-xs font-black uppercase tracking-[0.4em]">Début de Mission</span>
          </button>
          
          <button 
            onClick={() => simulateScan('OUT')} 
            disabled={!isCameraActive}
            className="p-10 bg-white/5 border border-white/10 rounded-[48px] text-white hover:bg-rose-500/10 hover:border-rose-500/30 transition-all flex flex-col items-center group disabled:opacity-20"
          >
            <div className="w-16 h-16 bg-rose-500/20 text-rose-400 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-125 transition-transform duration-500">
               <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            </div>
            <span className="text-xs font-black uppercase tracking-[0.4em]">Fin de Service</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Kiosk;
