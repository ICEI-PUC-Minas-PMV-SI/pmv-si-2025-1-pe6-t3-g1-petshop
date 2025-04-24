'use client'

import { useParams } from 'solito/navigation'
import { PetDetailScreen } from 'app/features/pet/detail-screen'

export default function Page() {
  const { id } = useParams() 
  return <PetDetailScreen id={id as string} />
}