'use client'

import { useState } from 'react'
import { XStack, YStack, XGroup, Input, Button, H1, Paragraph, Text } from '@my/ui'

export default function UserRegisterPage() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [telefone, setTelefone] = useState('')
  const [senha, setSenha] = useState('')
  const [confirmSenha, setConfirmSenha] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [tipoUsuario, setTipoUsuario] = useState('2')

  const handleRegister = async () => {
    if (!nome || !email || !senha || !telefone || !confirmSenha || !tipoUsuario) {
      setErrorMessage('Por favor, preencha todos os campos.')
      return
    }

    if (senha !== confirmSenha) {
      setErrorMessage('As senhas não coincidem.')
      return
    }

    try {
      const response = await fetch('http://localhost:3001/api/users/new-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ nome, email, senha, telefone, role_id: Number(tipoUsuario) }),
      })

      if (response.ok) {
        window.location.href = '/cadastroUsers'
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
            Novo Usuário
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
            <Input
              placeholder="Confirmar Senha"
              value={confirmSenha}
              onChangeText={setConfirmSenha}
              secureTextEntry
              flex={1}
            />
          </XStack>

          <YStack space="$2">
            <Text color="white">Tipo de Usuário</Text>
            <XGroup>
              <XGroup.Item>
                <Button
                  onPress={() => setTipoUsuario('1')}
                  backgroundColor={tipoUsuario === '1' ? '$blue10' : 'transparent'}
                  color={tipoUsuario === '1' ? 'white' : '$blue10'}
                  borderWidth={1}
                  borderColor="$blue10"
                >
                  1 - Administrador
                </Button>
              </XGroup.Item>
              <XGroup.Item>
                <Button
                  onPress={() => setTipoUsuario('2')}
                  backgroundColor={tipoUsuario === '2' ? '$blue10' : 'transparent'}
                  color={tipoUsuario === '2' ? 'white' : '$blue10'}
                  borderWidth={1}
                  borderColor="$blue10"
                >
                  2 - Usuário
                </Button>
              </XGroup.Item>
            </XGroup>
          </YStack>

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

          <Button onPress={handleRegister} bg="$blue10" color="white">
            Cadastrar
          </Button>
        </YStack>
      </YStack>
    </YStack>
  )
}
