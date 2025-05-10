'use client'

import { useState, useEffect } from 'react'
import { YStack, XStack, Input, Button, H1, Paragraph, Separator } from 'tamagui'

export default function PetCrud() {
  const [pets, setPets] = useState([]) // Lista de pets
  const [formData, setFormData] = useState({
    pessoa_id: '',
    nome: '',
    tipo: '',
    raca: '',
    data_nascimento: '',
    observacoes: '',
  })
  const [editingPetId, setEditingPetId] = useState(null) // ID do pet em edição
  const [errorMessage, setErrorMessage] = useState('')

  // Função para buscar todos os pets
  const fetchPets = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/pets', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })
      if (response.ok) {
        const data = await response.json()
        setPets(data)
      } else {
        console.error('Erro ao buscar pets.')
      }
    } catch (error) {
      console.error('Erro ao buscar pets:', error)
    }
  }

  // Função para criar ou atualizar um pet
  const handleSubmit = async () => {
    const method = editingPetId ? 'PATCH' : 'POST'
    const url = editingPetId
      ? `/api/pets/${editingPetId}/update`
      : '/api/pets/new-pet'

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setFormData({
          pessoa_id: '',
          nome: '',
          tipo: '',
          raca: '',
          data_nascimento: '',
          observacoes: '',
        })
        setEditingPetId(null)
        fetchPets() // Atualiza a lista de pets
      } else {
        setErrorMessage('Erro ao salvar o pet. Tente novamente.')
      }
    } catch (error) {
      console.error('Erro ao salvar o pet:', error)
    }
  }

  // Função para deletar um pet
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/pets/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        fetchPets() // Atualiza a lista de pets
      } else {
        console.error('Erro ao deletar o pet.')
      }
    } catch (error) {
      console.error('Erro ao deletar o pet:', error)
    }
  }

  // Função para carregar os dados de um pet no formulário para edição
  const handleEdit = (pet) => {
    setFormData({
      pessoa_id: pet.pessoa_id,
      nome: pet.nome,
      tipo: pet.tipo,
      raca: pet.raca,
      data_nascimento: pet.data_nascimento,
      observacoes: pet.observacoes,
    })
    setEditingPetId(pet.id)
  }

  useEffect(() => {
    fetchPets()
  }, [])

  return (
    <YStack p="$4">
      <H1>Gerenciamento de Pets</H1>
      <Separator mb="$4" />

      {/* Formulário */}
      <YStack space="$4" mb="$6">
        <Input
          placeholder="ID da Pessoa"
          value={formData.pessoa_id}
          onChangeText={(text) => setFormData({ ...formData, pessoa_id: text })}
        />
        <Input
          placeholder="Nome do Pet"
          value={formData.nome}
          onChangeText={(text) => setFormData({ ...formData, nome: text })}
        />
        <Input
          placeholder="Tipo de Animal"
          value={formData.tipo}
          onChangeText={(text) => setFormData({ ...formData, tipo: text })}
        />
        <Input
          placeholder="Raça"
          value={formData.raca}
          onChangeText={(text) => setFormData({ ...formData, raca: text })}
        />
        <Input
          placeholder="Data de Nascimento (AAAA-MM-DD)"
          value={formData.data_nascimento}
          onChangeText={(text) =>
            setFormData({ ...formData, data_nascimento: text })
          }
        />
        <Input
          placeholder="Observações"
          value={formData.observacoes}
          onChangeText={(text) =>
            setFormData({ ...formData, observacoes: text })
          }
        />
        <Button onPress={handleSubmit}>
          {editingPetId ? 'Atualizar Pet' : 'Cadastrar Pet'}
        </Button>
      </YStack>

      {/* Lista de Pets */}
      <YStack>
        {pets.map((pet) => (
          <XStack
            key={pet.id}
            space="$4"
            p="$4"
            bg="$blue10"
            borderRadius="$4"
            mb="$3"
          >
            <YStack>
              <Paragraph>Nome: {pet.nome}</Paragraph>
              <Paragraph>Tipo: {pet.tipo}</Paragraph>
              <Paragraph>Raça: {pet.raca}</Paragraph>
              <Paragraph>Data de Nascimento: {pet.data_nascimento}</Paragraph>
              <Paragraph>Observações: {pet.observacoes}</Paragraph>
            </YStack>
            <Button onPress={() => handleEdit(pet)}>Editar</Button>
            <Button onPress={() => handleDelete(pet.id)}>Deletar</Button>
          </XStack>
        ))}
      </YStack>
    </YStack>
  )
}