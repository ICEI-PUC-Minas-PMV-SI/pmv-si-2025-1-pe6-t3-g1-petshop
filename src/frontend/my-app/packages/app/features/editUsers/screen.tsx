'use client'

import { useState } from 'react'
import { XStack, YStack, XGroup, Input, Button, H1, Paragraph, Text } from '@my/ui'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function UserEditPage() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [telefone, setTelefone] = useState('')
  const [senha, setSenha] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const searchParams = useSearchParams()
  const userId = searchParams.get('id')

  useEffect(() => {
    if (!userId) return

    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/users/${userId}`)
        const data = await res.json()
        setNome(data.nome)
        setEmail(data.email)
        setTelefone(data.telefone)
      } catch (err) {
        console.error('Erro ao carregar usuário:', err)
        setErrorMessage('Erro ao carregar dados do usuário.')
      }
    }

    fetchUser()
  }, [userId])

  const handleEdit = async () => {
    if (!nome || !email || !senha || !telefone) {
      setErrorMessage('Por favor, preencha todos os campos.')
      return
    }

    try {
      const response = await fetch(`/api/users/${userId}/update`, {
        method: 'PATCH',
        headers: { Authorization: 'Bearer xxxxxx', 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, senha, telefone }),
      })

      if (response.ok) {
        window.location.href = '/editUser?'
      } else {
        setErrorMessage('Erro ao realizar cadastro. Tente novamente.')
      }
    } catch (error) {
      setErrorMessage('Erro ao tentar realizar cadastro. Tente novamente mais tarde.')
    }
  }

  return (
    <YStack
      f={1}
      bg="linear-gradient(135deg, rgba(255, 255, 255, 0.6), rgba(240, 248, 255, 0.6), rgba(91, 155, 213, 0.5)), url('image.jpg')"
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
    >
      <YStack f={1} jc="center" ai="center" p="$4">
        <YStack
          w="90%"
          space="$4"
          p="$4"
          borderRadius="$4"
          shadowColor="#00000033"
          shadowRadius="$2"
        >
          <H1 color="$blue10" ta="center">
            Editar Usuário - id {userId}
          </H1>

          <XStack space="$3" flexWrap="wrap">
            <Input placeholder="Nome Completo" value={nome} onChangeText={setNome} flex={1} />
            <Input
              placeholder="E-mail"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              flex={1}
            />
          </XStack>

          <XStack space="$3" flexWrap="wrap">
            <Input
              placeholder="Telefone"
              value={telefone}
              onChangeText={setTelefone}
              keyboardType="phone-pad"
              autoCapitalize="none"
              flex={1}
            />
            <Input
              placeholder="Senha"
              value={senha}
              onChangeText={setSenha}
              secureTextEntry
              flex={1}
            />
          </XStack>

          <YStack h={32} jc="center" ai="center">
            <Paragraph
              color="$red10"
              ta="center"
              size="$2"
              style={{ visibility: errorMessage ? 'visible' : 'hidden' }}
            >
              {errorMessage}
            </Paragraph>
          </YStack>

          <Button onPress={handleEdit} bg="$blue10" color="white">
            Cadastrar
          </Button>
        </YStack>
      </YStack>
    </YStack>
  )
}
