'use client'

import { YStack, Text, H1, Paragraph, Button } from 'tamagui'

export function HomeScreen() {
  return (
    <YStack minHeight="100vh" f={1} jc="center" ai="center" p="$4" space>
      <H1 color="$blue10">Bem-vindo ao PetSystem</H1>

      <Paragraph ta="center" size="$4" color="$color10">
        Aqui você pode gerenciar cadastros, pets e usuários de forma rápida e fácil.
      </Paragraph>

      <Button theme="active" size="$4">
        Começar agora
      </Button>
    </YStack>
  )
}
