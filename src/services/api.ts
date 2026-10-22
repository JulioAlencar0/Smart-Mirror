import * as SecureStore from "expo-secure-store";

export const API_URL =
  process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:3000";

const TOKEN_KEY = "token";

export type Perfil = "PERSONAL" | "ALUNO";

export type Usuario = {
  id: number;
  nome: string;
  email: string;
  tipo_perfil: Perfil;
  cref: string | null;
};

let usuarioAtual: Usuario | null = null;
export const getUsuario = () => usuarioAtual;

let token: string | null = null;

export async function carregarToken() {
  token = await SecureStore.getItemAsync(TOKEN_KEY);
  return token;
}

async function salvarToken(novo: string) {
  token = novo;
  await SecureStore.setItemAsync(TOKEN_KEY, novo);
}

export async function sair() {
  usuarioAtual = null;
  token = null;
  await SecureStore.deleteItemAsync(TOKEN_KEY);
}

async function requisicao<T>(
  caminho: string,
  opcoes: RequestInit = {},
): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 10000);

  try {
    const resposta = await fetch(`${API_URL}${caminho}`, {
      ...opcoes,
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    const dados = await resposta.json().catch(() => ({}));
    if (!resposta.ok) {
      throw new Error(dados.erro || "Erro ao comunicar com o servidor.");
    }
    return dados as T;
  } catch (e: any) {
    if (e.name === "AbortError") {
      throw new Error("O servidor demorou para responder.");
    }
    if (e instanceof TypeError) {
      throw new Error(
        "Não foi possível conectar à API. Verifique a rede e o endereço.",
      );
    }
    throw e;
  } finally {
    clearTimeout(timer);
  }
}

type RespostaAuth = { token: string; usuario: Usuario };

export async function login(email: string, senha: string, perfil: Perfil) {
  const r = await requisicao<RespostaAuth>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, senha, perfil }),
  });
  await salvarToken(r.token);
  usuarioAtual = r.usuario;
  return r.usuario;
}

export async function cadastrar(dados: {
  nome: string;
  email: string;
  senha: string;
  perfil: Perfil;
}) {
  const r = await requisicao<RespostaAuth>("/auth/register", {
    method: "POST",
    body: JSON.stringify(dados),
  });
  await salvarToken(r.token);
  usuarioAtual = r.usuario;
  return r.usuario;
}

export type AlertaAPI = {
  id: number;
  titulo_erro: string;
  detalhes_sensor: string;
  risco_lesao: string | null;
  severidade: "warn" | "danger";
  status_alerta: "PENDENTE" | "RESOLVIDO";
  data_hora_alerta: string;
  aluno_id: number;
  aluno_nome: string;
  exercicio: string;
};

export const listarAlertas = () => requisicao<AlertaAPI[]>("/alertas");

export const resolverAlerta = (id: string | number) =>
  requisicao<{ id: number; status_alerta: string }>(`/alertas/${id}/resolver`, {
    method: "PATCH",
  });

export type AlunoAPI = {
  id: number;
  nome: string;
  objetivo: string | null;
  plano: "Básico" | "Pro" | "Elite";
  idade: number | null;
  exercicio: string | null;
  series_totais: number | null;
  reps_alvo: number | null;
  reps_atuais: number | null;
  status_execucao: "Correto" | "Atencao" | "Erro" | "Descanso" | null;
  ultima_sessao_data: string | null;
  ultima_sessao_horario: string | null;
  total_sessoes: number;
};

export type SessaoHojeAPI = {
  id: number;
  aluno_nome: string;
  horario: string | null;
  status: "agendado" | "em_andamento" | "concluido";
  exercicios: string;
};

export const listarAlunos = () => requisicao<AlunoAPI[]>("/alunos");
export const sessoesDeHoje = () => requisicao<SessaoHojeAPI[]>("/sessoes/hoje");
export type Configuracoes = {
  notificacoes_erro: boolean;
  vibrar_alerta: boolean;
  som_alerta: boolean;
};

export const obterConfiguracoes = () =>
  requisicao<Configuracoes>("/perfil/configuracoes");

export const salvarConfiguracoes = (config: Configuracoes) =>
  requisicao<Configuracoes>("/perfil/configuracoes", {
    method: "PUT",
    body: JSON.stringify(config),
  });

export const resumoPerfil = () =>
  requisicao<{ sessoes_mes: number }>("/perfil/resumo");

export const vincularAluno = (dados: {
  email: string;
  objetivo?: string;
  plano: "Básico" | "Pro" | "Elite";
  data_nascimento?: string;
}) =>
  requisicao<{ id: number; nome: string }>("/alunos", {
    method: "POST",
    body: JSON.stringify(dados),
  });
