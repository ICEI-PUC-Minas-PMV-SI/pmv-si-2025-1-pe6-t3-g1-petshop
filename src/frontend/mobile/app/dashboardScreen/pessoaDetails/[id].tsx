import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Trash2, Pencil } from "lucide-react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

export default function PessoaDetailsScreen() {
  const { id: pessoaId } = useLocalSearchParams();
  const router = useRouter();

  interface Pessoa {
    id: number;
    nome: string;
    email: string;
    telefone: string;
    created_at: string;
    updated_at: string;
  }

  const [pessoa, setPessoa] = useState<Pessoa | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!pessoaId) {
      setError("ID da pessoa não fornecido");
      setLoading(false);
      return;
    }

    fetch(`http://petshop.goul.me/api/pessoas/${pessoaId}`, {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar pessoa");
        return res.json();
      })
      .then((data) => setPessoa(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [pessoaId]);

  const handleDeletePessoa = () => {
    if (!pessoaId) return;
    fetch(`http://petshop.goul.me/api/pessoas/${pessoaId}/delete`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao deletar pessoa");
        router.back();
      })
      .catch((err) => setError(err.message));
  };

  const showDeleteAlert = () => {
    Alert.alert(
      "Deletar Pessoa",
      "Você tem certeza que deseja deletar esta pessoa?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "OK", onPress: () => handleDeletePessoa() },
      ],
      { cancelable: false }
    );
  };

  const handleRedirectToEditPessoa = () => {
    router.push(`/dashboardScreen/editPessoa/${pessoaId}`);
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0050b3" />
      </View>
    );
  }

  if (error || !pessoa) {
    return (
      <View style={[styles.centered, styles.container]}>
        <Text style={styles.errorText}>
          {error || "Pessoa não encontrado"}
        </Text>
        <View style={styles.buttonWrapper}>
          <Button
            title="Voltar"
            onPress={() => router.back()}
            color="#0050b3"
          />
        </View>
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={[styles.container, styles.contentContainer]}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Detalhes de {pessoa.nome}</Text>
        <TouchableOpacity>
          <Pencil onPress={handleRedirectToEditPessoa} color={"#0050b3"} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Trash2 onPress={showDeleteAlert} color={"#0050b3"} />
        </TouchableOpacity>
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>ID:</Text>
        <Text style={styles.value}>{pessoa.id}</Text>
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Nome:</Text>
        <Text style={styles.value}>{pessoa.nome}</Text>
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{pessoa.email}</Text>
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Telefone:</Text>
        <Text style={styles.value}>{pessoa.telefone}</Text>
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Criado em:</Text>
        <Text style={styles.value}>
          {new Date(pessoa.created_at).toLocaleString()}
        </Text>
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Atualizado em:</Text>
        <Text style={styles.value}>
          {new Date(pessoa.updated_at).toLocaleString()}
        </Text>
      </View>

      <View style={styles.buttonWrapper}>
        <Button
          title="Voltar"
          onPress={() => router.back()}
          color="#0050b3"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: "#F0F8FF",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
  },
  contentContainer: {
    justifyContent: "center",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0050b3",
    textAlign: "center",
    marginBottom: 24,
  },
  field: {
    flexDirection: "row",
    marginBottom: 12,
  },
  label: {
    fontWeight: "600",
    color: "#333",
    width: 100,
  },
  value: {
    flex: 1,
    color: "#333",
  },
  errorText: {
    color: "#D00",
    textAlign: "center",
    marginBottom: 16,
  },
  buttonWrapper: {
    marginTop: 16,
    width: "60%",
    alignSelf: "center",
    backgroundColor: "#0050b3",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 6,
  },
});
