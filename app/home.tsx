import { router } from "expo-router";
import { useState } from "react";
import {
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { IBell, IGrid, IMonitor, IUser } from "../src/components/Icons";
import { useAlertas } from "../src/hooks/useAlertas";
import { useAlunos } from "../src/hooks/useAlunos";
import { useSessoesHoje } from "../src/hooks/useSessoesHoje";
import { getUsuario, sair } from "../src/services/api";
import { colors } from "../src/theme";
import { Screen } from "../src/types";

import AlertsScreen from "../src/screens/AlertsScreen";
import Dashboard from "../src/screens/Dashboard";
import Monitor from "../src/screens/Monitor";
import Profile from "../src/screens/Profile";
import StudentDetail from "../src/screens/StudentDetail";

export default function Home({ onLogout }: { onLogout?: () => void }) {
  const [screen, setScreen] = useState<Screen>("dashboard");
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(
    null,
  );

  // Tudo abaixo vem da API e atualiza sozinho
  const {
    alerts,
    loading: loadingAlertas,
    error: erroAlertas,
    resolver,
    recarregar: recarregarAlertas,
  } = useAlertas();
  const {
    students,
    loading: loadingAlunos,
    error: erroAlunos,
    recarregar: recarregarAlunos,
  } = useAlunos();
  const { sessoes } = useSessoesHoje();

  // Guardamos só o id; assim o detalhe sempre mostra os dados mais recentes
  const selectedStudent =
    students.find((s) => s.id === selectedStudentId) ?? null;

  const nomeUsuario = getUsuario()?.nome ?? "";

  const resolveAlert = async (id: string) => {
    await resolver(id);
    recarregarAlunos(); // o status do aluno pode ter voltado para "Correto"
  };

  const logout = async () => {
    await sair(); // apaga o token salvo no aparelho
    setScreen("dashboard");
    setSelectedStudentId(null);
    if (onLogout) {
      onLogout();
    } else {
      router.replace("/");
    }
  };

  const unresolvedCount = alerts.filter((a) => !a.resolved).length;
  const errorCount = students.filter((s) => s.status === "danger").length;

  const NAV: { id: Screen; label: string; Icon: typeof IGrid }[] = [
    { id: "dashboard", label: "Início", Icon: IGrid },
    { id: "monitor", label: "Monitorar", Icon: IMonitor },
    { id: "alerts", label: "Alertas", Icon: IBell },
    { id: "profile", label: "Perfil", Icon: IUser },
  ];

  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          {screen === "dashboard" && (
            <Dashboard
              students={students}
              alerts={alerts}
              sessoes={sessoes}
              userName={nomeUsuario}
              onNav={setScreen}
            />
          )}
          {screen === "monitor" && (
            <Monitor
              students={students}
              loading={loadingAlunos}
              error={erroAlunos}
              onSelectStudent={(s) => setSelectedStudentId(s.id)}
            />
          )}
          {screen === "alerts" && (
            <AlertsScreen
              alerts={alerts}
              onResolve={resolveAlert}
              loading={loadingAlertas}
              error={erroAlertas}
              onRefresh={recarregarAlertas}
            />
          )}
          {screen === "profile" && (
            <Profile
              students={students}
              onLogout={logout}
              onStudentsChanged={recarregarAlunos}
            />
          )}
          {selectedStudent && (
            <StudentDetail
              student={selectedStudent}
              alerts={alerts}
              onResolve={resolveAlert}
              onClose={() => setSelectedStudentId(null)}
            />
          )}
        </View>

        <View style={styles.bottomNav}>
          {NAV.map((item) => {
            const isActive = screen === item.id;
            const badge =
              item.id === "alerts"
                ? unresolvedCount
                : item.id === "monitor"
                  ? errorCount
                  : 0;
            const color = isActive ? colors.primary : colors.mutedForeground;
            return (
              <TouchableOpacity
                key={item.id}
                onPress={() => {
                  setScreen(item.id);
                  setSelectedStudentId(null);
                }}
                style={styles.navItem}
              >
                <item.Icon size={20} color={color} />
                <Text style={[styles.navLabel, { color }]}>{item.label}</Text>
                {badge > 0 && (
                  <View style={styles.navBadge}>
                    <Text style={styles.navBadgeText}>{badge}</Text>
                  </View>
                )}
                {isActive && <View style={styles.navDot} />}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  bottomNav: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingTop: 8,
    paddingBottom: Platform.OS === "ios" ? 4 : 10,
    backgroundColor: colors.card,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    gap: 4,
    paddingVertical: 4,
  },
  navLabel: { fontSize: 11, fontWeight: "500" },
  navBadge: {
    position: "absolute",
    top: -2,
    right: "22%",
    width: 16,
    height: 16,
    borderRadius: 999,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  navBadgeText: { color: "#fff", fontSize: 9, fontWeight: "900" },
  navDot: {
    position: "absolute",
    bottom: -4,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.primary,
  },
});
