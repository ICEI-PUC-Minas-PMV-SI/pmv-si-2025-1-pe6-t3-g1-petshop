'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { YStack, H1, Paragraph, Spinner, Button } from '@my/ui'

export default function UserDetailsPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pessoaId = searchParams.get('id')

  const [pessoa, setPessoa] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!pessoaId) return

    fetch(`http://localhost:3001/api/pessoas/${pessoaId}`, {
      credentials: 'include',
    })
      .then(res => {
        if (!res.ok) throw new Error('Erro ao buscar Pessoa')
        return res.json()
      })
      .then(data => setPessoa(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [pessoaId])

  if (loading) return <Spinner />

  if (error || !pessoa) {
    return (
      <YStack f={1} jc="center" ai="center" p="$4">
        <Paragraph color="$red10">{error || 'Pessoa não encontrada'}</Paragraph>
        <Button mt="$4" onPress={() => router.push('/pessoas')}>
          Voltar
        </Button>
      </YStack>
    )
  }

  return (
    <YStack f={1} jc="center" ai="center" p="$4" space="$3">
      <H1 color="$blue10">Detalhes da Pessoa</H1>
      <Paragraph>ID: {pessoa.id}</Paragraph>
      <Paragraph>Nome: {pessoa.nome}</Paragraph>
      <Paragraph>CPF/CNPJ: {pessoa.cpf_cnpj}</Paragraph>
      <Paragraph>Tipo: {pessoa.tipo == 'F'?'Fisica':'Juridica'}</Paragraph>
      <Paragraph>Data de Nascimento: {new Date(pessoa.nascimento).toLocaleString()}</Paragraph>
      <Paragraph>Genero: {pessoa.genero == 'M'?'Masculino':'Feminino'}</Paragraph>
      <Paragraph>Telefone: {pessoa.telefone}</Paragraph>
      <Paragraph>E-mail: {pessoa.email}</Paragraph>
      <Paragraph>Endereço: {pessoa.endereco}, N: {pessoa.endereco_num}</Paragraph>
      <Paragraph>Complemento: {pessoa.endereco_comp}</Paragraph>
      <Paragraph>Bairo: {pessoa.endereco_bairro} Cidade: {pessoa.cidade} Estado: {pessoa.estado}</Paragraph>
      <Paragraph>CEP: {pessoa.cep} Pais: {pessoa.pais}</Paragraph>
      <Paragraph>Criado em: {new Date(pessoa.created_at).toLocaleString()}</Paragraph>
      <Paragraph>Atualizado em: {new Date(pessoa.updated_at).toLocaleString()}</Paragraph>

      <Button mt="$4" onPress={() => router.push('/pessoas')}>
        Voltar para lista de pessoas
      </Button>
    </YStack>
  )
}
