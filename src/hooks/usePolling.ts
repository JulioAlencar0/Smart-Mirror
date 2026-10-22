import { useCallback, useEffect, useRef, useState } from "react";

export function usePolling<T>(buscar: () => Promise<T>, intervaloMs = 5000) {
  const [dados, setDados] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const buscarRef = useRef(buscar);
  buscarRef.current = buscar;

  const recarregar = useCallback(async () => {
    try {
      setDados(await buscarRef.current());
      setError("");
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    recarregar();
    const timer = setInterval(recarregar, intervaloMs);
    return () => clearInterval(timer);
  }, [recarregar, intervaloMs]);

  return { dados, loading, error, recarregar };
}
