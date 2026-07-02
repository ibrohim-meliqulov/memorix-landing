import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Memorix — AI bilan so'z o'rganing | Flashcard Telegram Bot",
  description: "AI yordamida inglizcha, ruscha va koreycha so'zlarni oson va tez o'rganing. Matn yoki rasm yuboring — AI o'zi flashcard yaratadi. Bepul boshlang!",
  keywords: ["flashcard o'zbek tili", "inglizcha so'z o'rganish", "AI flashcard", "telegram flashcard bot", "so'z o'rganish ilova", "memorix"],
  authors: [{ name: 'Memorix' }],
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: "Memorix — AI bilan so'z o'rganing",
    description: "AI yordamida inglizcha, ruscha va koreycha so'zlarni oson va tez o'rganing.",
    url: 'https://memorix.uz',
    siteName: 'Memorix',
    locale: 'uz_UZ',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Memorix — AI bilan so'z o'rganing",
    description: "AI yordamida so'z o'rganishning eng oson yo'li.",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: 'GJpvEo37yCQhaBHGdvnptrdnt2km2UGuS9-r0D54Hmo',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="uz">
      <body className={inter.className}>{children}</body>
    </html>
  )
}