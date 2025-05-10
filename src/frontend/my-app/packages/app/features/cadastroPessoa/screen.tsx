'use client'

import { useState } from 'react'
import { XStack, YStack, XGroup, Input, Button, H1, Paragraph, Text } from '@my/ui'

export default function NovaPessoaPage() {
  const [name, setName] = useState('')
  const [cpf_cnpj, setTaxId] = useState('')
  const [tipo, setTipo] = useState('1')
  const [nascimento, setNascimento] = useState('')
  const [genero, setGenero] = useState('1')
  const [telefone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [endereco, setEndereco] = useState('')
  const [endereco_num, setEndNum] = useState('')
  const [endereco_comp, setEndComp] = useState('')
  const [endereco_bairro, setEndBairro] = useState('')
  const [cidade, setCidade] = useState('')
  const [estado, setEstado] = useState('')
  const [pais, setPais] = useState('')
  const [cep, setCep] = useState('')

  const [errorMessage, setErrorMessage] = useState('')

  const handleRegister = async () => {
    if (!name || !cpf_cnpj || !tipo || !telefone || !tipo) {
      setErrorMessage('Por favor, preencha todos os campos.')
      return
    }

    try {
      const response = await fetch('/x', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, cpf_cnpj, tipo, nascimento, genero,telefone,email,endereco,endereco_num, endereco_comp,endereco_bairro, cidade,estado,pais,cep }),
      })

      if (response.ok) {
        window.location.href = '/cadastroPessoa'
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
            Novo Pesoa
          </H1>

          <XStack space="$3" flexWrap="wrap">
            <Input placeholder="Nome Completo" value={name} onChangeText={setName} flex={1} />
            <Input
              placeholder="CPF/CNPJ"
              value={cpf_cnpj}
              onChangeText={setTaxId}
              autoCapitalize="none"
              flex={1}
            />
            <XGroup>
              <XGroup.Item>
                <Button
                  onPress={() => setTipo('1')}
                  backgroundColor={tipo === '1' ? '$blue10' : 'transparent'}
                  color={tipo === '1' ? 'white' : '$blue10'}
                  borderWidth={1}
                  borderColor="$blue10"
                >
                  Fisica
                </Button>
              </XGroup.Item>
              <XGroup.Item>
                <Button
                  onPress={() => setTipo('2')}
                  backgroundColor={tipo === '2' ? '$blue10' : 'transparent'}
                  color={tipo === '2' ? 'white' : '$blue10'}
                  borderWidth={1}
                  borderColor="$blue10"
                >
                  Juridica
                </Button>
              </XGroup.Item>
            </XGroup>

            <Input
              placeholder="Nascimento"
              value={nascimento}
              onChangeText={setNascimento}
              autoCapitalize="none"
              flex={1}
            />

            <XGroup>
              <XGroup.Item>
                <Button
                  onPress={() => setGenero('1')}
                  backgroundColor={genero === '1' ? '$blue10' : 'transparent'}
                  color={genero === '1' ? 'white' : '$blue10'}
                  borderWidth={1}
                  borderColor="$blue10"
                >
                  Masculino
                </Button>
              </XGroup.Item>
              <XGroup.Item>
                <Button
                  onPress={() => setGenero('2')}
                  backgroundColor={genero === '2' ? '$blue10' : 'transparent'}
                  color={genero === '2' ? 'white' : '$blue10'}
                  borderWidth={1}
                  borderColor="$blue10"
                >
                  Feminino
                </Button>
              </XGroup.Item>
            </XGroup>

            <Input
              placeholder="Email"
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
              onChangeText={setPhone}
              keyboardType="phone-pad"
              autoCapitalize="none"
              flex={1}
            />
            <Input
              placeholder="Endereço"
              value={endereco}
              onChangeText={setEndereco}
              autoCapitalize="none"
              flex={1}
            />
            <Input
              placeholder="Nº"
              value={endereco_num}
              onChangeText={setEndNum}
              keyboardType="number-pad"
              autoCapitalize="none"
              flex={1}
            />
            <Input
              placeholder="Complemento"
              value={endereco_comp}
              onChangeText={setEndComp}
              autoCapitalize="none"
              flex={1}
            />
            <Input
              placeholder="Bairro"
              value={endereco_bairro}
              onChangeText={setEndBairro}
              autoCapitalize="none"
              flex={1}
            />

          </XStack>

          <XStack space="$3" flexWrap="wrap">
            <Input
              placeholder="Cidade"
              value={cidade}
              onChangeText={setCidade}
              autoCapitalize="none"
              flex={1}
            />
            <Input
              placeholder="Estado"
              value={estado}
              onChangeText={setEstado}
              autoCapitalize="none"
              flex={1}
            />
            <Input
              placeholder="Pais"
              value={pais}
              onChangeText={setPais}
              keyboardType="number-pad"
              autoCapitalize="none"
              flex={1}
            />
            <Input
              placeholder="CEP"
              value={cep}
              onChangeText={setCep}
              autoCapitalize="none"
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
