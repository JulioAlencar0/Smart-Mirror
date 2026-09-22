import { router } from "expo-router";
import LoginScreen from "../src/screens/LoginScreen";

export default function Index() {
  return (
    <LoginScreen
      onLogin={() => {
        router.replace("/home");
      }}
    />
  );
}
