import '@/styles/globals.css'

import { ReactNode } from 'react'
import { Metadata } from 'next'
import { QueryProvider } from '@/modules/common/providers'
import { Press_Start_2P } from 'next/font/google'

const pressStart2P = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

type Props = {
  children?: ReactNode
}

export const metadata: Metadata = {
  title: 'Vaporeon',
  description: 'Vaporeon',
  manifest: '/manifest.json',
  icons: {
    apple: '/apple-icon.png',
  },
}

export default async function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body
        className={`${pressStart2P.className} bg-neutral-dark text-neutral-white`}
      >
        <QueryProvider>
          <main className="w-screen h-screen">{children}</main>
        </QueryProvider>
      </body>
    </html>
  )
}
