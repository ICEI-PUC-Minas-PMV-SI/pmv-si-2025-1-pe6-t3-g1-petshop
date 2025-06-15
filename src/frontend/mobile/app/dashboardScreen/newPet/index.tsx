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

export default function PetRegisterPage() {
    const [pessoaId, setPessoaId] = useState("");
    const [nome, setNome] = useState("");
    const [tipo, setTipo] = useState("");
    const [raca, setRaca] = useState("");
    const [dataNascimento, setDataNascimento] = useState("");
    const [observacoes, setObservacoes] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();

    const handleRegister = async () => {
        if (!pessoaId || !nome || !tipo || !raca || !dataNascimento) {
            setErrorMessage("Por favor, preencha todos os campos obrigatórios.");
            return;
        }

        try {
            const response = await fetch("http://10.0.2.2:3001/api/pets/new-pet", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    pessoa_id: pessoaId,
                    nome,
                    tipo,
                    raca,
                    data_nascimento: dataNascimento,
                    observacoes,
                }),
            });

            if (response.ok) {
                Alert.alert("Sucesso", "Pet cadastrado com sucesso.", [
                    {
                        text: "OK",
                        onPress: () => router.push("/dashboardScreen/pets"),
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

    const handleRedirectToPets = () => {
        router.push("/dashboardScreen/pets");
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={handleRedirectToPets}>
                    <ArrowLeft size={26} color="#0050b3" />
                </TouchableOpacity>
                <Text style={styles.title}>Novo Pet</Text>
            </View>

            <TextInput
                style={styles.input}
                placeholder="ID da Pessoa"
                value={pessoaId}
                onChangeText={setPessoaId}
                keyboardType="numeric"
            />

            <TextInput
                style={styles.input}
                placeholder="Nome do Pet"
                value={nome}
                onChangeText={setNome}
            />

            <TextInput
                style={styles.input}
                placeholder="Tipo de Animal"
                value={tipo}
                onChangeText={setTipo}
            />

            <TextInput
                style={styles.input}
                placeholder="Raça"
                value={raca}
                onChangeText={setRaca}
            />

            <TextInput
                style={styles.input}
                placeholder="Data de Nascimento (AAAA-MM-DD)"
                value={dataNascimento}
                onChangeText={setDataNascimento}
            />

            <TextInput
                style={styles.input}
                placeholder="Observações"
                value={observacoes}
                onChangeText={setObservacoes}
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