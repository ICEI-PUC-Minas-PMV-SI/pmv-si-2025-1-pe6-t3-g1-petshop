'use client'

import { useState } from 'react'
import { YStack, XStack, Input, Button, H1, Paragraph } from '@my/ui'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMessage('Por favor, preencha todos os campos.')
      return
    }

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (response.ok) {
        window.location.href = '/'
      } else {
        setErrorMessage('Credenciais inválidas. Tente novamente.')
      }
    } catch (error) {
      setErrorMessage('Erro ao tentar fazer login. Tente novamente mais tarde.')
    }
  }

  return (
    <YStack
      minHeight="20vh"
      f={1}
      bg="linear-gradient(135deg, rgba(255, 255, 255, 0.6), rgba(240, 248, 255, 0.6), rgba(91, 155, 213, 0.5)), url('image.jpg')"
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
    >
      <XStack
        h={40}
        jc="flex-start"
        ai="center"
        px="$4"
        bg="rgba(0,0,0,0.5)"
      >
      </XStack>

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
            Login
          </H1>

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

          <Button onPress={handleLogin} bg="$blue10" color="white">
            Entrar
          </Button>
        </YStack>
      </YStack>
    </YStack>
  )
}
