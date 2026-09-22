import { router } from "expo-router";
import { useCallback, useEffect, useState } from "react";
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
import { ALERT_POOL, INITIAL_ALERTS, INITIAL_STUDENTS } from "../src/data";
import { colors } from "../src/theme";
import { AlertItem, Screen, Student } from "../src/types";

import AlertsScreen from "../src/screens/AlertsScreen";
import Dashboard from "../src/screens/Dashboard";
import Monitor from "../src/screens/Monitor";
import Profile from "../src/screens/Profile";
import StudentDetail from "../src/screens/StudentDetail";

let alertIdCounter = 10;

export default function Home() {
  const [screen, setScreen] = useState<Screen>("dashboard");
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [alerts, setAlerts] = useState<AlertItem[]>(INITIAL_ALERTS);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const triggerAlert = useCallback(() => {
    const pick = ALERT_POOL[Math.floor(Math.random() * ALERT_POOL.length)];
    const eligible = students.filter((s) => s.status !== "resting");
    if (!eligible.length) return;
    const student = eligible[Math.floor(Math.random() * eligible.length)];
    setAlerts((prev) => [
      {
        id: `a${++alertIdCounter}`,
        studentId: student.id,
        studentName: student.name,
        exercise: pick.exercise,
        error: pick.error,
        severity: pick.severity,
        time: "agora",
        resolved: false,
        detail: pick.detail,
      },
      ...prev.slice(0, 14),
    ]);
    setStudents((prev) =>
      prev.map((s) =>
        s.id === student.id ? { ...s, status: pick.severity } : s,
      ),
    );
  }, [students]);

  useEffect(() => {
    const t = setInterval(triggerAlert, 12000);
    return () => clearInterval(t);
  }, [triggerAlert]);

  useEffect(() => {
    const t = setInterval(() => {
      setStudents((prev) =>
        prev.map((s) =>
          s.status === "resting"
            ? s
            : { ...s, reps: s.reps < s.targetReps ? s.reps + 1 : 0 },
        ),
      );
    }, 3000);
    return () => clearInterval(t);
  }, []);

  const resolveAlert = (id: string) => {
    const alert = alerts.find((a) => a.id === id);
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, resolved: true } : a)),
    );
    if (alert) {
      setStudents((prev) =>
        prev.map((s) =>
          s.id === alert.studentId ? { ...s, status: "ok" } : s,
        ),
      );
    }
  };

  const logout = () => {
    setScreen("dashboard");
    setSelectedStudent(null);
    setAlerts(INITIAL_ALERTS);
    setStudents(INITIAL_STUDENTS);
    router.replace("/");
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
            <Dashboard students={students} alerts={alerts} onNav={setScreen} />
          )}
          {screen === "monitor" && (
            <Monitor students={students} onSelectStudent={setSelectedStudent} />
          )}
          {screen === "alerts" && (
            <AlertsScreen alerts={alerts} onResolve={resolveAlert} />
          )}
          {screen === "profile" && (
            <Profile students={students} onLogout={logout} />
          )}
          {selectedStudent && (
            <StudentDetail
              student={selectedStudent}
              onClose={() => setSelectedStudent(null)}
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
                  setSelectedStudent(null);
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
