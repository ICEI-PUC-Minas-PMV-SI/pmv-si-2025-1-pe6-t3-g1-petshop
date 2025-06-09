import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export function useAuthCheck() {
  const router = useRouter()

  useEffect(() => {
    const checkToken = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/me', {
          method: 'GET',
          credentials: 'include',
        })

        if (res.status === 401) {
          router.push('/login')
        }
      } catch (err) {
        console.error('Erro na verificação do token', err)
        router.push('/login')
      }
    }

    checkToken()
  }, [router])
}
