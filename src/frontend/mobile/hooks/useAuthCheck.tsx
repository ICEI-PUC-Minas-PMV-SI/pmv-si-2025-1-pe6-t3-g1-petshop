import { useEffect } from 'react'
import { useRouter } from "expo-router";

export function useAuthCheck() {
  const router = useRouter()

  useEffect(() => {
    const checkToken = async () => {
      try {
        const res = await fetch('http://10.0.2.2:3001/api/me', {
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
