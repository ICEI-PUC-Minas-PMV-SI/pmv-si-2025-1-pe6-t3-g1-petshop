'use client'

import { useState } from 'react'
import { YStack, XStack, Text, Button, Separator, ScrollView } from 'tamagui'

export function DashboardScreen({ children }: { children: React.ReactNode }) {
  const [activeItem, setActiveItem] = useState('home')

  const menuItems = [
    { key: 'home', label: 'Início' },
    { key: 'cadastro', label: 'Cadastro de Usuário' },
    { key: 'pets', label: 'Cadastro de Pets' },
    { key: 'agendamentos', label: 'Agendamentos' },
    { key: 'config', label: 'Configurações' },
  ]

  return (
    <XStack f={1} h="100vh" overflow="hidden">
      <YStack
        width={220}
        bg="$blue10"
        p="$4"
        space="$3"
        ai="flex-start"
        jc="flex-start"
      >
        <Text fontSize="$6" color="white" mb="$2">
          PetSystem
        </Text>
        <Separator />

        {menuItems.map((item) => (
          <Button
            key={item.key}
            theme={activeItem === item.key ? 'active' : undefined}
            size="$6"
            variant="outlined"
            borderColor="white"
            onPress={() => setActiveItem(item.key)}
            alignSelf="stretch"
            mb="$5"

          >
            <Text color="white">{item.label}</Text>
          </Button>
        ))}
      </YStack>

      <ScrollView f={1} bg="$background" p="$4">
        {children}
      </ScrollView>
    </XStack>
  )
}
