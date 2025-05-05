'use client'

import { useState } from 'react'
import { YStack, XStack, Input, Button, H1, Paragraph, Text } from '@my/ui'
import { FaHome, FaArrowLeft } from 'react-icons/fa'

export default function UserRegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      setErrorMessage('Por favor, preencha todos os campos.')
      return
    }

    if (password !== confirmPassword) {
      setErrorMessage('As senhas não coincidem.')
      return
    }

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      })

      if (response.ok) {
        window.location.href = '/login'
      } else {
        setErrorMessage('Erro ao realizar cadastro. Tente novamente.')
      }
    } catch (error) {
      setErrorMessage('Erro ao tentar realizar cadastro. Tente novamente mais tarde.')
    }
  }

  return (
    <YStack
      minHeight="100vh"
      f={1}
      bg="linear-gradient(135deg, rgba(255, 255, 255, 0.6), rgba(240, 248, 255, 0.6), rgba(91, 155, 213, 0.5)), url('image.jpg')"
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
    >
      {/* Top Bar */}
      <XStack
        h={40}
        jc="space-between"
        ai="center"
        px="$4"
        bg="rgba(0,0,0,0.5)"
      >
        <Button
          icon={<FaHome />}
          chromeless
          onPress={() => (window.location.href = '/')}
        />
        <Button
          icon={<FaArrowLeft />}
          chromeless
          onPress={() => (window.location.href = '/login')}
        />
      </XStack>

      {/* Main Form */}
      <YStack f={1} jc="center" ai="center" p="$4">
        <YStack
          w="90%"
          maxWidth={400}
          space="$4"
          bg="rgba(0,0,0,0.7)"
          p="$4"
          borderRadius="$4"
          shadowColor="#00000033"
          shadowRadius="$2"
        >
          <H1 color="$blue10" ta="center">
            Cadastro
          </H1>

          <Input
            placeholder="Nome Completo"
            value={name}
            onChangeText={setName}
            mb="$3"
          />
          <Input
            placeholder="E-mail"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            mb="$3"
          />
          <Input
            placeholder="Senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            mb="$3"
          />
          <Input
            placeholder="Confirmar Senha"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            mb="$3"
          />

          {/* Mensagem de erro */}
          <YStack h={32} jc="center" ai="center" mb="$3">
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
