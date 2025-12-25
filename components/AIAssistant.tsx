
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { ICONS } from '../constants';
import { Language, translations } from '../translations';

const AIAssistant: React.FC<{ language: Language }> = ({ language }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState<{ role: 'user' | 'ai', text: string }[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const t = translations[language];

  const handleSend = async () => {
    if (!message.trim()) return;
    const userMsg = message;
    setChat(prev => [...prev, { role: 'user', text: userMsg }]);
    setMessage('');
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const systemPrompt = language === 'fr' 
        ? "Tu es l'assistant HR PRO Copilot. Réponds brièvement et efficacement en français aux questions sur la gestion RH."
        : "You are the HR PRO Copilot assistant. Reply briefly and effectively in English to questions about HR management.";
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `${systemPrompt} Question : ${userMsg}`,
      });
      setChat(prev => [...prev, { role: 'ai', text: response.text || (language === 'fr' ? "Erreur de réponse." : "Response error.") }]);
    } catch (e) {
      setChat(prev => [...prev, { role: 'ai', text: language === 'fr' ? "Erreur de connexion neurale." : "Neural connection error." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-10 right-10 z-[100] no-print">
      {isOpen ? (
        <div className="w-96 bg-white dark:bg-slate-900 rounded-[40px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)] border border-slate-100 dark:border-slate-800 flex flex-col overflow-hidden animate-in zoom-in duration-300 h-[500px]">
          <div className="p-6 bg-indigo-600 text-white flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center animate-pulse">
                {ICONS.AI}
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-widest">{t.ai_copilot}</p>
                <p className="text-[10px] text-indigo-100 font-bold">{t.ai_active}</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:rotate-90 transition-transform">
              {ICONS.Delete}
            </button>
          </div>
          
          <div className="flex-1 p-6 overflow-y-auto space-y-4 custom-scrollbar">
            {chat.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-4 rounded-3xl text-sm ${msg.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-tl-none'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && <div className="text-[10px] text-slate-400 font-black animate-pulse uppercase">{language === 'fr' ? 'Copilot analyse...' : 'Copilot analyzing...'}</div>}
          </div>

          <div className="p-6 border-t border-slate-100 dark:border-slate-800 flex space-x-3">
            <input 
              value={message}
              onChange={e => setMessage(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && handleSend()}
              placeholder={t.ask_ai}
              className="flex-1 bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-indigo-500 rounded-2xl px-6 py-3 text-sm dark:text-white outline-none"
            />
            <button onClick={handleSend} className="bg-indigo-600 text-white p-3 rounded-2xl shadow-lg hover:scale-110 active:scale-95 transition-all">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 19l9-2-9-18-9 18 9 2zm0 0v-8" /></svg>
            </button>
          </div>
        </div>
      ) : (
        <button onClick={() => setIsOpen(true)} className="w-20 h-20 bg-indigo-600 rounded-full shadow-2xl flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-all">
          {ICONS.AI}
        </button>
      )}
    </div>
  );
};

export default AIAssistant;
