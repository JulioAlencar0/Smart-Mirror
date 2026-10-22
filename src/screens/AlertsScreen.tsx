import { useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ICheck, IDanger, IWarn } from "../components/Icons";
import { colors, fonts } from "../theme";
import { AlertItem } from "../types";

export default function AlertsScreen({
  alerts,
  onResolve,
  loading = false,
  error = "",
  onRefresh,
}: {
  alerts: AlertItem[];
  onResolve: (id: string) => void;
  loading?: boolean;
  error?: string;
  onRefresh?: () => Promise<void> | void;
}) {
  const unresolved = alerts.filter((a) => !a.resolved);
  const resolved = alerts.filter((a) => a.resolved);
  const [expanded, setExpanded] = useState<string | null>(
    unresolved[0]?.id ?? null,
  );
  const [refreshing, setRefreshing] = useState(false);

  const puxar = async () => {
    setRefreshing(true);
    await onRefresh?.();
    setRefreshing(false);
  };

  return (
    <ScrollView
      style={{ flex: 1 }}
      showsVerticalScrollIndicator={false}
      refreshControl={
        onRefresh ? (
          <RefreshControl
            refreshing={refreshing}
            onRefresh={puxar}
            tintColor={colors.primary}
            colors={[colors.primary]}
          />
        ) : undefined
      }
    >
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Alertas</Text>
          <Text style={styles.subtitle}>
            {unresolved.length} pendente{unresolved.length !== 1 ? "s" : ""} ·{" "}
            {resolved.length} resolvido{resolved.length !== 1 ? "s" : ""}
          </Text>
        </View>
        {unresolved.length > 0 && (
          <View style={styles.countBadge}>
            <Text style={styles.countBadgeText}>{unresolved.length}</Text>
          </View>
        )}
      </View>

      {loading && alerts.length === 0 && (
        <View style={styles.emptyState}>
          <ActivityIndicator color={colors.primary} />
        </View>
      )}

      {!!error && (
        <View style={styles.errorBox}>
          <Text style={styles.errorBoxText}>{error}</Text>
        </View>
      )}

      {!loading && !error && unresolved.length === 0 && (
        <View style={styles.emptyState}>
          <View style={styles.emptyIcon}>
            <Text style={{ fontSize: 28 }}>✓</Text>
          </View>
          <Text style={styles.emptyTitle}>Tudo em ordem!</Text>
          <Text style={styles.emptySub}>
            Nenhum alerta pendente no momento.
          </Text>
        </View>
      )}

      <View style={styles.list}>
        {unresolved.map((a) => {
          const isOpen = expanded === a.id;
          const color = a.severity === "danger" ? colors.primary : colors.warn;
          return (
            <View
              key={a.id}
              style={[
                styles.alertCard,
                {
                  backgroundColor:
                    a.severity === "danger"
                      ? "rgba(217,28,28,0.09)"
                      : "rgba(255,159,10,0.08)",
                  borderColor:
                    a.severity === "danger"
                      ? "rgba(217,28,28,0.32)"
                      : "rgba(255,159,10,0.3)",
                },
              ]}
            >
              <TouchableOpacity
                style={{ padding: 16 }}
                onPress={() => setExpanded(isOpen ? null : a.id)}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "flex-start",
                    gap: 12,
                  }}
                >
                  <View style={[styles.alertIcon, { backgroundColor: color }]}>
                    {a.severity === "danger" ? (
                      <IDanger size={16} color="#fff" />
                    ) : (
                      <IWarn size={16} color="#fff" />
                    )}
                  </View>
                  <View style={{ flex: 1 }}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 6,
                      }}
                    >
                      <Text style={[styles.studentName, { color }]}>
                        {a.studentName}
                      </Text>
                      <Text style={styles.timeText}>· {a.time}</Text>
                    </View>
                    <Text style={styles.exerciseText}>{a.exercise}</Text>
                    <Text style={styles.errorText}>{a.error}</Text>
                  </View>
                  <Text
                    style={[
                      styles.chevron,
                      { transform: [{ rotate: isOpen ? "90deg" : "0deg" }] },
                    ]}
                  >
                    ›
                  </Text>
                </View>
              </TouchableOpacity>
              {isOpen && (
                <View style={styles.expandedBox}>
                  <Text style={styles.detailText}>{a.detail}</Text>
                  <TouchableOpacity
                    onPress={() => onResolve(a.id)}
                    style={[styles.resolveBtn, { backgroundColor: color }]}
                  >
                    <ICheck size={16} color="#fff" />
                    <Text style={styles.resolveBtnText}>
                      Marcar como Resolvido
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          );
        })}

        {resolved.length > 0 && (
          <>
            <Text style={styles.resolvedTitle}>Resolvidos</Text>
            {resolved.map((a) => (
              <View key={a.id} style={styles.resolvedCard}>
                <View style={styles.resolvedIcon}>
                  <ICheck size={14} color={colors.ok} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.resolvedName}>
                    {a.studentName} · {a.exercise}
                  </Text>
                  <Text style={styles.resolvedError}>{a.error}</Text>
                </View>
              </View>
            ))}
          </>
        )}
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
  errorBox: {
    marginHorizontal: 20,
    marginTop: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 18,
    backgroundColor: "rgba(217,28,28,0.12)",
    borderWidth: 1,
    borderColor: "rgba(217,28,28,0.35)",
  },
  errorBoxText: { color: colors.danger, fontSize: 14 },
  title: { color: colors.foreground, fontFamily: fonts.display, fontSize: 18 },
  subtitle: { color: colors.mutedForeground, fontSize: 12, marginTop: 2 },
  countBadge: {
    width: 24,
    height: 24,
    borderRadius: 999,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  countBadgeText: { color: "#fff", fontSize: 11, fontWeight: "800" },
  emptyState: {
    alignItems: "center",
    paddingVertical: 60,
    paddingHorizontal: 40,
    gap: 10,
  },
  emptyIcon: {
    width: 56,
    height: 56,
    borderRadius: 999,
    backgroundColor: "rgba(48,209,88,0.12)",
    alignItems: "center",
    justifyContent: "center",
  },
  emptyTitle: {
    color: colors.foreground,
    fontFamily: fonts.display,
    fontSize: 15,
  },
  emptySub: {
    color: colors.mutedForeground,
    fontSize: 12,
    textAlign: "center",
  },
  list: { paddingHorizontal: 20, paddingBottom: 20, gap: 12 },
  alertCard: { borderRadius: 20, borderWidth: 1, overflow: "hidden" },
  alertIcon: {
    width: 32,
    height: 32,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },
  studentName: { fontSize: 14, fontWeight: "700" },
  timeText: { color: colors.mutedForeground, fontSize: 12 },
  exerciseText: {
    color: colors.secondaryForeground,
    fontSize: 12,
    marginTop: 2,
  },
  errorText: {
    color: colors.foreground,
    fontSize: 14,
    fontWeight: "600",
    marginTop: 4,
  },
  chevron: { color: colors.mutedForeground, fontSize: 20 },
  expandedBox: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  detailText: {
    color: colors.secondaryForeground,
    fontSize: 12,
    lineHeight: 18,
    paddingTop: 12,
    marginBottom: 12,
  },
  resolveBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 10,
    borderRadius: 16,
  },
  resolveBtnText: { color: "#fff", fontSize: 14, fontWeight: "700" },
  resolvedTitle: {
    color: colors.mutedForeground,
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginTop: 4,
    marginLeft: 4,
  },
  resolvedCard: {
    borderRadius: 20,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    opacity: 0.4,
  },
  resolvedIcon: {
    width: 28,
    height: 28,
    borderRadius: 10,
    backgroundColor: "rgba(48,209,88,0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  resolvedName: { color: colors.foreground, fontSize: 14, fontWeight: "600" },
  resolvedError: { color: colors.mutedForeground, fontSize: 12, marginTop: 1 },
});
