
export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  departmentId: string;
  positionId: string;
  joinDate: string;
  exitDate?: string;
  status: 'Actif' | 'Suspendu' | 'Sorti' | 'Congé';
  taskProgress: number;
  managerId?: string;
  points: number;
  badges: Badge[];
  role: 'Admin' | 'RH' | 'Manager' | 'Employé';
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  dateEarned: string;
}

export interface Department {
  id: string;
  name: string;
  manager: string;
  employeeCount: number;
}

export interface Position {
  id: string;
  title: string;
  baseSalary: number;
  departmentId: string;
  jobDescription?: string;
}

export interface SalaryRecord {
  id: string;
  employeeId: string;
  amount: number;
  bonus: number;
  deductions: number;
  month: string;
  status: 'Payé' | 'En attente' | 'Annulé';
  sepaGenerated?: boolean;
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  date: string;
  checkIn: string;
  checkOut: string;
  status: 'Présent' | 'Absent' | 'Retard' | 'Télétravail';
  location?: { latitude: number; longitude: number };
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  type: 'Payé' | 'Maladie' | 'Maternité' | 'Sans solde' | 'Vacances' | 'Formation';
  startDate: string;
  endDate: string;
  status: 'En attente' | 'Approuvé' | 'Refusé';
  reason: string;
}

// Fixed: Added missing Expense interface
export interface Expense {
  id: string;
  employeeId: string;
  description: string;
  category: string;
  amount: number;
  date: string;
  status: 'En attente' | 'Approuvé' | 'Refusé';
}

export interface DisciplineRecord {
  id: string;
  employeeId: string;
  type: 'Avertissement' | 'Blâme' | 'Mise à pied' | 'Licenciement';
  date: string;
  reason: string;
  status: 'Actif' | 'Clos';
}

export interface SecurityAudit {
  id: string;
  area: string;
  status: 'Conforme' | 'Alerte' | 'En cours';
  lastAudit: string;
  nextAudit: string;
}

export interface Candidate {
  id: string;
  name: string;
  role: string;
  stage: 'Candidature' | 'Entretien' | 'Offre' | 'Rejeté';
  email: string;
  appliedDate: string;
  resumeUrl?: string;
}

export interface Training {
  id: string;
  employeeId: string;
  title: string;
  provider: string;
  startDate: string;
  endDate: string;
  progress: number;
  status: 'En cours' | 'Terminé' | 'En attente';
}

export interface Asset {
  id: string;
  name: string;
  type: 'Laptop' | 'Phone' | 'Badge' | 'Autre';
  serialNumber: string;
  assignedTo: string;
  status: 'Assigné' | 'Stock' | 'Réparation';
}

export interface DocumentRecord {
  id: string;
  employeeId: string;
  name: string;
  type: 'Contrat' | 'ID' | 'Diplôme' | 'Autre';
  uploadDate: string;
  size: string;
}

export interface PerformanceReview {
  id: string;
  employeeId: string;
  reviewer: string;
  date: string;
  score: number;
  comment: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'info' | 'success' | 'warning';
  isRead: boolean;
}

export interface OnboardingTask {
  id: string;
  employeeId: string;
  title: string;
  isCompleted: boolean;
  category: 'Administratif' | 'Matériel' | 'Culture';
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'En cours' | 'En attente' | 'Terminé';
  deadline: string;
  progress: number;
  team: string[];
}
