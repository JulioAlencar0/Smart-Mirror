import { useState } from "react";
import LoginScreen from "../src/screens/LoginScreen";
import RegisterScreen from "../src/screens/registerScreen";
import Home from "./home";

export default function App() {
  const [tela, setTela] = useState<"login" | "register" | "home">("login");

  if (tela === "register") {
    return (
      <RegisterScreen
        onRegister={() => setTela("home")}
        onGoToLogin={() => setTela("login")}
      />
    );
  }

  if (tela === "home") {
  return <Home onLogout={() => setTela("login")} />;
}

  return (
    <LoginScreen
      onLogin={() => setTela("home")}
      onGoToRegister={() => setTela("register")}
    />
  );
}
