import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Switch, StyleSheet } from "react-native";
import { colors, fonts } from "../theme";
import { Student, SubPageId } from "../types";
import SubPage from "../components/SubPage";
import AlunosPage from "./AlunosPage";
import PlanoPage from "./PlanoPage";
import SuportePage from "./SuportePage";

export default function Profile({
  students,
  onLogout,
}: {
  students: Student[];
  onLogout: () => void;
}) {
  const [subPage, setSubPage] = useState<SubPageId>(null);
  const [notifications, setNotifications] = useState(true);
  const [vibrate, setVibrate] = useState(true);
  const [sound, setSound] = useState(false);

  const toggles = [
    {
      label: "Notificações de erro",
      sub: "Receber quando aluno errar execução",
      val: notifications,
      set: setNotifications,
    },
    {
      label: "Vibrar no alerta",
      sub: "Vibração ao detectar erro crítico",
      val: vibrate,
      set: setVibrate,
    },
    { label: "Som de alerta", sub: "Áudio ao receber notificação", val: sound, set: setSound },
  ];

  const accountItems: { label: string; sub: string; page: SubPageId; icon: string }[] = [
    {
      label: "Meus Alunos",
      sub: `${students.length} alunos cadastrados`,
      page: "alunos",
      icon: "👥",
    },
    { label: "Plano & Assinatura", sub: "Plano Pro · R$ 89,90/mês", page: "plano", icon: "⚡" },
    { label: "Suporte", sub: "Chat, FAQ e contato", page: "suporte", icon: "🛟" },
  ];

  return (
    <View style={{ flex: 1 }}>
      {subPage === "alunos" && (
        <SubPage title="Meus Alunos" onClose={() => setSubPage(null)}>
          <AlunosPage students={students} />
        </SubPage>
      )}
      {subPage === "plano" && (
        <SubPage title="Plano & Assinatura" onClose={() => setSubPage(null)}>
          <PlanoPage />
        </SubPage>
      )}
      {subPage === "suporte" && (
        <SubPage title="Suporte" onClose={() => setSubPage(null)}>
          <SuportePage />
        </SubPage>
      )}

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>D</Text>
          </View>
          <Text style={styles.name}>Diego Martins</Text>
          <Text style={styles.role}>Personal Trainer · CREF 012345-G/SP</Text>
          <View style={styles.statsRow}>
            {[
              { v: String(students.length), l: "Alunos" },
              { v: "48", l: "Sessões/mês" },
              { v: "4.9★", l: "Avaliação" },
            ].map((s) => (
              <View key={s.l} style={{ alignItems: "center" }}>
                <Text style={styles.statValue}>{s.v}</Text>
                <Text style={styles.statLabel}>{s.l}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.notifCard}>
          <Text style={styles.cardLabel}>Alertas & Notificações</Text>
          {toggles.map((item, i) => (
            <View
              key={item.label}
              style={[
                styles.toggleRow,
                i > 0 && { borderTopWidth: 1, borderTopColor: colors.border },
              ]}
            >
              <View style={{ flex: 1 }}>
                <Text style={styles.toggleLabel}>{item.label}</Text>
                <Text style={styles.toggleSub}>{item.sub}</Text>
              </View>
              <Switch
                value={item.val}
                onValueChange={item.set}
                trackColor={{ false: colors.muted, true: colors.primary }}
                thumbColor="#fff"
              />
            </View>
          ))}
        </View>

        <View style={styles.accountCard}>
          <Text style={[styles.cardLabel, { paddingHorizontal: 16, paddingTop: 16, marginBottom: 4 }]}>
            Conta
          </Text>
          {accountItems.map((item, i) => (
            <TouchableOpacity
              key={item.label}
              onPress={() => setSubPage(item.page)}
              style={[
                styles.accountRow,
                { borderTopWidth: 1, borderTopColor: colors.border },
              ]}
            >
              <View style={styles.accountIcon}>
                <Text style={{ fontSize: 17 }}>{item.icon}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.accountLabel}>{item.label}</Text>
                <Text style={styles.accountSub}>{item.sub}</Text>
              </View>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            onPress={onLogout}
            style={[styles.accountRow, { borderTopWidth: 1, borderTopColor: colors.border }]}
          >
            <View style={[styles.accountIcon, { backgroundColor: "rgba(217,28,28,0.12)" }]}>
              <Text style={{ fontSize: 17 }}>🚪</Text>
            </View>
            <Text style={[styles.accountLabel, { color: colors.primary }]}>Sair da conta</Text>
          </TouchableOpacity>
        </View>

        <View style={{ alignItems: "center", paddingBottom: 16 }}>
          <Text style={styles.footerText}>Smart Mirror Personal v2.4.1</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { paddingHorizontal: 20, paddingTop: 24, paddingBottom: 16, alignItems: "center" },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  avatarText: { color: "#fff", fontFamily: fonts.display, fontSize: 24 },
  name: { color: colors.foreground, fontFamily: fonts.display, fontSize: 20 },
  role: { color: colors.mutedForeground, fontSize: 12, marginTop: 2 },
  statsRow: { flexDirection: "row", gap: 24, marginTop: 16 },
  statValue: { color: colors.primary, fontFamily: fonts.display, fontSize: 18 },
  statLabel: { color: colors.mutedForeground, fontSize: 11 },
  notifCard: {
    marginHorizontal: 20,
    marginBottom: 12,
    borderRadius: 24,
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
  toggleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 12,
  },
  toggleLabel: { color: colors.foreground, fontSize: 14, fontWeight: "500" },
  toggleSub: { color: colors.mutedForeground, fontSize: 12, marginTop: 2 },
  accountCard: {
    marginHorizontal: 20,
    marginBottom: 12,
    borderRadius: 24,
    overflow: "hidden",
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  accountRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  accountIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: colors.muted,
    alignItems: "center",
    justifyContent: "center",
  },
  accountLabel: { color: colors.foreground, fontSize: 14, fontWeight: "600" },
  accountSub: { color: colors.mutedForeground, fontSize: 12, marginTop: 2 },
  chevron: { color: colors.mutedForeground, fontSize: 18 },
  footerText: { color: colors.mutedForeground, fontSize: 11 },
});
