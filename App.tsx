
import React, { useState, useEffect } from 'react';
import { MemoryRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import AIAssistant from './components/AIAssistant';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import Departments from './pages/Departments';
import Positions from './pages/Positions';
import Salaries from './pages/Salaries';
import Attendance from './pages/Attendance';
import Leaves from './pages/Leaves';
import Training from './pages/Training';
import Expenses from './pages/Expenses';
import Contracts from './pages/Contracts';
import Projects from './pages/Projects';
import Recruitment from './pages/Recruitment';
import Documents from './pages/Documents';
import Performance from './pages/Performance';
import OrgChart from './pages/OrgChart';
import Onboarding from './pages/Onboarding';
import AIInsights from './pages/AIInsights';
import AssetTracking from './pages/AssetTracking';
import Gamification from './pages/Gamification';
import SocialSurveys from './pages/SocialSurveys';
import TurnoverPredictor from './pages/TurnoverPredictor';
import Kiosk from './pages/Kiosk';
import Login from './pages/Login';
import Register from './pages/Register';
import Landing from './pages/Landing';
import Settings from './pages/Settings';
import Relations from './pages/Relations';
import Compliance from './pages/Compliance';
import Reporting from './pages/Reporting';
import { Employee, Department, Position, SalaryRecord, AttendanceRecord, Notification } from './types';
import { Language } from './translations';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [language, setLanguage] = useState<Language>('fr');

  useEffect(() => {
    if (isDark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDark]);

  const [employees, setEmployees] = useState<Employee[]>([
    { id: '1', firstName: 'Jean', lastName: 'Dupont', email: 'jean@hrpro.com', phone: '0612345678', departmentId: '1', positionId: '1', joinDate: '2023-01-15', status: 'Actif', taskProgress: 85, points: 2450, badges: [], role: 'Admin' },
    { id: '2', firstName: 'Marie', lastName: 'Curie', email: 'marie@hrpro.com', phone: '0622334455', departmentId: '2', positionId: '2', joinDate: '2022-06-10', status: 'Actif', taskProgress: 42, points: 1890, badges: [], role: 'RH' },
  ]);

  const [departments, setDepartments] = useState<Department[]>([
    { id: '1', name: 'Technique', manager: 'Jean Dupont', employeeCount: 1 },
    { id: '2', name: 'Marketing', manager: 'Marie Curie', employeeCount: 1 },
  ]);

  const [positions, setPositions] = useState<Position[]>([
    { id: '1', title: 'Développeur Senior', baseSalary: 5500, departmentId: '1' },
    { id: '2', title: 'Responsable Marketing', baseSalary: 4800, departmentId: '2' },
  ]);

  const [salaries, setSalaries] = useState<SalaryRecord[]>([
    { id: '1', employeeId: '1', amount: 5500, bonus: 500, deductions: 200, month: 'Mars 2024', status: 'Payé' },
    { id: '2', employeeId: '2', amount: 4800, bonus: 300, deductions: 150, month: 'Mars 2024', status: 'Payé' },
  ]);

  const [attendance, setAttendance] = useState<AttendanceRecord[]>([
    { id: '1', employeeId: '1', date: '2024-03-25', checkIn: '08:30', checkOut: '17:45', status: 'Présent' },
  ]);

  const [notifications, setNotifications] = useState<Notification[]>([
    { id: '1', title: 'Alerte Congé', message: 'Marie Curie a soumis une demande de congés.', time: 'Il y a 10min', type: 'info', isRead: false },
    { id: '2', title: 'Paie validée', message: 'Le virement SEPA de Mars a été transmis.', time: 'Il y a 1h', type: 'success', isRead: true },
  ]);

  const handleLogout = () => setIsAuthenticated(false);

  const sharedProps = { 
    isAuthenticated, isDark, language, setLanguage, 
    toggleTheme: () => setIsDark(!isDark), 
    onLogout: handleLogout, 
    notifications, setNotifications 
  };

  const pages = [
    { path: 'dashboard', component: <Dashboard employees={employees} departments={departments} salaries={salaries} language={language} /> },
    { path: 'employees', component: <Employees employees={employees} setEmployees={setEmployees} departments={departments} positions={positions} /> },
    { path: 'departments', component: <Departments departments={departments} setDepartments={setDepartments} /> },
    { path: 'positions', component: <Positions positions={positions} setPositions={setPositions} departments={departments} /> },
    { path: 'salaries', component: <Salaries salaries={salaries} setSalaries={setSalaries} employees={employees} /> },
    { path: 'attendance', component: <Attendance attendance={attendance} setAttendance={setAttendance} employees={employees} /> },
    { path: 'leaves', component: <Leaves employees={employees} /> },
    { path: 'training', component: <Training employees={employees} language={language} /> },
    { path: 'expenses', component: <Expenses employees={employees} language={language} /> },
    { path: 'contracts', component: <Contracts employees={employees} language={language} /> },
    { path: 'projects', component: <Projects employees={employees} language={language} /> },
    { path: 'recruitment', component: <Recruitment /> },
    { path: 'documents', component: <Documents employees={employees} /> },
    { path: 'performance', component: <Performance employees={employees} /> },
    { path: 'org-chart', component: <OrgChart employees={employees} departments={departments} /> },
    { path: 'onboarding', component: <Onboarding employees={employees} /> },
    { path: 'ai-insights', component: <AIInsights employees={employees} departments={departments} salaries={salaries} attendance={attendance} /> },
    { path: 'assets', component: <AssetTracking employees={employees} /> },
    { path: 'gamification', component: <Gamification employees={employees} /> },
    { path: 'surveys', component: <SocialSurveys /> },
    { path: 'turnover', component: <TurnoverPredictor employees={employees} salaries={salaries} attendance={attendance} /> },
    { path: 'kiosk', component: <Kiosk /> },
    { path: 'relations', component: <Relations employees={employees} /> },
    { path: 'compliance', component: <Compliance /> },
    { path: 'reporting', component: <Reporting /> },
    { path: 'settings', component: <Settings /> },
  ];

  return (
    <MemoryRouter>
      <Routes>
        <Route path="/" element={<Landing isDark={isDark} toggleTheme={sharedProps.toggleTheme} />} />
        <Route path="/login" element={<Login onLogin={() => setIsAuthenticated(true)} />} />
        <Route path="/register" element={<Register onRegister={() => setIsAuthenticated(true)} />} />
        
        {pages.map(page => (
          <Route key={page.path} path={`/${page.path}`} element={isAuthenticated ? (
            <div className={`flex min-h-screen ${isDark ? 'dark bg-slate-950 text-white' : 'bg-[#f4f7ff] text-slate-900'}`}>
              <Sidebar language={language} onLogout={handleLogout} />
              <div className="flex-1 flex flex-col min-w-0">
                <Navbar {...sharedProps} />
                <main className="p-8 overflow-y-auto h-[calc(100vh-80px)] custom-scrollbar">
                  {page.component}
                </main>
                <AIAssistant language={language} />
              </div>
            </div>
          ) : <Navigate to="/login" />} />
        ))}

        <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/"} replace />} />
      </Routes>
    </MemoryRouter>
  );
};

export default App;
