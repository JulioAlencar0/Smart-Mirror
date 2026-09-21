import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { colors, fonts } from "../theme";
import { PLAN_FEATURES, PLAN_COLOR } from "../data";
import { ICheck } from "../components/Icons";

const HISTORY = [
  { date: "01/08/2026", desc: "Plano Pro — Agosto 2026", value: "R$ 89,90", status: "Pago" },
  { date: "01/07/2026", desc: "Plano Pro — Julho 2026", value: "R$ 89,90", status: "Pago" },
  { date: "01/06/2026", desc: "Plano Pro — Junho 2026", value: "R$ 89,90", status: "Pago" },
];

const USAGE = [
  { label: "Alunos cadastrados", used: 6, max: 10, color: colors.primary },
  { label: "Sessões este mês", used: 48, max: 200, color: colors.ok },
  { label: "Alertas gerados", used: 73, max: 500, color: colors.warn },
];

export default function PlanoPage() {
  const currentPlan = "Pro";
  const [selected, setSelected] = useState<string>(currentPlan);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.banner}>
        <View style={styles.bannerIcon}>
          <Text style={{ fontSize: 20 }}>⚡</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.bannerTitle}>Plano Pro Ativo</Text>
          <Text style={styles.bannerSub}>Próxima cobrança: 01/09/2026 · R$ 89,90</Text>
        </View>
        <View style={styles.activeBadge}>
          <Text style={styles.activeBadgeText}>Ativo</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>Uso Atual</Text>
        <View style={{ gap: 12 }}>
          {USAGE.map((u) => (
            <View key={u.label}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 4 }}>
                <Text style={styles.usageLabel}>{u.label}</Text>
                <Text style={[styles.usageValue, { color: u.color }]}>
                  {u.used}/{u.max}
                </Text>
              </View>
              <View style={styles.usageTrack}>
                <View
                  style={[
                    styles.usageFill,
                    { width: `${(u.used / u.max) * 100}%`, backgroundColor: u.color },
                  ]}
                />
              </View>
            </View>
          ))}
        </View>
      </View>

      <Text style={styles.sectionLabel}>Alterar Plano</Text>
      {(["Básico", "Pro", "Elite"] as const).map((plan) => {
        const isActive = plan === currentPlan;
        const isSel = plan === selected;
        const price = plan === "Básico" ? "R$ 39,90" : plan === "Pro" ? "R$ 89,90" : "R$ 179,90";
        const color = PLAN_COLOR[plan];
        return (
          <TouchableOpacity
            key={plan}
            onPress={() => setSelected(plan)}
            style={[
              styles.planCard,
              {
                backgroundColor: isSel ? `${color}12` : colors.card,
                borderColor: isSel ? color : colors.border,
              },
            ]}
          >
            <View style={styles.planCardHeader}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                <View
                  style={[
                    styles.radioOuter,
                    { borderColor: isSel ? color : colors.border },
                  ]}
                >
                  {isSel && <View style={[styles.radioInner, { backgroundColor: color }]} />}
                </View>
                <Text style={[styles.planName, { color }]}>{plan}</Text>
                {isActive && (
                  <View style={[styles.currentBadge, { backgroundColor: `${color}20` }]}>
                    <Text style={[styles.currentBadgeText, { color }]}>Atual</Text>
                  </View>
                )}
              </View>
              <Text style={styles.planPrice}>
                {price}
                <Text style={styles.planPriceUnit}>/mês</Text>
              </Text>
            </View>
            <View style={styles.featuresGrid}>
              {PLAN_FEATURES[plan].slice(0, 4).map((f) => (
                <View key={f} style={styles.featureRow}>
                  <ICheck size={13} color={color} />
                  <Text style={styles.featureText}>{f}</Text>
                </View>
              ))}
            </View>
          </TouchableOpacity>
        );
      })}

      {selected !== currentPlan && (
        <TouchableOpacity style={styles.changeBtn}>
          <Text style={styles.changeBtnText}>Mudar para o Plano {selected}</Text>
        </TouchableOpacity>
      )}

      <Text style={styles.sectionLabel}>Histórico de Pagamentos</Text>
      <View style={styles.historyCard}>
        {HISTORY.map((h, i) => (
          <View
            key={h.date}
            style={[
              styles.historyRow,
              i > 0 && { borderTopWidth: 1, borderTopColor: colors.border },
            ]}
          >
            <View>
              <Text style={styles.historyDesc}>{h.desc}</Text>
              <Text style={styles.historyDate}>{h.date}</Text>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <Text style={styles.historyValue}>{h.value}</Text>
              <Text style={styles.historyStatus}>{h.status}</Text>
            </View>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.cancelBtn}>
        <Text style={styles.cancelBtnText}>Cancelar Plano</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 20, paddingVertical: 16, gap: 16, paddingBottom: 32 },
  banner: {
    borderRadius: 20,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "rgba(217,28,28,0.09)",
    borderWidth: 1,
    borderColor: "rgba(217,28,28,0.3)",
  },
  bannerIcon: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  bannerTitle: { color: colors.foreground, fontFamily: fonts.display, fontSize: 14 },
  bannerSub: { color: colors.secondaryForeground, fontSize: 12, marginTop: 2 },
  activeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: "rgba(48,209,88,0.15)",
  },
  activeBadgeText: { color: colors.ok, fontSize: 11, fontWeight: "700" },
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
    marginBottom: 12,
  },
  usageLabel: { color: colors.secondaryForeground, fontSize: 12 },
  usageValue: { fontSize: 12, fontWeight: "700" },
  usageTrack: {
    height: 5,
    borderRadius: 999,
    backgroundColor: colors.muted,
    overflow: "hidden",
  },
  usageFill: { height: "100%", borderRadius: 999 },
  sectionLabel: {
    color: colors.mutedForeground,
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginLeft: 4,
  },
  planCard: { borderRadius: 20, padding: 16, borderWidth: 1.5 },
  planCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  radioOuter: {
    width: 16,
    height: 16,
    borderRadius: 999,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  radioInner: { width: 8, height: 8, borderRadius: 999 },
  planName: { fontFamily: fonts.display, fontSize: 16 },
  currentBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 999 },
  currentBadgeText: { fontSize: 11, fontWeight: "600" },
  planPrice: { color: colors.foreground, fontSize: 14, fontWeight: "700" },
  planPriceUnit: { color: colors.mutedForeground, fontSize: 11, fontWeight: "400" },
  featuresGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingLeft: 24,
    columnGap: 16,
    rowGap: 4,
  },
  featureRow: { flexDirection: "row", alignItems: "center", gap: 4, width: "45%" },
  featureText: { color: colors.secondaryForeground, fontSize: 11, flexShrink: 1 },
  changeBtn: {
    paddingVertical: 14,
    borderRadius: 20,
    alignItems: "center",
    backgroundColor: colors.primary,
  },
  changeBtnText: { color: "#fff", fontSize: 14, fontWeight: "700" },
  historyCard: {
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  historyRow: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  historyDesc: { color: colors.foreground, fontSize: 14, fontWeight: "500" },
  historyDate: { color: colors.mutedForeground, fontSize: 12, marginTop: 2 },
  historyValue: { color: colors.foreground, fontSize: 14, fontWeight: "700" },
  historyStatus: { color: colors.ok, fontSize: 12, fontWeight: "600" },
  cancelBtn: {
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: "center",
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cancelBtnText: { color: colors.mutedForeground, fontSize: 14, fontWeight: "600" },
});
