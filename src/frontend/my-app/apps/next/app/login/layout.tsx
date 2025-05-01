'use client'

import { NextTamaguiProvider } from '../NextTamaguiProvider'

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <NextTamaguiProvider>
          {children}
        </NextTamaguiProvider>
      </body>
    </html>
  )
}
