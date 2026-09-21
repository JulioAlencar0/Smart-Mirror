export type Screen = "dashboard" | "monitor" | "alerts" | "profile";
export type Status = "ok" | "warn" | "danger" | "resting";
export type SubPageId = null | "alunos" | "plano" | "suporte";

export interface Student {
  id: string;
  name: string;
  avatar: string;
  age: number;
  goal: string;
  plan: string;
  exercise: string;
  sets: string;
  status: Status;
  reps: number;
  targetReps: number;
  lastSession: string;
  sessions: number;
}

export interface AlertItem {
  id: string;
  studentId: string;
  studentName: string;
  exercise: string;
  error: string;
  severity: "warn" | "danger";
  time: string;
  resolved: boolean;
  detail: string;
}
