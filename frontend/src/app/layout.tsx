import './globals.css'
import '@rainbow-me/rainbowkit/styles.css'
import { Inter } from 'next/font/google'
import { Toaster } from '@/components/ui/sonner'
import { headers } from 'next/headers'
import Providers from './provider'
import { ConnectBtn } from '@/components/ui/connectButton'

const inter = Inter({ subsets: ['latin'] })

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookie = (await headers()).get('cookie')

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers cookie={cookie}>
          <div className="min-h-screen flex flex-col">
            {/* Global Header */}
            <header className="w-full border-b px-6 py-4 flex justify-between items-center bg-background">
              <h1 className="text-lg font-semibold">Web3 Notes</h1>
              {/* Connect button otomatis dari RainbowKit */}
              <div className="flex items-center gap-4">
                <ConnectBtn />
              </div>
            </header>

            {/* Page Content */}
            <main className="flex-1 px-6 py-8 bg-muted/5">{children}</main>
          </div>

          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
