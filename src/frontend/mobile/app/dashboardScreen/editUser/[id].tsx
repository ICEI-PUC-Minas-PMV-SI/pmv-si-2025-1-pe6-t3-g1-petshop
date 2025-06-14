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

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [senha, setSenha] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setErrorMessage('ID de usuário não fornecido');
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await fetch(`http://10.0.2.2:3001/api/users/${userId}`, {
          method: 'GET',
          credentials: 'include',
        });
        if (!res.ok) throw new Error('Erro ao carregar usuário');
        const data = await res.json();
        setNome(data.nome);
        setEmail(data.email);
        setTelefone(data.telefone);
      } catch (err) {
        console.error('Erro ao carregar usuário:', err);
        setErrorMessage('Erro ao carregar dados do usuário.');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  const handleEdit = async () => {
    setErrorMessage('');
    try {
      const response = await fetch(`http://10.0.2.2:3001/api/users/${userId}/update`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ nome, email, senha, telefone }),
      });

      if (response.ok) {
        router.back();
      } else {
        setErrorMessage('Erro ao atualizar usuário. Tente novamente.');
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
      <Text style={styles.title}>Editar Usuário – id {userId}</Text>

      <TextInput
        style={styles.input}
        placeholder="Novo nome"
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
        placeholder="Novo telefone"
        value={telefone}
        onChangeText={setTelefone}
        keyboardType="phone-pad"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Nova senha (opcional)"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
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
