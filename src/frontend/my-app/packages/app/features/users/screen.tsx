import { SortableTable } from '../datatableUsers/UsersTable'
import { View, YStack, Button, H1 } from '@my/ui'
import { useRouter } from 'next/navigation'

export default function Users() {

  const router = useRouter()

  const handleRedirectToNewUser = () => {
    router.push('/cadastroUsers')
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
          <View flexDirection="row" justifyContent="space-between" alignItems="center" width="100%">
            <H1 color="$blue10" ta="left">
              Usuários
            </H1>

            <Button onPress={handleRedirectToNewUser} color="$blue10">Novo usuário</Button>
          </View>
          <SortableTable />{' '}
        </YStack>
      </YStack>
    </YStack>
  )
}
