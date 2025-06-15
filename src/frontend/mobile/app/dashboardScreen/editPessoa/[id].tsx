import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

export default function PessoaEditScreen() {
  const router = useRouter();
  const { id: pessoaId } = useLocalSearchParams();
  const [date, setDate] = useState(new Date());

  const [nome, setNome] = useState("");
  const [cpf_cnpj, setTaxId] = useState('');
  const [tipo, setTipo] = useState('');
  const [nascimento, setNascimento] = useState('');
  const [genero, setGenero] = useState('');
  const [telefone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [endereco, setEndereco] = useState('');
  const [endereco_num, setEndNum] = useState('');
  const [cep, setCep] = useState('');

  const [show, setShow] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!pessoaId) {
      setErrorMessage('ID de pessoa não fornecido');
      setLoading(false);
      return;
    }

    const fetchPessoa = async () => {
      try {
        const res = await fetch(`http://10.0.2.2:3001/api/pessoas/${pessoaId}`, {
          method: 'GET',
          credentials: 'include',
        });
        if (!res.ok) throw new Error('Erro ao carregar pessoa');
        const data = await res.json();
        setNome(data.nome);
        setTaxId(data.cpf_cnpj);
        setTipo(data.tipo);
        setNascimento(new Date(data.nascimento).toLocaleDateString());
        setGenero(data.genero);
        setPhone(data.telefone);
        setEmail(data.email);
        setEndereco(data.endereco);
        setEndNum(data.endereco_num);
        setCep(data.cep);
      } catch (err) {
        console.error('Erro ao carregar pessoa:', err);
        setErrorMessage('Erro ao carregar dados do pessoa.');
      } finally {
        setLoading(false);
      }
    };

    fetchPessoa();
  }, [pessoaId]);

  const handleEdit = async () => {
    setErrorMessage('');
    try {
      const response = await fetch(`http://10.0.2.2:3001/api/pessoas/${pessoaId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ nome, email, telefone }),
      });

      if (response.ok) {
        router.back();
      } else {
        setErrorMessage('Erro ao atualizar pessoa. Tente novamente.');
      }
    } catch (error) {
      setErrorMessage('Erro ao tentar atualizar. Tente mais tarde.');
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0050b3" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Editar {nome}</Text>

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
            mode={'date'}
            is24Hour={true}
            display="default"
            onTouchCancel={() => setShow(false)}
            onChange={(event, date) => {
              setShow(false);
              setNascimento(moment(date).format('DD/MM/YYYY'));
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
        placeholder="Nº"
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


      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

      <View style={styles.buttonWrapper}>
        <Button title="Salvar" onPress={handleEdit} color="#0050b3" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#F0F8FF',
    justifyContent: 'center',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0050b3',
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: '#0050b3',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#fff',
    marginBottom: 12,
  },pessoaTypeContainer: {
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
    color: '#D00',
    textAlign: 'center',
    marginBottom: 12,
  },
  buttonWrapper: {
    marginTop: 16,
    width: '60%',
    alignSelf: 'center',
  },
});
