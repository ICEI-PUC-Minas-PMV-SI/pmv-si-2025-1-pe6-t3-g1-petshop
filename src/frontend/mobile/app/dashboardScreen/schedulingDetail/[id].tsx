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

const formatarData = (dataISO: string) => {
  const data = new Date(dataISO);

  const dia = String(data.getDate()).padStart(2, '0');
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const ano = data.getFullYear();

  const horas = String(data.getHours()).padStart(2, '0');
  const minutos = String(data.getMinutes()).padStart(2, '0');

  return `${dia}/${mes}/${ano} ${horas}:${minutos}`;
};


export default function UserDetailsScreen() {
  const { id: userId } = useLocalSearchParams();
  const router = useRouter();

  interface User {
    pessoa: string;
    profissional: string;
    pet: string;
    servico: string;
    data_agendamento: string;
  }

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) {
      setError("ID de agendamento não fornecido");
      setLoading(false);
      return;
    }

    fetch(`http://10.0.2.2:3001/api/schedule/get/${userId}`, { // schedule/get/{id}
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar agendamento");

        return res.json();
      })
      .then((data) => setUser(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [userId]);

  const handleDeleteUser = () => {
    if (!userId) return;
    fetch(`http://10.0.2.2:3001/api/schedule/delete/${userId}`, { // schedule/delete/{id} -- users/${userId}/delete
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao deletar agendamento");
        router.back();
        res.ok && Alert.alert("Sucesso", "Agendamento deletado com sucesso")
      })
      .catch((err) => setError(err.message));
  };

  const showDeleteAlert = () => {
    Alert.alert(
      "Deletar agendamento",
      "Você tem certeza que deseja deletar este agendamento?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "OK", onPress: () => handleDeleteUser() },
      ],
      { cancelable: false }
    );
  };


  const handleRedirectToEditUser = () => {
    router.push(`/dashboardScreen/editScheduling/${userId}`);
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
          {error || "Agendamento não encontrado"}
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
        <Text style={styles.title}>Detalhes do Agendamento</Text>
        <TouchableOpacity>
          <Pencil onPress={handleRedirectToEditUser} color={"#0050b3"} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Trash2 onPress={showDeleteAlert} color={"#0050b3"} />
        </TouchableOpacity>
        </View>


      <View style={styles.field}>
        <Text style={styles.label}>Pessoa:</Text>
        <Text style={styles.value}>{user.pessoa}</Text>
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Profissional:</Text>
        <Text style={styles.value}>{user.profissional}</Text>
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Pet:</Text>
        <Text style={styles.value}>{user.pet}</Text>
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Servico:</Text>
        <Text style={styles.value}>{user.servico}</Text>
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Data de agendamento:</Text>
        <Text style={styles.value}>{formatarData(user.data_agendamento)}</Text>
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

  iconGroup: {
  flexDirection: "row",
  gap: 12,
  alignItems: "center",
}

});
