import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function UserEditScreen() {
  const router = useRouter();
  const { id: userId } = useLocalSearchParams();

  const [pessoa, setPessoa] = useState("");
  const [profissional, setProfissional] = useState("");
  const [pet, setPet] = useState("");
  const [servico, setServico] = useState("");
  const [data_agendamento, setDataAgendamento] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setErrorMessage('ID de usuário não fornecido');
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await fetch(`http://10.0.2.2:3001/api/schedule/get/${userId}`, { //schedule/get ou users/${userId}
          method: 'GET',
          credentials: 'include',
        });
        if (!res.ok) throw new Error('Erro ao carregar Agendamento');
        const data = await res.json();
        setPessoa(data.pessoa);
        setProfissional(data.profissional);
        setPet(data.pet);
        setServico(data.servico);
        setDataAgendamento(data.data_agendamento);
      } catch (err) {
        console.error('Erro ao carregar agendamento:', err);
        setErrorMessage('Erro ao carregar dados do agendamento.');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  const handleEdit = async () => {
    setErrorMessage('');

    // Validação do formato da data
    const dataRegex = /^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}$/
    if (!dataRegex.test(data_agendamento)) {
    setErrorMessage('Data inválida. Use o formato dd/mm/yyyy hh:mm.')
    return
    }

    const [dataParte, horaParte] = data_agendamento.split(' ')
    const [dia, mes, ano] = dataParte.split('/')
    const dataFormatada = `${ano}-${mes}-${dia}T${horaParte}:00`
    try {
      const response = await fetch(`http://10.0.2.2:3001/api/schedule/update/${userId}`, { //schedule/update/{id} ou users/${userId}/update
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ pessoa, profissional, pet, data_agendamento:dataFormatada }),
      });

      if (response.ok) {
        router.back();
      } else {
        setErrorMessage('Erro ao atualizar agendamento. Tente novamente.');
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
      <Text style={styles.title}>Editar Agendamento – id {userId}</Text>

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
      />

      <TextInput
        style={styles.input}
        placeholder="Serviço"
        value={servico}
        onChangeText={setServico}
      />

      <TextInput
        style={styles.input}
        placeholder="Data agendamento"
        value={data_agendamento}
        onChangeText={setDataAgendamento}
      />

      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

      <View style={styles.buttonWrapper}>
        <Button title="Confirmar edição" onPress={handleEdit} color="#0050b3" />
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
