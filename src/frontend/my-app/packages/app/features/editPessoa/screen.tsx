'use client'

import { useState } from 'react'
import { XStack, YStack, XGroup, Input, Button, H1, Paragraph, Spinner } from '@my/ui'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function UserEditPage() {
  const [nome, setNome] = useState('')
  const [cpf_cnpj, setTaxId] = useState('')
  const [tipo, setTipo] = useState('F')
  const [nascimento, setNascimento] = useState('')
  const [genero, setGenero] = useState('M')
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
  const [loading, setLoading] = useState(true)

  const searchParams = useSearchParams()
  const pessoaId = searchParams.get('id')

   useEffect(() => {
    if (!pessoaId) return

    const fetchUser = async () => {
      try {
        const res = await fetch(`http://localhost:3001/api/pessoas/${pessoaId}`,{credentials: 'include'})
        const data = await res.json()
        setNome(data.nome)
        setTaxId(data.cpf_cnpj)
        setTipo(data.tipo)
        setNascimento(data.nascimento)
        setGenero(data.genero)
        setPhone(data.telefone)
        setEmail(data.email)
        setEndereco(data.endereco)
        setEndNum(data.endereco_num)
        setEndComp(data.endereco_comp)
        setEndBairro(data.endereco_bairro)
        setCidade(data.cidade)
        setEstado(data.estado)
        setPais(data.pais)
        setCep(data.cep)
      } catch (err) {
        console.error('Erro ao carregar usuário:', err)
        setErrorMessage('Erro ao carregar dados do usuário.')
      }finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [pessoaId]) 

  const handleEdit = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/pessoas/${pessoaId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ nome, cpf_cnpj, tipo, nascimento, genero,telefone,email,endereco,endereco_num, endereco_comp,endereco_bairro, cidade,estado,pais,cep }),
      })

      if (response.ok) {
        window.location.href = `/editPessoa?id=${pessoaId}`
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
            Editar Pessoa: {pessoaId}
          </H1>

          <XStack space="$3" flexWrap="wrap">
            <Input placeholder="Nome Completo" value={nome} onChangeText={setNome} flex={1} />
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
                  onPress={() => setTipo('F')}
                  backgroundColor={tipo === 'F' ? '$blue10' : 'transparent'}
                  color={tipo === 'F' ? 'white' : '$blue10'}
                  borderWidth={1}
                  borderColor="$blue10"
                >
                  Fisica
                </Button>
              </XGroup.Item>
              <XGroup.Item>
                <Button
                  onPress={() => setTipo('J')}
                  backgroundColor={tipo === 'J' ? '$blue10' : 'transparent'}
                  color={tipo === 'J' ? 'white' : '$blue10'}
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
                  onPress={() => setGenero('M')}
                  backgroundColor={genero === 'M' ? '$blue10' : 'transparent'}
                  color={genero === 'M' ? 'white' : '$blue10'}
                  borderWidth={1}
                  borderColor="$blue10"
                >
                  Masculino
                </Button>
              </XGroup.Item>
              <XGroup.Item>
                <Button
                  onPress={() => setGenero('F')}
                  backgroundColor={genero === 'F' ? '$blue10' : 'transparent'}
                  color={genero === 'F' ? 'white' : '$blue10'}
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

          <Button onPress={handleEdit} bg="$green10" color="white">
            Salvar
          </Button>
        </YStack>
      </YStack>
    </YStack>
  )
}
