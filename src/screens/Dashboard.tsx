import React from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { colors, fonts } from "../theme";
import { Student, AlertItem, Screen } from "../types";
import { ICheck, IRun, IBell } from "../components/Icons";

const SESSIONS = [
  { name: "Rafael Costa", exercise: "Agachamento + Leg Press", time: "07:00", done: true },
  { name: "Mariana Lima", exercise: "Supino + Puxada", time: "08:00", done: true },
  { name: "Juliana Pires", exercise: "Full Body", time: "09:00", done: false },
  { name: "Thiago Rocha", exercise: "Cardio + Core", time: "10:00", done: false },
];

export default function Dashboard({
  students,
  alerts,
  onNav,
}: {
  students: Student[];
  alerts: AlertItem[];
  onNav: (s: Screen) => void;
}) {
  const active = students.filter((s) => s.status !== "resting").length;
  const errors = students.filter((s) => s.status === "danger").length;
  const warnings = students.filter((s) => s.status === "warn").length;
  const unresolved = alerts.filter((a) => !a.resolved).length;

  return (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View>
          <Text style={styles.dateText}>Segunda-feira, 31 ago</Text>
          <Text style={styles.hello}>Olá, Diego 👋</Text>
        </View>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>D</Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => onNav("monitor")}
        style={[
          styles.statusBanner,
          {
            backgroundColor: errors > 0 ? "rgba(217,28,28,0.10)" : "rgba(48,209,88,0.08)",
            borderColor: errors > 0 ? "rgba(217,28,28,0.35)" : "rgba(48,209,88,0.25)",
          },
        ]}
      >
        <View
          style={[
            styles.dot,
            { backgroundColor: errors > 0 ? colors.primary : colors.ok },
          ]}
        />
        <View style={{ flex: 1 }}>
          <Text
            style={[
              styles.statusTitle,
              { color: errors > 0 ? colors.primary : colors.ok },
            ]}
          >
            {errors > 0
              ? `${errors} aluno${errors > 1 ? "s" : ""} com erro detectado`
              : "Todos os alunos no padrão correto"}
          </Text>
          <Text style={styles.statusSub}>
            {active} ativos · {warnings} aviso{warnings !== 1 ? "s" : ""} · Toque para monitorar
          </Text>
        </View>
        <Text style={styles.chevron}>›</Text>
      </TouchableOpacity>

      <View style={styles.statsRow}>
        {[
          { label: "Ativos", value: active, color: colors.foreground },
          { label: "Erros", value: errors, color: colors.primary },
          { label: "Avisos", value: warnings, color: colors.warn },
        ].map((c) => (
          <View key={c.label} style={styles.statCard}>
            <Text style={[styles.statValue, { color: c.color }]}>{c.value}</Text>
            <Text style={styles.statLabel}>{c.label}</Text>
          </View>
        ))}
      </View>

      {unresolved > 0 && (
        <TouchableOpacity onPress={() => onNav("alerts")} style={styles.alertBanner}>
          <View style={styles.alertIcon}>
            <IBell size={18} color="#fff" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.alertTitle}>
              {unresolved} alerta{unresolved > 1 ? "s" : ""} não resolvido
              {unresolved > 1 ? "s" : ""}
            </Text>
            <Text style={styles.alertSub}>Toque para ver e resolver</Text>
          </View>
          <Text style={[styles.chevron, { color: colors.primary }]}>›</Text>
        </TouchableOpacity>
      )}

      <View style={styles.sessionsCard}>
        <View style={styles.sessionsHeader}>
          <Text style={styles.sessionsTitle}>Sessões de Hoje</Text>
          <Text style={styles.sessionsCount}>4 sessões</Text>
        </View>
        {SESSIONS.map((s, i) => (
          <View
            key={s.name}
            style={[
              styles.sessionRow,
              i > 0 && { borderTopWidth: 1, borderTopColor: colors.border },
            ]}
          >
            <View
              style={[
                styles.sessionIcon,
                {
                  backgroundColor: s.done ? "rgba(48,209,88,0.12)" : colors.secondary,
                },
              ]}
            >
              {s.done ? (
                <ICheck size={16} color={colors.ok} />
              ) : (
                <IRun size={16} color={colors.mutedForeground} />
              )}
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.sessionName}>{s.name}</Text>
              <Text style={styles.sessionExercise}>{s.exercise}</Text>
            </View>
            <Text
              style={[
                styles.sessionTime,
                { color: s.done ? colors.ok : colors.secondaryForeground },
              ]}
            >
              {s.time}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dateText: { color: colors.mutedForeground, fontSize: 12 },
  hello: { color: colors.foreground, fontFamily: fonts.display, fontSize: 18 },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { color: "#fff", fontFamily: fonts.display, fontSize: 14 },
  statusBanner: {
    marginHorizontal: 20,
    marginBottom: 12,
    borderRadius: 20,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderWidth: 1,
  },
  dot: { width: 10, height: 10, borderRadius: 5 },
  statusTitle: { fontSize: 14, fontWeight: "600" },
  statusSub: { color: colors.secondaryForeground, fontSize: 12, marginTop: 2 },
  chevron: { color: colors.secondaryForeground, fontSize: 20 },
  statsRow: {
    flexDirection: "row",
    gap: 8,
    marginHorizontal: 20,
    marginBottom: 12,
  },
  statCard: {
    flex: 1,
    borderRadius: 20,
    padding: 12,
    alignItems: "center",
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  statValue: { fontFamily: fonts.display, fontSize: 24 },
  statLabel: { color: colors.mutedForeground, fontSize: 11, marginTop: 2 },
  alertBanner: {
    marginHorizontal: 20,
    marginBottom: 12,
    borderRadius: 20,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "rgba(217,28,28,0.09)",
    borderWidth: 1,
    borderColor: "rgba(217,28,28,0.28)",
  },
  alertIcon: {
    width: 32,
    height: 32,
    borderRadius: 12,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  alertTitle: { color: colors.primary, fontSize: 14, fontWeight: "600" },
  alertSub: { color: colors.secondaryForeground, fontSize: 12, marginTop: 2 },
  sessionsCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 24,
    overflow: "hidden",
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sessionsHeader: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sessionsTitle: {
    color: colors.mutedForeground,
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  sessionsCount: { color: colors.primary, fontSize: 11, fontWeight: "600" },
  sessionRow: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  sessionIcon: {
    width: 32,
    height: 32,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  sessionName: { color: colors.foreground, fontSize: 14, fontWeight: "600" },
  sessionExercise: { color: colors.mutedForeground, fontSize: 12, marginTop: 1 },
  sessionTime: { fontSize: 12, fontWeight: "600" },
});
