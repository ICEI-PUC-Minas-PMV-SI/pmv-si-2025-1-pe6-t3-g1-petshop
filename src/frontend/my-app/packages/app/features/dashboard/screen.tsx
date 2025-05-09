'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { YStack, XStack, Text, Button, ScrollView, Avatar } from 'tamagui'
import { useAuthCheck } from '../../hooks/useAuthCheck'

export function DashboardScreen({ children }: { children: React.ReactNode }) {
  const [activeItem, setActiveItem] = useState('home')
  const router = useRouter()

  const menuItems = [
    { key: 'pets', label: 'Pets', path: '/pets' },
    { key: 'services', label: 'Serviços', path: '/services' },
    { key: 'scheduling', label: 'Agendamentos', path: '/scheduling' },
    { key: 'pessoas', label: 'Pessoas', path: '/pessoas' },
    { key: 'users', label: 'Usuários', path: '/users' },
  ]

  useAuthCheck()

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/logout', {
        method: 'POST',
        credentials: 'include',
      })

      if (response.ok) {
       router.push('/login')
      } else {
        alert('Erro ao fazer logout.')
      }

    } catch (error) {
      console.error('Erro ao fazer logout:', error)
      alert('Erro ao se desconectar. Tente novamente.')
    }
  }

  return (
    <YStack f={1} minHeight="100vh">
      <XStack
        height={64}
        width="100%"
        bg="$blue10"
        ai="end"
        jc="flex-end"
        px="$4"
        borderBottomWidth={1}
        borderColor="$blue9"
        style={{ alignItems: 'center', justifyContent: 'space-between' }}
      >
        <Text fontSize="$6" color="white" mb="$2">
          PetSystem
        </Text>
        <XStack>
          <Avatar circular size="$3" mr="$3">
            <Avatar.Image
              src="https://cdn-icons-png.flaticon.com/512/9131/9131529.png"
              accessibilityLabel="Usuário"
            />
            <Avatar.Fallback bg="$blue5" />
          </Avatar>

          <Button size="$2" theme="active" onPress={handleLogout}>
            Logout
          </Button> 
        </XStack>
      </XStack>
      <XStack f={1} flex={1} height="100%">
        <YStack width={220} bg="$blue10" p="$4" space="$3" ai="flex-start" jc="flex-start">
          {menuItems.map((item) => (
            <Button
              key={item.key}
              onPress={() => {
                setActiveItem(item.key)
                router.push(item.path)
              }}
              alignSelf="stretch"
              mb="$2"
              borderWidth={0}
              bg="transparent"
              theme={activeItem === item.key ? 'active' : undefined}
            >
              <Text color="white">{item.label}</Text>
            </Button>
          ))}
        </YStack>

        <ScrollView f={1} p="$4" bg="$background">
          {children}
        </ScrollView>
      </XStack>
    </YStack>
  )
}
