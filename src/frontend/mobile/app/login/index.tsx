import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";
import { SvgUri } from "react-native-svg";
import { Asset } from "expo-asset";

export default function LoginPage({ children }: { children: React.ReactNode }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !senha) {
      setErrorMessage("Por favor, preencha todos os campos.");
      return;
    }

    try {
      const response = await fetch("http://10.0.2.2:3001/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, senha }),
      });

      if (response.ok) {
        router.replace("/dashboardScreen");
      } else {
        setErrorMessage("Credenciais inválidas. Tente novamente.");
      }
    } catch (error) {
      setErrorMessage(
        "Erro ao tentar fazer login. Tente novamente mais tarde."
      );
    }
  };

  const [uri, setUri] = useState<string>();

  useEffect(() => {
    (async () => {
      const asset = Asset.fromModule(require("../assets/pet-logo.svg"));
      await asset.downloadAsync();
      setUri(asset.localUri);
    })();
  }, []);

  return (
    <SafeAreaView style={stylesHeader.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <SvgUri style={stylesHeader.logo} uri={uri}></SvgUri>
        <View style={styles.form}>
          <TextInput
            placeholder="E-mail"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            placeholder="Senha"
            style={styles.input}
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
          />

          {!!errorMessage && (
            <Text style={styles.errorText}>{errorMessage}</Text>
          )}

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  form: {
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 8,
    padding: 24,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#0050b3",
    textAlign: "center",
    marginBottom: 24,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingHorizontal: 12,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  errorText: {
    color: "#d32f2f",
    marginBottom: 12,
    fontSize: 14,
  },
  button: {
    backgroundColor: "#0050b3",
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

const stylesHeader = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  logo: {
    width: "100%",
    height: 180,
    marginBottom: 64
  },
});
