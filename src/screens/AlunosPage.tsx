import { useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { PLAN_COLOR, STATUS_BG, STATUS_COLOR, STATUS_LABEL } from "../data";
import { vincularAluno } from "../services/api";
import { colors, fonts } from "../theme";
import { Student } from "../types";

type Filtro = "Todos" | "Ativos" | "Erro";
type Plano = "Básico" | "Pro" | "Elite";

const FILTROS: Filtro[] = ["Todos", "Ativos", "Erro"];
const PLANOS: Plano[] = ["Básico", "Pro", "Elite"];

// Aplica a máscara DD/MM/AAAA enquanto o usuário digita
function mascaraData(texto: string) {
  const n = texto.replace(/\D/g, "").slice(0, 8);
  if (n.length > 4) return `${n.slice(0, 2)}/${n.slice(2, 4)}/${n.slice(4)}`;
  if (n.length > 2) return `${n.slice(0, 2)}/${n.slice(2)}`;
  return n;
}

// Converte DD/MM/AAAA para AAAA-MM-DD; devolve null se a data não existir
function paraISO(texto: string): string | null {
  const m = texto.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!m) return null;
  const [, d, mo, a] = m;
  const data = new Date(Number(a), Number(mo) - 1, Number(d));
  if (
    data.getFullYear() !== Number(a) ||
    data.getMonth() !== Number(mo) - 1 ||
    data.getDate() !== Number(d) ||
    data > new Date()
  ) {
    return null;
  }
  return `${a}-${mo}-${d}`;
}

export default function AlunosPage({
  students,
  onAdded,
}: {
  students: Student[];
  onAdded?: () => Promise<void> | void;
}) {
  const [search, setSearch] = useState("");
  const [filtro, setFiltro] = useState<Filtro>("Todos");
  const [detail, setDetail] = useState<Student | null>(null);

  // Formulário de novo aluno
  const [adding, setAdding] = useState(false);
  const [email, setEmail] = useState("");
  const [objetivo, setObjetivo] = useState("");
  const [nascimento, setNascimento] = useState("");
  const [plano, setPlano] = useState<Plano>("Básico");
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");

  const termo = search.toLowerCase();
  const filtered = students.filter((s) => {
    const bate =
      s.name.toLowerCase().includes(termo) ||
      s.goal.toLowerCase().includes(termo);
    const passa =
      filtro === "Todos" ||
      (filtro === "Ativos" && s.status !== "resting") ||
      (filtro === "Erro" && s.status === "danger");
    return bate && passa;
  });

  const abrirFormulario = () => {
    setEmail("");
    setObjetivo("");
    setNascimento("");
    setPlano("Básico");
    setErro("");
    setAdding(true);
  };

  const enviar = async () => {
    if (!email.trim()) {
      setErro("Informe o e-mail do aluno.");
      return;
    }
    let dataISO: string | undefined;
    if (nascimento) {
      const iso = paraISO(nascimento);
      if (!iso) {
        setErro("Data de nascimento inválida. Use DD/MM/AAAA.");
        return;
      }
      dataISO = iso;
    }
    setErro("");
    setSalvando(true);
    try {
      await vincularAluno({
        email: email.trim(),
        objetivo: objetivo.trim() || undefined,
        plano,
        data_nascimento: dataISO,
      });
      await onAdded?.();
      setAdding(false);
    } catch (e: any) {
      setErro(e.message);
    } finally {
      setSalvando(false);
    }
  };

  if (adding) {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.detailHeader}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => setAdding(false)}
          >
            <Text style={styles.backText}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.detailHeaderTitle}>Adicionar aluno</Text>
        </View>
        <ScrollView
          contentContainerStyle={styles.formBody}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.formHint}>
            O aluno precisa ter criado uma conta do tipo Aluno no app com este
            e-mail.
          </Text>

          <Text style={styles.label}>E-mail do aluno</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="aluno@email.com"
            placeholderTextColor={colors.mutedForeground}
            autoCapitalize="none"
            keyboardType="email-address"
            style={[
              styles.input,
              { borderColor: email ? colors.primary : colors.borderStrong },
            ]}
          />

          <Text style={styles.label}>Objetivo (opcional)</Text>
          <TextInput
            value={objetivo}
            onChangeText={setObjetivo}
            placeholder="Ex.: Hipertrofia"
            placeholderTextColor={colors.mutedForeground}
            style={[
              styles.input,
              { borderColor: objetivo ? colors.primary : colors.borderStrong },
            ]}
          />

          <Text style={styles.label}>Data de nascimento (opcional)</Text>
          <TextInput
            value={nascimento}
            onChangeText={(t) => setNascimento(mascaraData(t))}
            placeholder="DD/MM/AAAA"
            placeholderTextColor={colors.mutedForeground}
            keyboardType="number-pad"
            maxLength={10}
            style={[
              styles.input,
              {
                borderColor: nascimento ? colors.primary : colors.borderStrong,
              },
            ]}
          />

          <Text style={styles.label}>Plano</Text>
          <View style={{ flexDirection: "row", gap: 8 }}>
            {PLANOS.map((p) => {
              const ativo = plano === p;
              return (
                <TouchableOpacity
                  key={p}
                  onPress={() => setPlano(p)}
                  style={[
                    styles.planoChip,
                    ativo && {
                      borderColor: PLAN_COLOR[p],
                      backgroundColor: `${PLAN_COLOR[p]}20`,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.planoChipText,
                      { color: ativo ? PLAN_COLOR[p] : colors.mutedForeground },
                    ]}
                  >
                    {p}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {!!erro && (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>{erro}</Text>
            </View>
          )}

          <TouchableOpacity
            onPress={enviar}
            disabled={salvando}
            style={[
              styles.submitBtn,
              {
                backgroundColor: salvando
                  ? "rgba(217,28,28,0.5)"
                  : colors.primary,
              },
            ]}
          >
            {salvando ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text style={styles.submitBtnText}>Adicionar aluno</Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

  if (detail) {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.detailHeader}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => setDetail(null)}
          >
            <Text style={styles.backText}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.detailHeaderTitle}>{detail.name}</Text>
          <View
            style={[
              styles.badge,
              { backgroundColor: STATUS_BG[detail.status] },
            ]}
          >
            <Text
              style={[styles.badgeText, { color: STATUS_COLOR[detail.status] }]}
            >
              {STATUS_LABEL[detail.status]}
            </Text>
          </View>
        </View>
        <ScrollView contentContainerStyle={styles.detailBody}>
          <View style={styles.profileCard}>
            <View
              style={[
                styles.avatarLg,
                { backgroundColor: STATUS_BG[detail.status] },
              ]}
            >
              <Text
                style={[
                  styles.avatarLgText,
                  { color: STATUS_COLOR[detail.status] },
                ]}
              >
                {detail.avatar}
              </Text>
            </View>
            <View>
              <Text style={styles.profileName}>{detail.name}</Text>
              <Text style={styles.profileMeta}>
                {detail.age > 0 ? `${detail.age} anos · ` : ""}
                {detail.goal}
              </Text>
              <View
                style={[
                  styles.planBadge,
                  { backgroundColor: `${PLAN_COLOR[detail.plan]}20` },
                ]}
              >
                <Text
                  style={[
                    styles.planBadgeText,
                    { color: PLAN_COLOR[detail.plan] },
                  ]}
                >
                  Plano {detail.plan}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.statsRow}>
            {[
              {
                label: "Sessões",
                value: String(detail.sessions),
                color: colors.primary,
              },
              {
                label: "Exercício",
                value:
                  detail.sets === "—"
                    ? "—"
                    : detail.sets.split("×")[0].trim() + "×",
                color: colors.ok,
              },
              {
                label: "Última sessão",
                value: detail.lastSession.split(",")[0],
                color: colors.foreground,
              },
            ].map((c) => (
              <View key={c.label} style={styles.statCard}>
                <Text style={[styles.statValue, { color: c.color }]}>
                  {c.value}
                </Text>
                <Text style={styles.statLabel}>{c.label}</Text>
              </View>
            ))}
          </View>

          <View style={styles.trainingCard}>
            <Text style={styles.cardLabel}>Treino Atual</Text>
            <Text style={styles.exerciseName}>{detail.exercise}</Text>
            <Text style={styles.exerciseMeta}>
              {detail.sets} · Última sessão: {detail.lastSession}
            </Text>
          </View>

          <View style={{ flexDirection: "row", gap: 12, paddingBottom: 8 }}>
            <TouchableOpacity style={styles.secondaryBtn}>
              <Text style={styles.secondaryBtnText}>📋 Ver Treino</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.primaryBtn}>
              <Text style={styles.primaryBtnText}>💬 Mensagem</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.searchWrap}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Buscar aluno ou objetivo…"
          placeholderTextColor={colors.mutedForeground}
          style={styles.searchInput}
        />
      </View>

      <View style={styles.filterRow}>
        {FILTROS.map((f) => {
          const ativo = filtro === f;
          return (
            <TouchableOpacity
              key={f}
              onPress={() => setFiltro(f)}
              style={[
                styles.filterChip,
                ativo
                  ? { backgroundColor: colors.primary }
                  : {
                      backgroundColor: colors.card,
                      borderWidth: 1,
                      borderColor: colors.border,
                    },
              ]}
            >
              <Text
                style={[
                  styles.filterChipText,
                  { color: ativo ? "#fff" : colors.mutedForeground },
                ]}
              >
                {f}
              </Text>
            </TouchableOpacity>
          );
        })}
        <TouchableOpacity style={styles.addChip} onPress={abrirFormulario}>
          <Text style={styles.addChipText}>+ Adicionar</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.list}>
        {filtered.map((s) => (
          <TouchableOpacity
            key={s.id}
            onPress={() => setDetail(s)}
            style={[
              styles.studentRow,
              {
                borderColor:
                  s.status === "danger" ? "rgba(217,28,28,0.3)" : colors.border,
              },
            ]}
          >
            <View
              style={[styles.avatar, { backgroundColor: STATUS_BG[s.status] }]}
            >
              <Text
                style={[styles.avatarText, { color: STATUS_COLOR[s.status] }]}
              >
                {s.avatar}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.studentName}>{s.name}</Text>
              <Text style={styles.studentMeta}>
                {s.age > 0 ? `${s.age} anos · ` : ""}
                {s.goal} · {s.sessions} sessões
              </Text>
            </View>
            <View style={{ alignItems: "flex-end", gap: 4 }}>
              <View
                style={[styles.badge, { backgroundColor: STATUS_BG[s.status] }]}
              >
                <Text
                  style={[styles.badgeText, { color: STATUS_COLOR[s.status] }]}
                >
                  {STATUS_LABEL[s.status]}
                </Text>
              </View>
              <Text style={{ fontSize: 11, color: PLAN_COLOR[s.plan] }}>
                {s.plan}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
        {filtered.length === 0 && (
          <View style={{ alignItems: "center", paddingVertical: 60, gap: 8 }}>
            <Text style={{ fontSize: 28 }}>🔍</Text>
            <Text
              style={{
                color: colors.mutedForeground,
                fontSize: 14,
                textAlign: "center",
              }}
            >
              {students.length === 0
                ? "Você ainda não tem alunos.\nToque em “+ Adicionar” para começar."
                : "Nenhum aluno encontrado"}
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  searchWrap: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12 },
  searchIcon: {
    position: "absolute",
    left: 32,
    top: 27,
    fontSize: 14,
    zIndex: 1,
  },
  searchInput: {
    backgroundColor: colors.card,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 20,
    paddingLeft: 36,
    paddingRight: 16,
    paddingVertical: 12,
    fontSize: 14,
    color: colors.foreground,
  },
  filterRow: {
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  filterChip: { paddingHorizontal: 12, paddingVertical: 5, borderRadius: 999 },
  filterChipText: { fontSize: 11, fontWeight: "600" },
  addChip: {
    marginLeft: "auto",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 999,
    backgroundColor: "rgba(217,28,28,0.12)",
    borderWidth: 1,
    borderColor: "rgba(217,28,28,0.25)",
  },
  addChipText: { color: colors.primary, fontSize: 11, fontWeight: "700" },
  list: { paddingHorizontal: 20, paddingBottom: 20, gap: 8 },
  studentRow: {
    borderRadius: 20,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: colors.card,
    borderWidth: 1,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { fontFamily: fonts.display, fontSize: 14 },
  studentName: {
    color: colors.foreground,
    fontFamily: fonts.display,
    fontSize: 14,
  },
  studentMeta: { color: colors.mutedForeground, fontSize: 12, marginTop: 2 },
  badge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 999 },
  badgeText: { fontSize: 11, fontWeight: "700" },
  detailHeader: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backBtn: {
    width: 32,
    height: 32,
    borderRadius: 12,
    backgroundColor: colors.card,
    alignItems: "center",
    justifyContent: "center",
  },
  backText: { color: colors.foreground, fontSize: 18, fontWeight: "700" },
  detailHeaderTitle: {
    color: colors.foreground,
    fontFamily: fonts.display,
    fontSize: 15,
    flex: 1,
  },
  detailBody: { paddingHorizontal: 20, paddingVertical: 16, gap: 16 },
  profileCard: {
    borderRadius: 20,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  avatarLg: {
    width: 56,
    height: 56,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarLgText: { fontFamily: fonts.display, fontSize: 18 },
  profileName: {
    color: colors.foreground,
    fontFamily: fonts.display,
    fontSize: 15,
  },
  profileMeta: { color: colors.mutedForeground, fontSize: 12, marginTop: 2 },
  planBadge: {
    alignSelf: "flex-start",
    marginTop: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
  },
  planBadgeText: { fontSize: 11, fontWeight: "700" },
  statsRow: { flexDirection: "row", gap: 8 },
  statCard: {
    flex: 1,
    borderRadius: 20,
    padding: 12,
    alignItems: "center",
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  statValue: { fontFamily: fonts.display, fontSize: 18 },
  statLabel: { color: colors.mutedForeground, fontSize: 11, marginTop: 2 },
  trainingCard: {
    borderRadius: 20,
    padding: 16,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardLabel: {
    color: colors.mutedForeground,
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  exerciseName: {
    color: colors.foreground,
    fontFamily: fonts.display,
    fontSize: 20,
  },
  exerciseMeta: { color: colors.mutedForeground, fontSize: 13, marginTop: 4 },
  secondaryBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: "center",
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  secondaryBtnText: {
    color: colors.foreground,
    fontSize: 14,
    fontWeight: "700",
  },
  primaryBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: "center",
    backgroundColor: colors.primary,
  },
  primaryBtnText: { color: "#fff", fontSize: 14, fontWeight: "700" },
  formBody: { paddingHorizontal: 20, paddingVertical: 16 },
  formHint: {
    color: colors.mutedForeground,
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 8,
  },
  label: {
    color: colors.secondaryForeground,
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 6,
    marginTop: 14,
  },
  input: {
    backgroundColor: colors.card,
    borderWidth: 1.5,
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 14,
    color: colors.foreground,
  },
  planoChip: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 18,
    alignItems: "center",
    backgroundColor: colors.card,
    borderWidth: 1.5,
    borderColor: colors.borderStrong,
  },
  planoChipText: { fontSize: 13, fontWeight: "700" },
  errorBox: {
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 18,
    backgroundColor: "rgba(217,28,28,0.12)",
    borderWidth: 1,
    borderColor: "rgba(217,28,28,0.35)",
  },
  errorText: { color: colors.danger, fontSize: 14 },
  submitBtn: {
    marginTop: 20,
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  submitBtnText: { color: "#fff", fontFamily: fonts.display, fontSize: 16 },
});
