import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Happy Anniversary ❤️',
  description: 'A special website celebrating our love story',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
