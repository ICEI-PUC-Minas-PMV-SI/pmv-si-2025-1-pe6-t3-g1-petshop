import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { ArrowLeft } from "lucide-react-native";
import { useRouter } from "expo-router";

export default function PessoaRegisterPage() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmSenha, setConfirmSenha] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [tipoUsuario, setTipoUsuario] = useState("2");
  const router = useRouter();
  const handleRegister = async () => {
    if (
      !nome ||
      !email ||
      !senha ||
      !telefone ||
      !confirmSenha ||
      !tipoUsuario
    ) {
      setErrorMessage("Por favor, preencha todos os campos.");
      return;
    }

    if (senha !== confirmSenha) {
      setErrorMessage("As senhas não coincidem.");
      return;
    }

    try {
      const response = await fetch("http://petshop.goul.me/api/pessoas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          nome,
          email,
          senha,
          telefone,
          role_id: Number(tipoUsuario),
        }),
      });

      if (response.ok) {
        Alert.alert("Sucesso", "Pessoa cadastrado com sucesso.", [
          {
            text: "OK",
            onPress: () => (router.push("/dashboardScreen/newPessoa")),
          },
        ]);
      } else {
        setErrorMessage("Erro ao realizar cadastro. Tente novamente.");
      }
    } catch (error) {
      setErrorMessage(
        "Erro ao tentar realizar cadastro. Tente novamente mais tarde."
      );
    }
  };

  const handleRedirectToPessoas = () => {
    router.push("/dashboardScreen/pessoas");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleRedirectToPessoas}>
          <ArrowLeft size={26} color="#0050b3" />
        </TouchableOpacity>
        <Text style={styles.title}>Nova Pessoa</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Nome Completo"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Telefone"
        value={telefone}
        onChangeText={setTelefone}
        keyboardType="phone-pad"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <TextInput
        style={styles.input}
        placeholder="Confirmar Senha"
        value={confirmSenha}
        onChangeText={setConfirmSenha}
        secureTextEntry
      />

      <View style={styles.pessoaTypeContainer}>
        <TouchableOpacity
          style={[
            styles.pessoaTypeButton,
            tipoUsuario === "1" && styles.pessoaTypeButtonSelected,
          ]}
          onPress={() => setTipoUsuario("1")}
        >
          <Text
            style={[
              styles.pessoaTypeText,
              tipoUsuario === "1" && styles.pessoaTypeTextSelected,
            ]}
          >
            1 - Administrador
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.pessoaTypeButton,
            tipoUsuario === "2" && styles.pessoaTypeButtonSelected,
          ]}
          onPress={() => setTipoUsuario("2")}
        >
          <Text
            style={[
              styles.pessoaTypeText,
              tipoUsuario === "2" && styles.pessoaTypeTextSelected,
            ]}
          >
            2 - Pessoa
          </Text>
        </TouchableOpacity>
      </View>

      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}

      <TouchableOpacity style={styles.submitButton} onPress={handleRegister}>
        <Text style={styles.submitButtonText}>Cadastrar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
      header: {
    width: '100%',
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 0,
    top: '40%',
    transform: [{ translateY: -13 }], 
    paddingHorizontal: 16
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
    color: "#0050b3"
  },
  input: {
    borderWidth: 1,
    borderColor: "#0050b3",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  pessoaTypeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  pessoaTypeButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#0050b3",
    borderRadius: 8,
    padding: 12,
    marginHorizontal: 4,
    alignItems: "center",
  },
  pessoaTypeButtonSelected: {
    backgroundColor: "#0050b3",
  },
  pessoaTypeText: {
    color: "#0050b3",
  },
  pessoaTypeTextSelected: {
    color: "#fff",
  },
  errorText: {
    color: "#FF0000",
    textAlign: "center",
    marginBottom: 12,
  },
  submitButton: {
    backgroundColor: "#0050b3",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
