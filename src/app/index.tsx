import {
  Outfit_400Regular,
  Outfit_700Bold,
  useFonts,
} from "@expo-google-fonts/outfit";
import { Image } from "expo-image";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Index() {
  const [] = useFonts({
    Outfit_400Regular,
    Outfit_700Bold,
  });

  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [senha, setSenha] = useState("");
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsHorizontalScrollIndicator={false}
      scrollEnabled={false}
    >
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
          placeholderTextColor="#707070"
        />

        <Text style={styles.inputLabel}>SENHA</Text>
        <View style={styles.passwordWrapper}>
          <TextInput
            style={styles.inputSenha}
            placeholder="********"
            placeholderTextColor="#707070"
            secureTextEntry={!senhaVisivel}
            value={senha}
            onChangeText={setSenha}
          />
          <TouchableOpacity
            style={styles.eyeButton}
            onPress={() => setSenhaVisivel(!senhaVisivel)}
          >
            <Image
              source={
                senhaVisivel
                  ? require("../../assets/images/eye.svg")
                  : require("../../assets/images/eye-off.svg")
              }
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

      <View style={styles.othersButtons}>
        <TouchableOpacity style={styles.googleButton}>
          <Image
            source={require("../../assets/images/google.svg")}
            style={styles.googleIcon}
          />
          <Text style={styles.googleText}>Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.appleButton}>
          <Image
            source={require("../../assets/images/apple.svg")}
            style={styles.appleIcon}
          />
          <Text style={styles.appleText}>Apple</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.register}>
        <Text style={styles.registerText}>
          Não tem uma conta?{" "}
          <Text style={styles.registerLink}>Cadastre-se</Text>
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111111",
  },
  scrollContent: {
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: "center",
  },
  icon: {
    marginTop: 53,
    width: 150,
    height: 150,
  },
  logo: {
    width: 250,
    height: undefined,
    aspectRatio: 5,
  },
  content: {
    width: "100%",
  },
  Text: {
    marginTop: 30,
    color: "#FFFFFF",
    fontFamily: "Outfit_700Bold",
    fontSize: 24,
    width: "100%",
  },
  Text2: {
    marginTop: 8,
    color: "#888888",
    fontFamily: "Outfit_400Regular",
    fontSize: 16,
    width: "100%",
  },
  inputLabel: {
    color: "#888888",
    fontFamily: "Outfit_700Bold",
    fontSize: 15,
    marginTop: 20,
  },
  inputEmail: {
    height: 56,
    fontSize: 14,
    paddingHorizontal: 15,
    marginTop: 5,
    color: "#FFFFFF",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderColor: "rgba(112, 112, 112, 0.5)",
    borderWidth: 0.3,
    borderRadius: 17,
  },
  inputSenha: {
    height: 56,
    fontSize: 14,
    paddingHorizontal: 15,
    marginTop: 5,
    color: "#FFFFFF",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderColor: "rgba(112, 112, 112, 0.5)",
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
    marginTop: 30,
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
    width: "100%",
    marginTop: 30,
    marginBottom: 20,
  },
  othersImage: {
    flex: 1,
    height: 1,
  },
  othersButtons: {
    flexDirection: "row", // Alinha os botões lado a lado na horizontal
    justifyContent: "center", // Centraliza a dupla na tela
    alignItems: "center",
    width: "100%",
    gap: 20, // Cria um espaço de 15px entre o botão do Google e da Apple
  },
  googleIcon: {
    width: 17,
    height: 17,
  },
  googleText: {
    color: "#FFFFFF",
    fontFamily: "Outfit_700Bold",
    fontSize: 16,
    marginLeft: 10,
  },
  googleButton: {
    width: 160,
    height: 50,
    borderRadius: 17,
    backgroundColor: "#111111",
    borderColor: "rgba(112, 112, 112, 0.5)",
    borderWidth: 0.3,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  appleIcon: {
    width: 17,
    height: 17,
  },
  appleText: {
    color: "#FFFFFF",
    fontFamily: "Outfit_700Bold",
    fontSize: 16,
    marginLeft: 10,
  },
  appleButton: {
    width: 160,
    height: 50,
    borderRadius: 17,
    backgroundColor: "#111111",
    borderColor: "rgba(112, 112, 112, 0.5)",
    borderWidth: 0.3,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  register: {
    marginTop: 40,
    alignItems: "center",
  },
  registerText: {
    color: "#FFFFFF",
    fontFamily: "Outfit_400Regular",
    fontSize: 14,
  },
  registerLink: {
    color: "#ad1b1b",
    fontFamily: "Outfit_700Bold",
    fontSize: 14,
  },
});
