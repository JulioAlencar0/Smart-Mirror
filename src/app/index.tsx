import { Outfit_700Bold, useFonts } from "@expo-google-fonts/outfit";
import { Image } from "expo-image";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Index() {
  const [fontsLoaded] = useFonts({
    Outfit_700Bold,
  });

  if (!fontsLoaded) {
    return null; // ou um <View> de loading/splash
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../../assets/images/icon.svg")}
          style={styles.icon}
          contentFit="contain"
        />
        <Image
          source={require("../../assets/images/iconText.svg")}
          style={styles.logo}
          contentFit="contain"
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.Text}>Bem vindo de Volta</Text>
        <Text style={styles.Text2}>
          Acesse sua conta para monitorar seus alunos
        </Text>
        <Text style={styles.inputLabel}>E-MAIL</Text>
        <TextInput
          style={styles.inputEmail}
          placeholder="diego@smartmirror.app"
        />
        <Text style={styles.inputLabel}>SENHA</Text>
        <View style={styles.passwordWrapper}>
          <TextInput
            style={styles.inputSenha}
            placeholder="********"
            secureTextEntry={true}
          />
          <TouchableOpacity style={styles.eyeButton}>
            <Image
              source={require("../../assets/images/eye.svg")}
              style={styles.iconEye}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Text style={styles.forgot}>Esqueceu sua senha?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.login}>Entrar</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.others}>
        <Image
          source={require("../../assets/images/line.svg")}
          style={styles.othersImage}
          contentFit="contain"
        />
        <Text style={styles.dividerText}>ou entre com</Text>
        <Image
          source={require("../../assets/images/line.svg")}
          style={styles.othersImage}
          contentFit="contain"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#111111",
  },
  header: {
    alignItems: "center",
  },
  icon: {
    marginTop: 53.09,
    width: 150,
    height: 150,
  },
  logo: {
    width: 250,
    height: undefined,
    aspectRatio: 5,
  },
  content: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 20, // opcional, dá um respiro da borda
  },
  Text: {
    marginTop: 50,
    color: "#FFFFFF",
    fontFamily: "Outfit_700Bold",
    fontSize: 24,
    width: "100%",
  },
  Text2: {
    marginTop: 8,
    color: "#707070",
    fontFamily: "Outfit_400Regular",
    fontSize: 16,
    width: "100%",
  },
  inputLabel: {
    color: "#707070",
    fontFamily: "Outfit_700Bold",
    fontSize: 15,
    marginTop: 20,
  },
  inputEmail: {
    height: 56,
    fontSize: 14,
    paddingHorizontal: 15,
    color: "#707070",
    marginTop: 5,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderColor: "#707070",
    borderWidth: 0.3,
    borderRadius: 17,
  },
  inputSenha: {
    height: 56,
    fontSize: 14,
    paddingHorizontal: 15,
    color: "#707070",
    marginTop: 5,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderColor: "#707070",
    borderWidth: 0.3,
    borderRadius: 17,
  },
  passwordWrapper: {
    width: "100%",
    position: "relative",
    justifyContent: "center",
  },
  eyeButton: {
    position: "absolute",
    right: 18,
    top: 3,
    height: "100%",
    justifyContent: "center",
  },
  iconEye: {
    width: 20,
    height: 20,
  },
  forgot: {
    marginTop: 10,
    color: "#ad1b1b",
    fontFamily: "Outfit_700Bold",
    fontSize: 14,
    textAlign: "right",
  },
  login: {
    color: "#FFFFFF",
    fontFamily: "Outfit_700Bold",
    fontSize: 22,
  },
  loginButton: {
    width: "100%",
    height: 66,
    backgroundColor: "#ad1b1b",
    borderRadius: 17,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  dividerText: {
    color: "#707070",
    fontFamily: "Outfit_400Regular",
    fontSize: 16,
    textAlign: "center",
  },
  others: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 0,
    width: "100%",
    marginBottom: 50,
    paddingHorizontal: 20,
  },
  othersImage: {
    flex: 1,
    height: 1,
  },
});
