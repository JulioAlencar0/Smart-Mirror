import React from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { colors, fonts } from "../theme";
import { Student } from "../types";
import { STATUS_COLOR, STATUS_LABEL, STATUS_BG } from "../data";
import { IDanger, IWarn } from "../components/Icons";

export default function Monitor({
  students,
  onSelectStudent,
}: {
  students: Student[];
  onSelectStudent: (s: Student) => void;
}) {
  return (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Monitorar</Text>
          <Text style={styles.subtitle}>Análise em tempo real</Text>
        </View>
        <View style={styles.liveBadge}>
          <View style={styles.liveDot} />
          <Text style={styles.liveText}>AO VIVO</Text>
        </View>
      </View>

      <View style={styles.list}>
        {students.map((s) => (
          <TouchableOpacity
            key={s.id}
            onPress={() => onSelectStudent(s)}
            style={[
              styles.card,
              {
                backgroundColor:
                  s.status === "danger" ? "rgba(217,28,28,0.09)" : colors.card,
                borderColor:
                  s.status === "danger"
                    ? "rgba(217,28,28,0.32)"
                    : s.status === "warn"
                      ? "rgba(255,159,10,0.25)"
                      : colors.border,
              },
            ]}
          >
            <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
              <View
                style={[
                  styles.avatar,
                  { backgroundColor: STATUS_BG[s.status] },
                ]}
              >
                <Text style={[styles.avatarText, { color: STATUS_COLOR[s.status] }]}>
                  {s.avatar}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{s.name}</Text>
                <Text style={styles.meta}>
                  {s.exercise} · {s.sets}
                </Text>
              </View>
              <View style={{ alignItems: "flex-end", gap: 4 }}>
                <View
                  style={[styles.badge, { backgroundColor: STATUS_BG[s.status] }]}
                >
                  <Text style={[styles.badgeText, { color: STATUS_COLOR[s.status] }]}>
                    {STATUS_LABEL[s.status]}
                  </Text>
                </View>
                {s.status !== "resting" && (
                  <Text style={styles.reps}>
                    {s.reps}/{s.targetReps} reps
                  </Text>
                )}
              </View>
            </View>

            {s.status !== "resting" && (
              <View style={styles.progressTrack}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${(s.reps / s.targetReps) * 100}%`,
                      backgroundColor: STATUS_COLOR[s.status],
                    },
                  ]}
                />
              </View>
            )}

            {(s.status === "danger" || s.status === "warn") && (
              <View style={styles.warnRow}>
                {s.status === "danger" ? (
                  <IDanger size={14} color={STATUS_COLOR[s.status]} />
                ) : (
                  <IWarn size={14} color={STATUS_COLOR[s.status]} />
                )}
                <Text style={[styles.warnText, { color: STATUS_COLOR[s.status] }]}>
                  {s.status === "danger"
                    ? "Erro de execução — toque para detalhes"
                    : "Atenção na técnica — verifique"}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: { color: colors.foreground, fontFamily: fonts.display, fontSize: 18 },
  subtitle: { color: colors.mutedForeground, fontSize: 12, marginTop: 2 },
  liveBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 999,
    backgroundColor: "rgba(48,209,88,0.10)",
    borderWidth: 1,
    borderColor: "rgba(48,209,88,0.25)",
  },
  liveDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.ok },
  liveText: { color: colors.ok, fontSize: 11, fontWeight: "700" },
  list: { paddingHorizontal: 20, paddingBottom: 20, gap: 12 },
  card: { borderRadius: 20, padding: 16, borderWidth: 1 },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { fontFamily: fonts.display, fontSize: 14 },
  name: { color: colors.foreground, fontFamily: fonts.display, fontSize: 14 },
  meta: { color: colors.mutedForeground, fontSize: 12, marginTop: 2 },
  badge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 999 },
  badgeText: { fontSize: 11, fontWeight: "700" },
  reps: { color: colors.mutedForeground, fontSize: 11 },
  progressTrack: {
    marginTop: 12,
    height: 4,
    borderRadius: 999,
    backgroundColor: colors.muted,
    overflow: "hidden",
  },
  progressFill: { height: "100%", borderRadius: 999 },
  warnRow: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  warnText: { fontSize: 12, flex: 1 },
});
