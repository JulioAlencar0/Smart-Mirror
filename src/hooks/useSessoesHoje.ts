import { useMemo } from "react";
import { sessoesDeHoje } from "../services/api";
import { SessaoHoje } from "../types";
import { usePolling } from "./usePolling";

export function useSessoesHoje() {
  const { dados, loading, error } = usePolling(sessoesDeHoje, 30000);

  const sessoes = useMemo<SessaoHoje[]>(
    () =>
      (dados ?? []).map((s) => ({
        id: s.id,
        name: s.aluno_nome,
        exercise: s.exercicios,
        time: s.horario ?? "--:--",
        done: s.status === "concluido",
      })),
    [dados]
  );

  return { sessoes, loading, error };
}