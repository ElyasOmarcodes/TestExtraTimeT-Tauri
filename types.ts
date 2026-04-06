export interface Teacher {
  id: string;
  name: string;
  color: string;
}

export interface ClassGroup {
  id: string;
  name: string;
}

export interface LessonData {
  subject: string;
  teacherId: string;
  difficulty?: 'hard' | 'medium' | 'easy';
}

export interface Schedule {
  [key: string]: LessonData; // key format: "classId_slotId"
}

export interface TimeSettings {
  lessonDuration: number;
  breakDuration: number;
  lessonsBeforeBreak: number;
  startTime: string; // "HH:MM"
  totalLessons: number;
}

export interface CellDesign {
  borderColor: string;
  backgroundColor: string;
  borderWidth: number;
  borderRadius: number;
  margin: number;
  borderStyle: string;
  shadow: string;
  fontSize?: number;
}

export interface DesignSettings {
  lesson: CellDesign;
  break: CellDesign;
}

export type AppTheme = 'system' | 'light' | 'dark';
export type AppLanguage = 'ps' | 'fa' | 'ar' | 'en';

export interface UISettings {
  theme: AppTheme;
  primaryColor: string;
  language: AppLanguage;
}

export interface PrintDesignSettings {
  // Content
  title: string;
  subtitle: string;
  footerText: string;
  watermarkText: string;
  
  // Visibility
  showLegend: boolean;
  showTeacherName: boolean; 
  showTimes: boolean;
  showFooter: boolean;
  showWatermark: boolean;

  // Layout
  scale: number; // Percentage
  paddingX: number;
  paddingY: number;
  direction: 'rtl' | 'ltr';
  
  // Style
  theme: 'classic' | 'modern' | 'minimal' | 'colorful' | 'corporate';
  primaryColor: string;
  headerStyle: 'solid' | 'outline' | 'simple';
  fontStyle: 'normal' | 'bold';

  // Typography Controls
  fontSizeTitle: number;
  fontSizeSubtitle: number;
  fontSizeHeader: number;
  fontSizeSubject: number;
  fontSizeTeacher: number;

  // Cell Layout Controls
  teacherDisplayMode: 'badge' | 'text' | 'dot' | 'hidden';
  cellMinHeight: number;
  cellVerticalAlign: 'start' | 'center' | 'end';
  cellGap: number;
  cellPadding: number;
}

export interface AppState {
  teachers: Teacher[];
  classes: ClassGroup[];
  schedule: Schedule;
  settings: TimeSettings;
  design: DesignSettings;
  printDesign: PrintDesignSettings;
  ui: UISettings;
}

export interface TimeSlot {
  id: string; 
  type: 'lesson' | 'break';
  start: string;
  end: string;
  label: string;
  index: number; 
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
}

export const COLORS = [
  '#ef4444', '#f97316', '#f59e0b', '#84cc16', 
  '#10b981', '#06b6d4', '#3b82f6', '#6366f1', 
  '#8b5cf6', '#d946ef', '#f43f5e', '#64748b'
];

export const PRIMARY_BRAND_COLORS = [
  '#6366f1', // Indigo (Default)
  '#3b82f6', // Blue
  '#06b6d4', // Cyan
  '#10b981', // Emerald
  '#84cc16', // Lime
  '#f59e0b', // Amber
  '#f97316', // Orange
  '#ef4444', // Red
  '#d946ef', // Fuchsia
  '#475569', // Slate
];