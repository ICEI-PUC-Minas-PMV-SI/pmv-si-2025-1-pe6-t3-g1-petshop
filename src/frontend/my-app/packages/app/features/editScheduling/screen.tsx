'use client'

import { useState } from 'react'
import { XStack, YStack, Input, Button, H1, Paragraph } from '@my/ui'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function UserEditPage() {
  const [pessoa, setPessoa] = useState('')
  const [profissional, setProfissional] = useState('')
  const [pet, setPet] = useState('')
  const [servico, setServico] = useState('')
  const [data_agendamento, setDataAgendamento] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  //
  

  const searchParams = useSearchParams()
  const userId = searchParams.get('id')

    
/////////////////
useEffect(() => {
  if (!userId) {
    console.log('Aguardando userId...')
    return
  }

  console.log('Carregando dados para userId:', userId)

  const fetchAgendamento = async () => {
    try {
      const res = await fetch(`http://localhost:3001/api/schedule/get/${userId}`)
      const data = await res.json()

      console.log('Dados recebidos:', data)

      setPessoa(data.pessoa || '')
      setProfissional(data.profissional || '')
      setPet(data.pet || '')
      setServico(data.servico || '')

    if (data.data_agendamento) {
        const [dataISO, horaISO] = data.data_agendamento.split('T')
        const [ano, mes, dia] = dataISO.split('-')
        const horaFormatada = horaISO.slice(0, 5) // hh:mm
        setDataAgendamento(`${dia}/${mes}/${ano} ${horaFormatada}`)
    }

    } catch (err) {
      console.error('Erro ao carregar agendamento:', err)
      setErrorMessage('Erro ao carregar dados do agendamento.')
    }
  }

  fetchAgendamento()
}, [userId])

//////////////

  const handleEdit = async () => {
    if (!pessoa || !profissional || !pet || !servico || !data_agendamento) {
    setErrorMessage('Por favor, preencha todos os campos.')
    return
  }
    // Validação do formato da data
    const dataRegex = /^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}$/
    if (!dataRegex.test(data_agendamento)) {
    setErrorMessage('Data inválida. Use o formato dd/mm/yyyy hh:mm.')
    return
    }

    const [dataParte, horaParte] = data_agendamento.split(' ')
    const [dia, mes, ano] = dataParte.split('/')
    const dataFormatada = `${ano}-${mes}-${dia}T${horaParte}:00`


    try {
      const response = await fetch(`http://localhost:3001/api/schedule/update/${userId}`, { // schedule/update/${userId} ou users/${userId}/update
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
            pessoa,
            profissional,
            pet,
            servico,
            data_agendamento: dataFormatada,
      })
        ,
      })

      if (response.ok) {
        window.location.href = `/editScheduling?id=${userId}`
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
            Editar Agendamento
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
            placeholder="Data e Hora (dd/mm/yyyy hh:mm)"
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

          <Button onPress={handleEdit} bg="$blue10" color="white">
            Editar
          </Button>
        </YStack>
      </YStack>
    </YStack>
  )
}
