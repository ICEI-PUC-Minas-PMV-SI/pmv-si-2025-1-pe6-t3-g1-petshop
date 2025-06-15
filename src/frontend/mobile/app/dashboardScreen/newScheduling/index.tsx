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

export default function UserRegisterPage() {
  const [pessoa, setPessoa] = useState("");
  const [profissional, setProfissional] = useState("");
  const [pet, setPet] = useState("");
  const [servico, setServico] = useState("");
  const [data_agendamento, setDataAgendamento] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  //const [tipoUsuario, setTipoUsuario] = useState("2");
  const router = useRouter();

  const handleRegister = async () => {
    if (
      !pessoa ||
      !profissional ||
      !pet ||
      !servico ||
      !data_agendamento
    ) {
      setErrorMessage("Por favor, preencha todos os campos.");
      return;
    }

    /*if (senha !== confirmSenha) {
      setErrorMessage("As senhas não coincidem.");
      return;
    }
*/
  // Validação do formato da data
  const dataRegex = /^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}$/
  if (!dataRegex.test(data_agendamento)) {
    setErrorMessage('Data inválida. Use o formato dd/mm/yyyy.')
    return
  }

  // Converte para ISO antes de enviar (ex: "2025-05-10")
  const [dataParte, horaParte] = data_agendamento.split(' ')
  const [dia, mes, ano] = dataParte.split('/')
  const dataFormatada = `${ano}-${mes}-${dia}T${horaParte}:00`

    try {
      const response = await fetch("http://10.0.2.2:3001/api/schedule/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          pessoa,
          profissional,
          pet,
          servico,
          data_agendamento: dataFormatada,
        }),
      });

      if (response.ok) {
        Alert.alert("Sucesso", "Agendamento cadastrado com sucesso.", [
          {
            text: "OK",
            onPress: () => (router.push("/dashboardScreen/scheduling")),
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

  const handleRedirectToUsers = () => {
    router.push("/dashboardScreen/scheduling");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleRedirectToUsers}>
          <ArrowLeft size={26} color="#0050b3" />
        </TouchableOpacity>
        <Text style={styles.title}>Novo Agendamento</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Pessoa"
        value={pessoa}
        onChangeText={setPessoa}
      />

      <TextInput
        style={styles.input}
        placeholder="Profissional"
        value={profissional}
        onChangeText={setProfissional}
      />

      <TextInput
        style={styles.input}
        placeholder="Pet"
        value={pet}
        onChangeText={setPet}
        //autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Serviço"
        value={servico}
        onChangeText={setServico}
      />

      <TextInput
        style={styles.input}
        placeholder="Data (dd/mm/yyyy hh:mm)"
        value={data_agendamento}
        onChangeText={setDataAgendamento}
      />

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
  userTypeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  userTypeButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#0050b3",
    borderRadius: 8,
    padding: 12,
    marginHorizontal: 4,
    alignItems: "center",
  },
  userTypeButtonSelected: {
    backgroundColor: "#0050b3",
  },
  userTypeText: {
    color: "#0050b3",
  },
  userTypeTextSelected: {
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
