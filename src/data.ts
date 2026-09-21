import { colors } from "./theme";
import { Student, AlertItem, Status } from "./types";

export const INITIAL_STUDENTS: Student[] = [
  {
    id: "s1",
    name: "Rafael Costa",
    avatar: "RC",
    age: 28,
    goal: "Hipertrofia",
    plan: "Pro",
    exercise: "Agachamento",
    sets: "3×12",
    status: "danger",
    reps: 5,
    targetReps: 12,
    lastSession: "Hoje, 07:00",
    sessions: 48,
  },
  {
    id: "s2",
    name: "Mariana Lima",
    avatar: "ML",
    age: 34,
    goal: "Emagrecimento",
    plan: "Elite",
    exercise: "Supino Reto",
    sets: "4×10",
    status: "ok",
    reps: 8,
    targetReps: 10,
    lastSession: "Hoje, 08:00",
    sessions: 72,
  },
  {
    id: "s3",
    name: "Bruno Alves",
    avatar: "BA",
    age: 22,
    goal: "Força",
    plan: "Pro",
    exercise: "Levantamento Terra",
    sets: "3×8",
    status: "warn",
    reps: 3,
    targetReps: 8,
    lastSession: "Hoje, 09:30",
    sessions: 31,
  },
  {
    id: "s4",
    name: "Juliana Pires",
    avatar: "JP",
    age: 41,
    goal: "Condicionamento",
    plan: "Básico",
    exercise: "Rosca Direta",
    sets: "3×15",
    status: "ok",
    reps: 12,
    targetReps: 15,
    lastSession: "Ontem, 17:00",
    sessions: 19,
  },
  {
    id: "s5",
    name: "Thiago Rocha",
    avatar: "TR",
    age: 30,
    goal: "Hipertrofia",
    plan: "Elite",
    exercise: "Pulldown",
    sets: "3×12",
    status: "resting",
    reps: 0,
    targetReps: 12,
    lastSession: "Hoje, 10:00",
    sessions: 55,
  },
  {
    id: "s6",
    name: "Camila Souza",
    avatar: "CS",
    age: 26,
    goal: "Emagrecimento",
    plan: "Pro",
    exercise: "Leg Press",
    sets: "4×15",
    status: "ok",
    reps: 11,
    targetReps: 15,
    lastSession: "Ontem, 16:00",
    sessions: 27,
  },
];

export const ALERT_POOL = [
  {
    exercise: "Agachamento",
    error: "Joelhos passando a ponta dos pés",
    severity: "danger" as const,
    detail:
      "Sensor detectou ângulo de 142° nos joelhos. O ideal é manter entre 90–110°. Risco de lesão patelofemoral.",
  },
  {
    exercise: "Agachamento",
    error: "Costas arredondadas",
    severity: "danger" as const,
    detail: "Curvatura lombar fora do padrão neutro. Risco de herniação discal.",
  },
  {
    exercise: "Levantamento Terra",
    error: "Ombros à frente do quadril",
    severity: "warn" as const,
    detail:
      "Posição inicial incorreta. Ombros devem estar alinhados ou atrás do quadril.",
  },
  {
    exercise: "Levantamento Terra",
    error: "Barra afastada do corpo",
    severity: "warn" as const,
    detail:
      "Barra a 12 cm do corpo. Manter próxima às pernas reduz torque na coluna.",
  },
  {
    exercise: "Rosca Direta",
    error: "Balanço excessivo de quadril",
    severity: "warn" as const,
    detail:
      "Oscilação de tronco de 28°. Uso de momentum reduz ativação do bíceps.",
  },
  {
    exercise: "Supino Reto",
    error: "Amplitude incompleta",
    severity: "warn" as const,
    detail:
      "Barra parando a 8 cm do peito. Amplitude completa maximiza ativação peitoral.",
  },
  {
    exercise: "Pulldown",
    error: "Pegada muito aberta",
    severity: "warn" as const,
    detail:
      "Distância entre mãos: 92 cm. Recomendado: 60–75 cm para melhor ativação do lat.",
  },
];

export const INITIAL_ALERTS: AlertItem[] = [
  {
    id: "a0",
    studentId: "s1",
    studentName: "Rafael Costa",
    exercise: "Agachamento",
    error: "Joelhos passando a ponta dos pés",
    severity: "danger",
    time: "agora",
    resolved: false,
    detail:
      "Sensor detectou ângulo de 142° nos joelhos. O ideal é manter entre 90–110°. Risco de lesão patelofemoral.",
  },
  {
    id: "a1",
    studentId: "s3",
    studentName: "Bruno Alves",
    exercise: "Levantamento Terra",
    error: "Ombros à frente do quadril",
    severity: "warn",
    time: "2 min atrás",
    resolved: false,
    detail:
      "Posição inicial incorreta. Ombros devem estar alinhados ou atrás do quadril.",
  },
];

export const PLAN_FEATURES: Record<string, string[]> = {
  Básico: [
    "Até 3 alunos",
    "Análise básica de postura",
    "Alertas por notificação",
    "Histórico 7 dias",
  ],
  Pro: [
    "Até 10 alunos",
    "Análise biomecânica completa",
    "Alertas em tempo real",
    "Histórico 30 dias",
    "Relatórios em PDF",
    "Suporte prioritário",
  ],
  Elite: [
    "Alunos ilimitados",
    "IA avançada de movimento",
    "Alertas instantâneos",
    "Histórico completo",
    "Relatórios personalizados",
    "Suporte 24/7",
    "Multi-academia",
    "API de integração",
  ],
};

export const FAQ = [
  {
    q: "Como o Smart Mirror detecta erros?",
    a: "Usamos visão computacional com IA treinada em mais de 500.000 repetições analisadas por fisioterapeutas. A câmera do espelho inteligente mapeia 33 pontos corporais em tempo real.",
  },
  {
    q: "O app funciona sem o espelho?",
    a: "O modo básico funciona via câmera do celular. Para análise completa e multi-ângulo, o espelho Smart Mirror é necessário.",
  },
  {
    q: "Posso monitorar alunos remotamente?",
    a: "Sim! No plano Pro e Elite, você recebe alertas no app mesmo fora da academia. O aluno treina e você é notificado em tempo real.",
  },
  {
    q: "Meus dados são seguros?",
    a: "Todos os dados são criptografados (AES-256) e armazenados em servidores no Brasil, em conformidade com a LGPD.",
  },
  {
    q: "Como cancelar a assinatura?",
    a: "Acesse Plano & Assinatura > Cancelar Plano. O acesso permanece até o fim do período pago. Sem multas ou taxas.",
  },
];

export const STATUS_COLOR: Record<Status, string> = {
  ok: colors.ok,
  warn: colors.warn,
  danger: colors.danger,
  resting: colors.mutedForeground,
};

export const STATUS_LABEL: Record<Status, string> = {
  ok: "Correto",
  warn: "Atenção",
  danger: "Erro",
  resting: "Descanso",
};

export const STATUS_BG: Record<Status, string> = {
  ok: "rgba(48,209,88,0.12)",
  warn: "rgba(255,159,10,0.12)",
  danger: "rgba(217,28,28,0.13)",
  resting: "rgba(100,100,100,0.10)",
};

export const PLAN_COLOR: Record<string, string> = {
  Básico: "#888888",
  Pro: colors.primary,
  Elite: "#FFB800",
};
