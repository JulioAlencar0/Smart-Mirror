import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { IDanger, IWarn } from "../components/Icons";
import { STATUS_BG, STATUS_COLOR, STATUS_LABEL } from "../data";
import { colors, fonts } from "../theme";
import { Student } from "../types";

const TIPS: Record<string, string[]> = {
  Agachamento: [
    "Joelhos alinhados com os pés",
    "Costas neutras, peito erguido",
    "Descer até 90° ou mais",
    "Peso nos calcanhares",
  ],
  "Levantamento Terra": [
    "Barra rente às pernas",
    "Ombros sobre ou atrás da barra",
    "Quadril empurrando para trás",
    "Core contraído",
  ],
  "Supino Reto": [
    "Barra desce até o peito",
    "Cotovelos a 45–75° do tronco",
    "Pés fixos no chão",
    "Leve arqueamento natural",
  ],
  "Rosca Direta": [
    "Cotovelos fixos ao lado do corpo",
    "Amplitude completa",
    "Sem balanço de tronco",
    "Supinação no topo",
  ],
  Pulldown: [
    "Pegada na largura dos ombros",
    "Puxar até o queixo",
    "Escápulas aduzidas",
    "Não balançar o tronco",
  ],
  "Leg Press": [
    "Pés paralelos na plataforma",
    "Não bloquear joelhos",
    "Lombar encostada no banco",
    "Amplitude completa",
  ],
};

export default function StudentDetail({
  student,
  onClose,
}: {
  student: Student;
  onClose: () => void;
}) {
  const tips = TIPS[student.exercise] ?? [
    "Core ativo",
    "Respire de forma controlada",
    "Amplitude completa",
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={onClose}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{student.name}</Text>
        <View
          style={[styles.badge, { backgroundColor: STATUS_BG[student.status] }]}
        >
          <Text
            style={[styles.badgeText, { color: STATUS_COLOR[student.status] }]}
          >
            {STATUS_LABEL[student.status]}
          </Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.body}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Exercício Atual</Text>
          <Text style={styles.exerciseName}>{student.exercise}</Text>
          <Text style={styles.exerciseMeta}>
            {student.sets} · {student.reps}/{student.targetReps} reps
          </Text>
          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${(student.reps / student.targetReps) * 100}%`,
                  backgroundColor: STATUS_COLOR[student.status],
                },
              ]}
            />
          </View>
        </View>

        {(student.status === "danger" || student.status === "warn") && (
          <View
            style={[
              styles.card,
              {
                backgroundColor:
                  student.status === "danger"
                    ? "rgba(217,28,28,0.10)"
                    : "rgba(255,159,10,0.10)",
                borderColor:
                  student.status === "danger"
                    ? "rgba(217,28,28,0.35)"
                    : "rgba(255,159,10,0.35)",
              },
            ]}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 8,
                marginBottom: 8,
              }}
            >
              {student.status === "danger" ? (
                <IDanger size={16} color={STATUS_COLOR[student.status]} />
              ) : (
                <IWarn size={16} color={STATUS_COLOR[student.status]} />
              )}
              <Text
                style={[
                  styles.warnTitle,
                  { color: STATUS_COLOR[student.status] },
                ]}
              >
                {student.status === "danger"
                  ? "Erro de execução detectado"
                  : "Atenção na técnica"}
              </Text>
            </View>
            <Text style={styles.warnBody}>
              {student.status === "danger"
                ? "Análise biomecânica identificou padrão de movimento fora do esperado. Intervenção imediata recomendada."
                : "Pequeno desvio técnico. Oriente o aluno sobre o ponto de atenção."}
            </Text>
          </View>
        )}

        <View style={styles.card}>
          <Text style={styles.cardLabel}>Pontos-chave de técnica</Text>
          <View style={{ gap: 10 }}>
            {tips.map((tip, i) => (
              <View
                key={i}
                style={{
                  flexDirection: "row",
                  gap: 12,
                  alignItems: "flex-start",
                }}
              >
                <View style={styles.tipNumber}>
                  <Text style={styles.tipNumberText}>{i + 1}</Text>
                </View>
                <Text style={styles.tipText}>{tip}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={{ flexDirection: "row", gap: 12, paddingBottom: 8 }}>
          <TouchableOpacity style={styles.secondaryBtn}>
            <Text style={styles.secondaryBtnText}>💬 Mensagem</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.primaryBtn}>
            <Text style={styles.primaryBtnText}>📋 Ajustar Treino</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 40,
    backgroundColor: colors.background,
  },
  header: {
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
  title: {
    color: colors.foreground,
    fontFamily: fonts.display,
    fontSize: 16,
    flex: 1,
  },
  badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 999 },
  badgeText: { fontSize: 11, fontWeight: "700" },
  body: { paddingHorizontal: 20, paddingVertical: 16, gap: 16 },
  card: {
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
    fontSize: 22,
  },
  exerciseMeta: { color: colors.mutedForeground, fontSize: 14, marginTop: 4 },
  progressTrack: {
    marginTop: 12,
    height: 6,
    borderRadius: 999,
    backgroundColor: colors.muted,
    overflow: "hidden",
  },
  progressFill: { height: "100%", borderRadius: 999 },
  warnTitle: { fontSize: 14, fontWeight: "700" },
  warnBody: { color: colors.secondaryForeground, fontSize: 12, lineHeight: 18 },
  tipNumber: {
    width: 20,
    height: 20,
    borderRadius: 999,
    backgroundColor: "rgba(217,28,28,0.15)",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 1,
  },
  tipNumberText: { color: colors.primary, fontSize: 11, fontWeight: "700" },
  tipText: { color: colors.foreground, fontSize: 14, flex: 1 },
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
});
