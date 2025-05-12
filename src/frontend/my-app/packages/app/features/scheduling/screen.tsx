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

    fetch(`http://localhost:3001/api/schedule/get/${userId}`, {
      credentials: 'include',
    })
      .then(res => {
        if (!res.ok) throw new Error('Erro ao buscar agendamento')
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
        <Paragraph color="$red10">{error || 'Agendamento não encontrado'}</Paragraph>
        <Button mt="$4" onPress={() => router.push('/users')}>
          Voltar
        </Button>
      </YStack>
    )
  }

  return (
    <YStack f={1} jc="center" ai="center" p="$4" space="$3">
      <H1 color="$blue10">Detalhes do Agendamento</H1>
      <Paragraph>Pessoa: {user.pessoa}</Paragraph>
      <Paragraph>Profissional: {user.profissional}</Paragraph>
      <Paragraph>Pet: {user.pet}</Paragraph>
      <Paragraph>Servico: {user.servico}</Paragraph>
      <Paragraph>ID: {user.id}</Paragraph>
      <Paragraph>Data: {new Date(user.data_agendamento).toLocaleString()}</Paragraph>

      <Button mt="$4" onPress={() => router.push('/scheduling')}>
        Voltar para lista
      </Button>
    </YStack>
  )
}
