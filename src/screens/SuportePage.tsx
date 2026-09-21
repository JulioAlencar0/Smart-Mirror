import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { colors, fonts } from "../theme";
import { FAQ } from "../data";
import { IChevron } from "../components/Icons";

const CONTACTS = [
  { icon: "💬", label: "Chat ao vivo", sub: "Resposta imediata" },
  { icon: "📱", label: "WhatsApp", sub: "(11) 99999-0000" },
  { icon: "📧", label: "E-mail", sub: "suporte@smartmirror.app" },
  { icon: "📹", label: "Videochamada", sub: "Agendar sessão" },
];

export default function SuportePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [msg, setMsg] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.contactsGrid}>
        {CONTACTS.map((c) => (
          <TouchableOpacity key={c.label} style={styles.contactCard}>
            <Text style={styles.contactIcon}>{c.icon}</Text>
            <Text style={styles.contactLabel}>{c.label}</Text>
            <Text style={styles.contactSub} numberOfLines={1}>
              {c.sub}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.statusRow}>
        <View style={styles.statusDot} />
        <View>
          <Text style={styles.statusTitle}>Todos os sistemas operando</Text>
          <Text style={styles.statusSub}>Última verificação: há 2 min</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>Enviar Mensagem</Text>
        {sent ? (
          <View style={{ alignItems: "center", gap: 8, paddingVertical: 16 }}>
            <Text style={{ fontSize: 28 }}>✅</Text>
            <Text style={styles.sentTitle}>Mensagem enviada!</Text>
            <Text style={styles.sentSub}>
              Nossa equipe retornará em até 2 horas úteis.
            </Text>
            <TouchableOpacity
              onPress={() => {
                setSent(false);
                setMsg("");
              }}
            >
              <Text style={styles.sentAgain}>Enviar outra mensagem</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <TextInput
              value={msg}
              onChangeText={setMsg}
              placeholder="Descreva seu problema ou dúvida…"
              placeholderTextColor={colors.mutedForeground}
              multiline
              numberOfLines={4}
              style={styles.textarea}
            />
            <TouchableOpacity
              onPress={() => msg.trim() && setSent(true)}
              style={[
                styles.sendBtn,
                { backgroundColor: msg.trim() ? colors.primary : colors.muted },
              ]}
            >
              <Text
                style={[
                  styles.sendBtnText,
                  { color: msg.trim() ? "#fff" : colors.mutedForeground },
                ]}
              >
                Enviar
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      <Text style={styles.sectionLabel}>Perguntas Frequentes</Text>
      <View style={styles.faqCard}>
        {FAQ.map((f, i) => (
          <View
            key={i}
            style={i > 0 && { borderTopWidth: 1, borderTopColor: colors.border }}
          >
            <TouchableOpacity
              style={styles.faqQuestion}
              onPress={() => setOpenFaq(openFaq === i ? null : i)}
            >
              <Text style={styles.faqQuestionText}>{f.q}</Text>
              <IChevron open={openFaq === i} color={colors.foreground} />
            </TouchableOpacity>
            {openFaq === i && (
              <View style={styles.faqAnswer}>
                <Text style={styles.faqAnswerText}>{f.a}</Text>
              </View>
            )}
          </View>
        ))}
      </View>

      <View style={{ alignItems: "center", paddingVertical: 8 }}>
        <Text style={styles.footerText}>Smart Mirror Personal v2.4.1</Text>
        <Text style={styles.footerText}>© 2026 Smart Mirror Tech · LGPD compliant</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 20, paddingVertical: 16, gap: 16, paddingBottom: 32 },
  contactsGrid: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  contactCard: {
    width: "47%",
    borderRadius: 20,
    padding: 16,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  contactIcon: { fontSize: 22, marginBottom: 8 },
  contactLabel: { color: colors.foreground, fontFamily: fonts.display, fontSize: 14 },
  contactSub: { color: colors.mutedForeground, fontSize: 12, marginTop: 2 },
  statusRow: {
    borderRadius: 20,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "rgba(48,209,88,0.08)",
    borderWidth: 1,
    borderColor: "rgba(48,209,88,0.2)",
  },
  statusDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: colors.ok },
  statusTitle: { color: colors.ok, fontSize: 14, fontWeight: "600" },
  statusSub: { color: colors.secondaryForeground, fontSize: 12, marginTop: 2 },
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
  sentTitle: { color: colors.foreground, fontFamily: fonts.display, fontSize: 14 },
  sentSub: { color: colors.mutedForeground, fontSize: 12, textAlign: "center" },
  sentAgain: { color: colors.primary, fontSize: 12, marginTop: 4 },
  textarea: {
    backgroundColor: colors.muted,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: colors.foreground,
    minHeight: 90,
    textAlignVertical: "top",
  },
  sendBtn: {
    marginTop: 12,
    paddingVertical: 12,
    borderRadius: 16,
    alignItems: "center",
  },
  sendBtnText: { fontSize: 14, fontWeight: "700" },
  sectionLabel: {
    color: colors.mutedForeground,
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginLeft: 4,
  },
  faqCard: {
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  faqQuestion: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  faqQuestionText: { color: colors.foreground, fontSize: 14, fontWeight: "600", flex: 1, paddingRight: 12 },
  faqAnswer: { paddingHorizontal: 16, paddingBottom: 16 },
  faqAnswerText: { color: colors.secondaryForeground, fontSize: 12, lineHeight: 18 },
  footerText: { color: colors.mutedForeground, fontSize: 11, marginTop: 2 },
});
