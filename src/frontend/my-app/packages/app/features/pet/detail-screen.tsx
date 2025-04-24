import { Button, Paragraph, YStack } from '@my/ui'
import { ChevronLeft } from '@tamagui/lucide-icons'
import { useRouter } from 'solito/navigation'

export function PetDetailScreen({ id }: { id: string }) {
  const router = useRouter()

  if (!id) {
    return null
  }

  return (
    <YStack
      f={1}
      jc="center"
      ai="center"
      gap="$4"
      bg="$background"
    >
      <Paragraph
        ta="center"
        fow="700"
        col="$blue10"
      >{`Pet Name: ${id}`}</Paragraph>
      <Button
        icon={ChevronLeft}
        onPress={() => router.back()}
      >
        Go Back
      </Button>
    </YStack>
  )
}