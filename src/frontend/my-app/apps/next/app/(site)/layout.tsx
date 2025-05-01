'use client'

import { NextTamaguiProvider } from '../NextTamaguiProvider'
import { DashboardScreen } from '../../../../packages/app/features/dashboard/screen'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <NextTamaguiProvider>
      <DashboardScreen>{children}</DashboardScreen>
    </NextTamaguiProvider>
  )
}
