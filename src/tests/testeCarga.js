import http from 'k6/http'
import { check } from 'k6'

export let options = {
  vus: 10,
  duration: '30s',
}

export default function () {
  const loginUrl = 'http://localhost:3001/api/login'
  const protectedUrl = 'http://localhost:3001/api/users'

  const jar = http.cookieJar()

  const loginRes = http.post(
    loginUrl,
    JSON.stringify({
      email: 'davi@email.com',
      senha: 'Qsczse123!'
    }),
    {
      headers: {
        'Content-Type': 'application/json'
      },
      jar: jar
    }
  )

  check(loginRes, {
    'login status 200': (r) => r.status === 200,
  })

  const protectedRes = http.get(protectedUrl, { jar })

  check(protectedRes, {
    'rota protegida OK': (r) => r.status === 200,
  })
}
