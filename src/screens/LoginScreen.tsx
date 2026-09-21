import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { colors, fonts } from "../theme";
import { LogoMark, IEye, IEyeOff } from "../components/Icons";

export default function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handle = () => {
    if (!email || !password) {
      setError("Preencha e-mail e senha.");
      return;
    }
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin();
    }, 1400);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.container}>
        <View style={styles.hero}>
          <LogoMark size={60} />
          <View style={{ alignItems: "center", marginTop: 12 }}>
            <Text style={styles.brand}>
              SMART <Text style={{ color: colors.primary }}>MIRROR</Text>
            </Text>
            <Text style={styles.brandSub}>PERSONAL TRAINER PRO</Text>
          </View>
        </View>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.form}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.welcome}>Bem-vindo de volta</Text>
          <Text style={styles.welcomeSub}>
            Acesse sua conta para monitorar seus alunos
          </Text>

          <Text style={styles.label}>E-mail</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="diego@smartmirror.app"
            placeholderTextColor={colors.mutedForeground}
            autoCapitalize="none"
            keyboardType="email-address"
            style={[
              styles.input,
              { borderColor: email ? colors.primary : colors.borderStrong },
            ]}
          />

          <Text style={styles.label}>Senha</Text>
          <View style={{ position: "relative", justifyContent: "center" }}>
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="********"
              placeholderTextColor={colors.mutedForeground}
              secureTextEntry={!showPw}
              onSubmitEditing={handle}
              style={[
                styles.input,
                {
                  paddingRight: 48,
                  borderColor: password ? colors.primary : colors.borderStrong,
                },
              ]}
            />
            <TouchableOpacity
              style={styles.eyeBtn}
              onPress={() => setShowPw(!showPw)}
            >
              {showPw ? (
                <IEyeOff color={colors.mutedForeground} />
              ) : (
                <IEye color={colors.mutedForeground} />
              )}
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.forgotWrap}>
            <Text style={styles.forgot}>Esqueceu a senha?</Text>
          </TouchableOpacity>

          {!!error && (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}

          <TouchableOpacity
            onPress={handle}
            disabled={loading}
            style={[
              styles.loginBtn,
              { backgroundColor: loading ? "rgba(217,28,28,0.5)" : colors.primary },
            ]}
          >
            {loading ? (
              <View style={styles.loadingRow}>
                <ActivityIndicator color="#fff" size="small" />
                <Text style={styles.loginBtnText}>Entrando…</Text>
              </View>
            ) : (
              <Text style={styles.loginBtnText}>Entrar</Text>
            )}
          </TouchableOpacity>

          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>ou acesse com</Text>
            <View style={styles.dividerLine} />
          </View>

          <View style={{ flexDirection: "row", gap: 12 }}>
            <TouchableOpacity style={styles.socialBtn}>
              <Text style={styles.socialIcon}>G</Text>
              <Text style={styles.socialText}>Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialBtn}>
              <Text style={styles.socialIcon}></Text>
              <Text style={styles.socialText}>Apple</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.registerRow}>
            <Text style={styles.registerText}>Não tem conta? </Text>
            <TouchableOpacity>
              <Text style={styles.registerLink}>Cadastrar-se</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  hero: {
    height: 220,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0A0A0A",
  },
  brand: {
    color: colors.foreground,
    fontFamily: fonts.display,
    fontSize: 24,
    letterSpacing: 1,
  },
  brandSub: {
    color: colors.mutedForeground,
    fontSize: 11,
    marginTop: 3,
    letterSpacing: 2,
  },
  form: { paddingHorizontal: 24, paddingBottom: 32, paddingTop: 8 },
  welcome: {
    color: colors.foreground,
    fontFamily: fonts.display,
    fontSize: 20,
    marginBottom: 4,
  },
  welcomeSub: { color: colors.mutedForeground, fontSize: 14, marginBottom: 22 },
  label: {
    color: colors.secondaryForeground,
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 6,
    marginTop: 10,
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
  eyeBtn: { position: "absolute", right: 14, padding: 4 },
  forgotWrap: { alignSelf: "flex-end", marginTop: 10, marginBottom: 6 },
  forgot: { color: colors.primary, fontSize: 12, fontWeight: "600" },
  errorBox: {
    marginTop: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 18,
    backgroundColor: "rgba(217,28,28,0.12)",
    borderWidth: 1,
    borderColor: "rgba(217,28,28,0.35)",
  },
  errorText: { color: colors.danger, fontSize: 14 },
  loginBtn: {
    marginTop: 18,
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  loginBtnText: {
    color: "#fff",
    fontFamily: fonts.display,
    fontSize: 16,
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginVertical: 20,
  },
  dividerLine: { flex: 1, height: 1, backgroundColor: colors.borderStrong },
  dividerText: { color: colors.mutedForeground, fontSize: 12 },
  socialBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 13,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: colors.borderStrong,
    backgroundColor: colors.card,
  },
  socialIcon: {
    color: colors.foreground,
    fontFamily: fonts.display,
    fontWeight: "700",
  },
  socialText: { color: colors.foreground, fontSize: 14, fontWeight: "600" },
  registerRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },
  registerText: { color: colors.mutedForeground, fontSize: 14 },
  registerLink: { color: colors.primary, fontSize: 14, fontWeight: "700" },
});
