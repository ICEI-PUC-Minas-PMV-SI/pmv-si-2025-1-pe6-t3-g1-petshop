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

export default function PetDetailsScreen() {
    const { id: petId } = useLocalSearchParams();
    const router = useRouter();

    interface Pet {
        id: number;
        pessoa_id: number;
        nome: string;
        tipo: string;
        raca: string;
        data_nascimento: string;
        observacoes: string;
        created_at: string;
        updated_at: string;
    }

    const [pet, setPet] = useState<Pet | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!petId) {
            setError("ID do pet não fornecido");
            setLoading(false);
            return;
        }

        fetch(`http://10.0.2.2:3001/api/pets/${petId}`, {
            credentials: "include",
        })
            .then((res) => {
                if (!res.ok) throw new Error("Erro ao buscar pet");
                return res.json();
            })
            .then((data) => setPet(data))
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, [petId]);

    const handleDeletePet = () => {
        if (!petId) return;
        fetch(`http://10.0.2.2:3001/api/pets/${petId}/delete`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        })
            .then((res) => {
                if (!res.ok) throw new Error("Erro ao deletar pet");
                router.back();
            })
            .catch((err) => setError(err.message));
    };

    const showDeleteAlert = () => {
        Alert.alert(
            "Deletar Pet",
            "Você tem certeza que deseja deletar este pet?",
            [
                { text: "Cancelar", style: "cancel" },
                { text: "OK", onPress: () => handleDeletePet() },
            ],
            { cancelable: false }
        );
    };

    const handleRedirectToEditPet = () => {
        router.push(`/dashboardScreen/editPet/${petId}`);
    };

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#0050b3" />
            </View>
        );
    }

    if (error || !pet) {
        return (
            <View style={[styles.centered, styles.container]}>
                <Text style={styles.errorText}>
                    {error || "Pet não encontrado"}
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
                <Text style={styles.title}>Detalhes do Pet</Text>
                <TouchableOpacity>
                    <Pencil onPress={handleRedirectToEditPet} color={"#0050b3"} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Trash2 onPress={showDeleteAlert} color={"#0050b3"} />
                </TouchableOpacity>
            </View>

            <View style={styles.field}>
                <Text style={styles.label}>Nome:</Text>
                <Text style={styles.value}>{pet.nome}</Text>
            </View>

            <View style={styles.field}>
                <Text style={styles.label}>Tipo:</Text>
                <Text style={styles.value}>{pet.tipo}</Text>
            </View>

            <View style={styles.field}>
                <Text style={styles.label}>Raça:</Text>
                <Text style={styles.value}>{pet.raca}</Text>
            </View>

            <View style={styles.field}>
                <Text style={styles.label}>Data de Nascimento:</Text>
                <Text style={styles.value}>{pet.data_nascimento}</Text>
            </View>

            <View style={styles.field}>
                <Text style={styles.label}>Observações:</Text>
                <Text style={styles.value}>{pet.observacoes}</Text>
            </View>

            <View style={styles.field}>
                <Text style={styles.label}>ID:</Text>
                <Text style={styles.value}>{pet.id}</Text>
            </View>

            <View style={styles.field}>
                <Text style={styles.label}>ID Pessoa:</Text>
                <Text style={styles.value}>{pet.pessoa_id}</Text>
            </View>

            <View style={styles.field}>
                <Text style={styles.label}>Criado em:</Text>
                <Text style={styles.value}>
                    {new Date(pet.created_at).toLocaleString()}
                </Text>
            </View>

            <View style={styles.field}>
                <Text style={styles.label}>Atualizado em:</Text>
                <Text style={styles.value}>
                    {new Date(pet.updated_at).toLocaleString()}
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
        width: 120,
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