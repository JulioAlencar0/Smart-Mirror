import { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import { IEye, IEyeOff, LogoMark } from "../components/Icons";
import { cadastrar } from "../services/api";
import { colors, fonts } from "../theme";

// Os valores seguem o ENUM tipo_perfil_enum do banco ('ALUNO' | 'PERSONAL')
export type Perfil = "PERSONAL" | "ALUNO";

export type DadosCadastro = {
  nome: string;
  email: string;
  senha: string;
  perfil: Perfil;
};

const PERFIS: { value: Perfil; label: string }[] = [
  { value: "PERSONAL", label: "Personal" },
  { value: "ALUNO", label: "Aluno" },
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function AppleIcon({
  size = 18,
  color = "#fff",
}: {
  size?: number;
  color?: string;
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        fill={color}
        d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
      />
    </Svg>
  );
}

export default function RegisterScreen({
  onRegister,
  onGoToLogin,
}: {
  onRegister: (dados: DadosCadastro) => void;
  onGoToLogin?: () => void;
}) {
  const [perfil, setPerfil] = useState<Perfil>("PERSONAL");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handle = async () => {
    if (!nome.trim() || !email.trim() || !password) {
      setError("Preencha nome, e-mail e senha.");
      return;
    }
    if (!EMAIL_REGEX.test(email.trim())) {
      setError("Informe um e-mail válido.");
      return;
    }
    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      await cadastrar({
        nome: nome.trim(),
        email: email.trim(),
        senha: password,
        perfil,
      });
      onRegister({
        nome: nome.trim(),
        email: email.trim(),
        senha: password,
        perfil,
      });
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
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
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.welcome}>Crie sua conta</Text>
          <Text style={styles.welcomeSub}>
            Preencha os dados abaixo para começar
          </Text>

          <Text style={styles.label}>Tipo de conta</Text>
          <View style={styles.perfilRow}>
            {PERFIS.map((p) => {
              const ativo = perfil === p.value;
              return (
                <TouchableOpacity
                  key={p.value}
                  onPress={() => setPerfil(p.value)}
                  activeOpacity={0.8}
                  accessibilityRole="radio"
                  accessibilityState={{ selected: ativo }}
                  style={[styles.perfilBtn, ativo && styles.perfilBtnActive]}
                >
                  <View
                    style={[
                      styles.radioOuter,
                      ativo && styles.radioOuterActive,
                    ]}
                  >
                    {ativo && <View style={styles.radioInner} />}
                  </View>
                  <Text
                    style={[
                      styles.perfilText,
                      ativo && styles.perfilTextActive,
                    ]}
                  >
                    {p.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <Text style={styles.label}>Nome</Text>
          <TextInput
            value={nome}
            onChangeText={setNome}
            placeholder="Seu nome completo"
            placeholderTextColor={colors.mutedForeground}
            autoCapitalize="words"
            style={[
              styles.input,
              { borderColor: nome ? colors.primary : colors.borderStrong },
            ]}
          />

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
          <Text style={styles.hint}>Mínimo de 6 caracteres</Text>

          {!!error && (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}

          <TouchableOpacity
            onPress={handle}
            disabled={loading}
            style={[
              styles.registerBtn,
              {
                backgroundColor: loading
                  ? "rgba(217,28,28,0.5)"
                  : colors.primary,
              },
            ]}
          >
            {loading ? (
              <View style={styles.loadingRow}>
                <ActivityIndicator color="#fff" size="small" />
                <Text style={styles.registerBtnText}>Criando conta…</Text>
              </View>
            ) : (
              <Text style={styles.registerBtnText}>Criar conta</Text>
            )}
          </TouchableOpacity>

          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>ou cadastre-se com</Text>
            <View style={styles.dividerLine} />
          </View>

          <View style={{ flexDirection: "row", gap: 12 }}>
            <TouchableOpacity style={styles.socialBtn}>
              <Text style={styles.socialIcon}>G</Text>
              <Text style={styles.socialText}>Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialBtn}>
              <AppleIcon size={18} color={colors.foreground} />
              <Text style={styles.socialText}>Apple</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.loginRow}>
            <Text style={styles.loginText}>Já tem conta? </Text>
            <TouchableOpacity onPress={onGoToLogin}>
              <Text style={styles.loginLink}>Entrar</Text>
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
    marginTop: 60,
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
  perfilRow: { flexDirection: "row", gap: 12 },
  perfilBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingVertical: 13,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: colors.borderStrong,
    backgroundColor: colors.card,
  },
  perfilBtnActive: {
    borderColor: colors.primary,
    backgroundColor: "rgba(217,28,28,0.12)",
  },
  radioOuter: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: colors.borderStrong,
    alignItems: "center",
    justifyContent: "center",
  },
  radioOuterActive: { borderColor: colors.primary },
  radioInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  perfilText: {
    color: colors.secondaryForeground,
    fontSize: 14,
    fontWeight: "600",
  },
  perfilTextActive: { color: colors.foreground },
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
  hint: { color: colors.mutedForeground, fontSize: 12, marginTop: 8 },
  errorBox: {
    marginTop: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 18,
    backgroundColor: "rgba(217,28,28,0.12)",
    borderWidth: 1,
    borderColor: "rgba(217,28,28,0.35)",
  },
  errorText: { color: colors.danger, fontSize: 14 },
  registerBtn: {
    marginTop: 18,
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  registerBtnText: {
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
  loginRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },
  loginText: { color: colors.mutedForeground, fontSize: 14 },
  loginLink: { color: colors.primary, fontSize: 14, fontWeight: "700" },
});
