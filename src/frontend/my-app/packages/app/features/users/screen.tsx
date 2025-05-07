import { SortableTable } from '../datatableUsers/UsersTable'
import { XStack, YStack, XGroup, Input, Button, H1, Paragraph, Text } from '@my/ui'

export default function Users() {
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
          <XStack>
            <H1 color="$blue10" ta="center">
              Usuários
            </H1>
            <Button color="$blue10" ta="center">
              Novo usuário
            </Button>
          </XStack>
          <SortableTable />{' '}
        </YStack>
      </YStack>
    </YStack>
  )
}
