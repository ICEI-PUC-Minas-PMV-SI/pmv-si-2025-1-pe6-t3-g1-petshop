import React, { useState, useEffect } from "react";
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
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";

export default function PessoaRegisterPage() {
  const [date, setDate] = useState(new Date());

  const [nome, setNome] = useState("");
  const [cpf_cnpj, setTaxId] = useState("");
  const [tipo, setTipo] = useState("F");
  const [nascimento, setNascimento] = useState("");
  const [genero, setGenero] = useState("M");
  const [telefone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [endereco, setEndereco] = useState("");
  const [endereco_num, setEndNum] = useState("");
  const [cep, setCep] = useState("");
  const [userId, setUserId] = useState(null);

  const [show, setShow] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function loadUserId() {
      const res = await fetch("http://10.0.2.2:3001/api/perfil", {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok) {
        return;
      }
      const { id } = await res.json();
      setUserId(id);
    }

    loadUserId();
  }, []);
  const handleRegister = async () => {
    if (!nome || !cpf_cnpj || !tipo || !nascimento || !telefone || !genero) {
      setErrorMessage("Por favor, preencha todos os campos.");
      return;
    }
    const toTimestamp = (str) => {
      const [dia, mes, ano] = str.split("/").map(Number);
      const dateObj = new Date(ano, mes - 1, dia);
      return dateObj.getTime();
    };

    const timestamp = toTimestamp(nascimento);
    try {
      const response = await fetch("http://10.0.2.2:3001/api/pessoas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          nome,
          cpf_cnpj,
          tipo,
          nascimento: timestamp,
          genero,
          telefone,
          email,
          endereco,
          endereco_num,
          cep,
          user_id: userId,
        }),
      });

      if (response.ok) {
        Alert.alert("Sucesso", "Pessoa cadastrado com sucesso.", [
          {
            text: "OK",
            onPress: () => router.push("/dashboardScreen/newPessoa"),
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
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleRedirectToPessoas}
        >
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
        placeholder="CPF/CNPJ"
        value={cpf_cnpj}
        onChangeText={setTaxId}
      />

      <View style={styles.pessoaTypeContainer}>
        <TouchableOpacity
          style={[
            styles.pessoaTypeButton,
            tipo === "F" && styles.pessoaTypeButtonSelected,
          ]}
          onPress={() => setTipo("F")}
        >
          <Text
            style={[
              styles.pessoaTypeText,
              tipo === "F" && styles.pessoaTypeTextSelected,
            ]}
          >
            Fisica
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.pessoaTypeButton,
            tipo === "J" && styles.pessoaTypeButtonSelected,
          ]}
          onPress={() => setTipo("J")}
        >
          <Text
            style={[
              styles.pessoaTypeText,
              tipo === "J" && styles.pessoaTypeTextSelected,
            ]}
          >
            Juridica
          </Text>
        </TouchableOpacity>
      </View>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={"date"}
          is24Hour={true}
          display="default"
          onTouchCancel={() => setShow(false)}
          onChange={(event, date) => {
            setShow(false);
            setNascimento(moment(date).format("DD/MM/YYYY"));
          }}
        />
      )}

      <TouchableOpacity onPress={() => setShow(true)}>
        <TextInput
          style={styles.input}
          placeholder="Nascimento/Fundação"
          value={nascimento}
          editable={false}
        />
      </TouchableOpacity>

      <View style={styles.pessoaTypeContainer}>
        <TouchableOpacity
          style={[
            styles.pessoaTypeButton,
            genero === "M" && styles.pessoaTypeButtonSelected,
          ]}
          onPress={() => setGenero("M")}
        >
          <Text
            style={[
              styles.pessoaTypeText,
              genero === "M" && styles.pessoaTypeTextSelected,
            ]}
          >
            Masculino
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.pessoaTypeButton,
            genero === "F" && styles.pessoaTypeButtonSelected,
          ]}
          onPress={() => setGenero("F")}
        >
          <Text
            style={[
              styles.pessoaTypeText,
              genero === "J" && styles.pessoaTypeTextSelected,
            ]}
          >
            Feminino
          </Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Telefone"
        value={telefone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        autoCapitalize="none"
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
        placeholder="Endereço"
        value={endereco}
        onChangeText={setEndereco}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Endereço Nº"
        value={endereco_num}
        onChangeText={setEndNum}
        keyboardType="number-pad"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="CEP"
        value={cep}
        onChangeText={setCep}
        keyboardType="number-pad"
        autoCapitalize="none"
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
    width: "100%",
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  backButton: {
    position: "absolute",
    left: 0,
    top: "40%",
    transform: [{ translateY: -13 }],
    paddingHorizontal: 16,
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
    color: "#0050b3",
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
