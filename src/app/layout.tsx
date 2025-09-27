// app/layout.tsx

import './globals.css'
import { ReactNode } from 'react'

// Font imports (example)
import { Inter, Lora } from 'next/font/google'
const inter = Inter({ subsets: ['latin'], weight: ['400','700'] })
const lora = Lora({ subsets: ['latin'], weight: ['400','700'] })

// Metadata API
export const metadata = {
  title: 'WFLEC 2026 ‒ World Future Leaders in Energy Congress',
  description: 'Inspiring next-gen leadership in energy, sustainability, and AI',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'WFLEC 2026',
    description: 'World Future Leaders in Energy Congress',
    siteName: 'WFLEC',
    // possibly image etc.
  }
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-background text-foreground antialiased`}>
        
          {/* <Header /> */}
          <main className="min-h-screen">
            {children}
          </main>
          {/* <Footer /> */}
        
      </body>
    </html>
  )
}
