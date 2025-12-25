
import React from 'react';
import { NavLink } from 'react-router-dom';
import { ICONS } from '../constants';
import { Language, translations } from '../translations';

interface SidebarProps {
  language: Language;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ language, onLogout }) => {
  const t = translations[language];
  
  const sections = [
    {
      title: language === 'fr' ? 'Pilotage & IA' : 'Control & AI',
      items: [
        { name: t.dashboard, path: '/dashboard', icon: ICONS.Dashboard },
        { name: t.ai_insights, path: '/ai-insights', icon: ICONS.AI },
        { name: t.turnover, path: '/turnover', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg> },
        { name: language === 'fr' ? 'Reporting Experts' : 'Expert Reporting', path: '/reporting', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg> },
      ]
    },
    {
      title: language === 'fr' ? 'Gestion Administrative' : 'Administration',
      items: [
        { name: t.employees, path: '/employees', icon: ICONS.Employees },
        { name: t.org_chart, path: '/org-chart', icon: ICONS.Departments },
        { name: t.documents, path: '/documents', icon: ICONS.Documents },
        { name: language === 'fr' ? 'Relations & Discipline' : 'Discipline', path: '/relations', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg> },
      ]
    },
    {
      title: language === 'fr' ? 'Talent Hub' : 'Talent Hub',
      items: [
        { name: t.recruitment, path: '/recruitment', icon: ICONS.Plus },
        { name: t.onboarding, path: '/onboarding', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg> },
        { name: t.training, path: '/training', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253" /></svg> },
        { name: t.performance, path: '/performance', icon: ICONS.Performance },
      ]
    },
    {
      title: language === 'fr' ? 'Opérations & Paie' : 'Ops & Payroll',
      items: [
        { name: t.salaries, path: '/salaries', icon: ICONS.Salaries },
        { name: t.attendance, path: '/attendance', icon: ICONS.Attendance },
        { name: t.leaves, path: '/leaves', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg> },
        { name: t.kiosk, path: '/kiosk', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg> },
      ]
    },
    {
      title: language === 'fr' ? 'Culture & Sécurité' : 'Culture & Safety',
      items: [
        { name: t.surveys, path: '/surveys', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg> },
        { name: language === 'fr' ? 'Conformité & HSE' : 'Safety & GDPR', path: '/compliance', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg> },
        { name: t.assets, path: '/assets', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg> },
      ]
    }
  ];

  return (
    <aside className="w-72 bg-slate-900 border-r border-white/5 text-white flex flex-col h-screen sticky top-0 z-50 shadow-2xl no-print overflow-hidden">
      <div className="p-8 flex items-center space-x-3 flex-shrink-0">
        <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <div>
          <h1 className="text-xl font-extrabold tracking-tight italic">HR <span className="text-indigo-400 font-light not-italic">PRO</span></h1>
          <span className="text-[10px] text-slate-400 uppercase tracking-[0.2em] font-bold">Elite Suite</span>
        </div>
      </div>

      <nav className="flex-1 px-6 py-2 space-y-8 overflow-y-auto custom-scrollbar pb-10">
        {sections.map((section, idx) => (
          <div key={idx} className="space-y-2">
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-black px-3 mb-4">{section.title}</p>
            {section.items.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center space-x-4 p-3 rounded-xl transition-all duration-300 group ${isActive ? 'bg-indigo-600 text-white shadow-lg scale-[1.02]' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`
                }
              >
                <div className="transition-transform group-hover:scale-110">{item.icon}</div>
                <span className="font-semibold text-xs tracking-wide">{item.name}</span>
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      <div className="p-6 border-t border-white/5 space-y-2 bg-slate-900/50 backdrop-blur-md">
        <NavLink to="/settings" className="flex items-center space-x-3 px-4 py-3 w-full rounded-xl text-slate-400 hover:bg-white/5 hover:text-white text-xs font-bold transition-all">
          {ICONS.Settings}
          <span>{t.settings}</span>
        </NavLink>
        <button onClick={onLogout} className="flex items-center space-x-3 px-4 py-3 w-full text-rose-400 hover:bg-rose-500/10 rounded-xl transition-all text-xs font-black uppercase tracking-widest">
          {ICONS.Logout}
          <span>{t.logout}</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
