'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { YStack, H1, Paragraph, Spinner, Button } from '@my/ui'

export default function UserDetailsPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const userId = searchParams.get('id')

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!userId) return

    fetch(`http://localhost:3001/api/users/${userId}`, {
      credentials: 'include',
    })
      .then(res => {
        if (!res.ok) throw new Error('Erro ao buscar usuário')
        return res.json()
      })
      .then(data => setUser(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [userId])

  if (loading) return <Spinner />

  if (error || !user) {
    return (
      <YStack f={1} jc="center" ai="center" p="$4">
        <Paragraph color="$red10">{error || 'Usuário não encontrado'}</Paragraph>
        <Button mt="$4" onPress={() => router.push('/users')}>
          Voltar
        </Button>
      </YStack>
    )
  }

  return (
    <YStack f={1} jc="center" ai="center" p="$4" space="$3">
      <H1 color="$blue10">Detalhes do Usuário</H1>
      <Paragraph>Nome: {user.nome}</Paragraph>
      <Paragraph>Email: {user.email}</Paragraph>
      <Paragraph>Telefone: {user.telefone}</Paragraph>
      <Paragraph>ID: {user.id}</Paragraph>
      <Paragraph>Criado em: {new Date(user.created_at).toLocaleString()}</Paragraph>
      <Paragraph>Atualizado em: {new Date(user.updated_at).toLocaleString()}</Paragraph>

      <Button mt="$4" onPress={() => router.push('/users')}>
        Voltar para lista
      </Button>
    </YStack>
  )
}
