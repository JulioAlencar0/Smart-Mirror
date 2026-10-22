import { useMemo } from "react";
import { AlunoAPI, listarAlunos } from "../services/api";
import { Status, Student } from "../types";
import { usePolling } from "./usePolling";

const STATUS_MAP: Record<string, Status> = {
  Correto: "ok",
  Atencao: "warn",
  Erro: "danger",
  Descanso: "resting",
};

function iniciais(nome: string) {
  const partes = nome
    .trim()
    .split(/[\s_]+/)
    .filter(Boolean);
  if (partes.length === 0) return "?";
  const letras =
    partes.length > 1
      ? partes[0][0] + partes[partes.length - 1][0]
      : partes[0].slice(0, 2);
  return letras.toUpperCase();
}

function rotuloUltimaSessao(data: string | null, horario: string | null) {
  if (!data) return "Sem sessões";
  const [ano, mes, dia] = data.split("-").map(Number);
  const hoje = new Date();
  const inicioHoje = new Date(
    hoje.getFullYear(),
    hoje.getMonth(),
    hoje.getDate(),
  );
  const dias = Math.round(
    (inicioHoje.getTime() - new Date(ano, mes - 1, dia).getTime()) / 86400000,
  );
  const rotulo =
    dias === 0
      ? "Hoje"
      : dias === 1
        ? "Ontem"
        : `${String(dia).padStart(2, "0")}/${String(mes).padStart(2, "0")}`;
  return horario ? `${rotulo}, ${horario}` : rotulo;
}

function paraStudent(a: AlunoAPI): Student {
  return {
    id: String(a.id),
    name: a.nome,
    avatar: iniciais(a.nome),
    age: a.idade ?? 0,
    goal: a.objetivo ?? "—",
    plan: a.plano,
    exercise: a.exercicio ?? "Sem treino em andamento",
    sets:
      a.series_totais && a.reps_alvo
        ? `${a.series_totais}×${a.reps_alvo}`
        : "—",
    status: a.status_execucao ? STATUS_MAP[a.status_execucao] : "resting",
    reps: a.reps_atuais ?? 0,
    targetReps: a.reps_alvo ?? 0,
    lastSession: rotuloUltimaSessao(
      a.ultima_sessao_data,
      a.ultima_sessao_horario,
    ),
    sessions: a.total_sessoes,
  };
}

export function useAlunos() {
  const { dados, loading, error, recarregar } = usePolling(listarAlunos);
  const students = useMemo(() => (dados ?? []).map(paraStudent), [dados]);
  return { students, loading, error, recarregar };
}
