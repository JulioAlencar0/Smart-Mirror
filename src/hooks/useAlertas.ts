import { useCallback, useEffect, useState } from "react";
import { AlertaAPI, listarAlertas, resolverAlerta } from "../services/api";
import { AlertItem } from "../types";

function tempoRelativo(iso: string) {
  const min = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
  if (min < 1) return "agora";
  if (min < 60) return `${min} min atrás`;
  const h = Math.floor(min / 60);
  if (h < 24) return `${h} h atrás`;
  const d = Math.floor(h / 24);
  return d === 1 ? "ontem" : `${d} dias atrás`;
}

// Converte o formato do banco para o formato que a tela usa
function paraAlertItem(a: AlertaAPI): AlertItem {
  return {
    id: String(a.id),
    studentId: String(a.aluno_id),
    studentName: a.aluno_nome,
    exercise: a.exercicio,
    error: a.titulo_erro,
    severity: a.severidade,
    time: tempoRelativo(a.data_hora_alerta),
    resolved: a.status_alerta === "RESOLVIDO",
    detail: [a.detalhes_sensor, a.risco_lesao].filter(Boolean).join(" "),
  };
}

export function useAlertas(intervaloMs = 5000) {
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const carregar = useCallback(async () => {
    try {
      const dados = await listarAlertas();
      setAlerts(dados.map(paraAlertItem));
      setError("");
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    carregar();
    const timer = setInterval(carregar, intervaloMs);
    return () => clearInterval(timer); // para ao sair da tela
  }, [carregar, intervaloMs]);

  const resolver = useCallback(
    async (id: string) => {
      // Marca na tela na hora; se a API falhar, recarrega o estado real
      setAlerts((prev) =>
        prev.map((a) => (a.id === id ? { ...a, resolved: true } : a)),
      );
      try {
        await resolverAlerta(id);
      } catch (e: any) {
        setError(e.message);
        carregar();
      }
    },
    [carregar],
  );

  return { alerts, loading, error, resolver, recarregar: carregar };
}
