'use client'

import { useState } from 'react'
import { View, Input, Button, H1, Paragraph } from '@my/ui'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleLogin = async () => {
    if (!email || !senha) {
      setErrorMessage('Por favor, preencha todos os campos.')
      return
    }

    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, senha }),
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
    <View
      bg="linear-gradient(135deg, rgba(255, 255, 255, 0.6), rgba(240, 248, 255, 0.6), rgba(91, 155, 213, 0.5)), url('image.jpg')"
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
    >
      <View flexDirection="column" alignItems="center">
        <View
          width="100%"
          maxWidth={400}
          space="$4"
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
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
            mb="$3"
          />

          <View display="flex" alignItems="start">
            <Paragraph
              color="$red10"
              ta="center"
              size="$2"
              style={{ visibility: errorMessage ? 'visible' : 'hidden' }}
            >
              {errorMessage}
            </Paragraph>
          </View>

          <Button onPress={handleLogin} bg="$blue10" color="white">
            Entrar
          </Button>
        </View>
      </View>
    </View>
  )
}
