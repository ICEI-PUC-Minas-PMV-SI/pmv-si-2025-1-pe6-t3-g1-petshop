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

export default function UserDetailsScreen() {
  const { id: userId } = useLocalSearchParams();
  const router = useRouter();

  interface User {
    id: number;
    nome: string;
    email: string;
    telefone: string;
    created_at: string;
    updated_at: string;
  }

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) {
      setError("ID de usuário não fornecido");
      setLoading(false);
      return;
    }

    fetch(`http://10.0.2.2:3001/api/users/${userId}`, {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar usuário");
        return res.json();
      })
      .then((data) => setUser(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [userId]);

  const handleDeleteUser = () => {
    if (!userId) return;
    fetch(`http://10.0.2.2:3001/api/users/${userId}/delete`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao deletar usuário");
        router.back();
        res.ok && Alert.alert("Sucesso", "Usuário deletada com sucesso")
      })
      .catch((err) => setError(err.message));
  };

  const showDeleteAlert = () => {
    Alert.alert(
      "Deletar Usuário",
      "Você tem certeza que deseja deletar este usuário?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "OK", onPress: () => handleDeleteUser() },
      ],
      { cancelable: false }
    );
  };

  const handleRedirectToEditUser = () => {
    router.push(`/dashboardScreen/editUser/${userId}`);
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0050b3" />
      </View>
    );
  }

  if (error || !user) {
    return (
      <View style={[styles.centered, styles.container]}>
        <Text style={styles.errorText}>
          {error || "Usuário não encontrado"}
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
        <Text style={styles.title}>Detalhes do Usuário</Text>
        <TouchableOpacity>
          <Pencil onPress={handleRedirectToEditUser} color={"#0050b3"} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Trash2 onPress={showDeleteAlert} color={"#0050b3"} />
        </TouchableOpacity>
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Nome:</Text>
        <Text style={styles.value}>{user.nome}</Text>
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{user.email}</Text>
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Telefone:</Text>
        <Text style={styles.value}>{user.telefone}</Text>
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>ID:</Text>
        <Text style={styles.value}>{user.id}</Text>
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Criado em:</Text>
        <Text style={styles.value}>
          {new Date(user.created_at).toLocaleString()}
        </Text>
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Atualizado em:</Text>
        <Text style={styles.value}>
          {new Date(user.updated_at).toLocaleString()}
        </Text>
      </View>

      <View style={styles.buttonWrapper}>
        <Button
          title="Voltar para lista"
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
