'use client'

import { NextTamaguiProvider } from '../NextTamaguiProvider'
import { YStack, XStack, Text, ScrollView } from 'tamagui'

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <NextTamaguiProvider>
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
        </XStack>
        <ScrollView f={1} p="$4" bg="$background">
          {children}
        </ScrollView>
      </YStack>
    </NextTamaguiProvider>
  )
}
