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

export default function PetEditScreen() {
    const router = useRouter();
    const { id: petId } = useLocalSearchParams();

    const [nome, setNome] = useState('');
    const [tipo, setTipo] = useState('');
    const [raca, setRaca] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [observacoes, setObservacoes] = useState('');
    const [pessoaId, setPessoaId] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!petId) {
            setErrorMessage('ID do pet não fornecido');
            setLoading(false);
            return;
        }

        const fetchPet = async () => {
            try {
                const res = await fetch(`http://10.0.2.2:3001/api/pets/${petId}`, {
                    method: 'GET',
                    credentials: 'include',
                });
                if (!res.ok) throw new Error('Erro ao carregar pet');
                const data = await res.json();
                setNome(data.nome);
                setTipo(data.tipo);
                setRaca(data.raca);
                setDataNascimento(data.data_nascimento);
                setObservacoes(data.observacoes);
                setPessoaId(data.pessoa_id?.toString() || '');
            } catch (err) {
                setErrorMessage('Erro ao carregar dados do pet.');
            } finally {
                setLoading(false);
            }
        };

        fetchPet();
    }, [petId]);

    const handleEdit = async () => {
        setErrorMessage('');
        try {
            const response = await fetch(`http://10.0.2.2:3001/api/pets/${petId}/update`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
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
                router.back();
            } else {
                setErrorMessage('Erro ao atualizar pet. Tente novamente.');
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
            <Text style={styles.title}>Editar Pet – id {petId}</Text>

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

            {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

            <View style={styles.buttonWrapper}>
                <Button title="Salvar Alterações" onPress={handleEdit} color="#0050b3" />
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