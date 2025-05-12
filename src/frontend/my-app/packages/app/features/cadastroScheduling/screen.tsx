'use client'

import { useState } from 'react'
import { XStack, YStack, XGroup, Input, Button, H1, Paragraph, Text } from '@my/ui'

export default function UserRegisterPage() {
  const [pessoa, setPessoa] = useState('')
  const [profissional, setProfissional] = useState('')
  const [pet, setPet] = useState('')
  const [servico, setServico] = useState('')
  const [data_agendamento, setDataAgendamento] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  //const [tipoUsuario, setTipoUsuario] = useState('2')

  const handleRegister = async () => {
  if (!pessoa || !profissional || !pet || !servico || !data_agendamento) {
    setErrorMessage('Por favor, preencha todos os campos.')
    return
  }

  // Validação do formato da data
  const dataRegex = /^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}$/
  if (!dataRegex.test(data_agendamento)) {
    setErrorMessage('Data inválida. Use o formato dd/mm/yyyy.')
    return
  }

  // Converte para ISO antes de enviar (ex: "2025-05-10")
  const [dataParte, horaParte] = data_agendamento.split(' ')
  const [dia, mes, ano] = dataParte.split('/')
  const dataFormatada = `${ano}-${mes}-${dia}T${horaParte}:00`


  try {
    const response = await fetch('http://localhost:3001/api/schedule/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        pessoa,
        profissional,
        pet,
        servico,
        data_agendamento: dataFormatada,
      }),
    })

    if (response.ok) {
      window.location.href = '/cadastroScheduling'
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
            Novo Agendamento
          </H1>

          <XStack space="$3" flexWrap="wrap">
            <Input placeholder="Pessoa" value={pessoa} onChangeText={setPessoa} flex={1} />
            <Input
              placeholder="Profissional"
              value={profissional}
              onChangeText={setProfissional}
              keyboardType="email-address"
              autoCapitalize="none"
              flex={1}
            />
          </XStack>

          <XStack space="$3" flexWrap="wrap">
            <Input
              placeholder="Pet"
              value={pet}
              onChangeText={setPet}
              keyboardType="phone-pad"
              autoCapitalize="none"
              flex={1}
            />
            <Input
              placeholder="Servico"
              value={servico}
              onChangeText={setServico}
              flex={1}
            />
            <Input
              placeholder="Data (dd/mm/yyyy hh:mm)"
              value={data_agendamento}
              onChangeText={setDataAgendamento}
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

          <Button onPress={handleRegister} bg="$blue10" color="white">
            Cadastrar
          </Button>
        </YStack>
      </YStack>
    </YStack>
  )
}
