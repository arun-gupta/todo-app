import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Todo App',
  description: 'A simple and clean todo list application built with Next.js and TypeScript',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        {/* Main application container */}
        <div className="min-h-screen flex flex-col">
          {/* Header */}
          <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="max-w-4xl mx-auto px-4 py-6">
              <h1 className="text-3xl font-bold text-gray-900">
                📝 Todo App
              </h1>
              <p className="text-gray-600 mt-2">
                Stay organized and get things done
              </p>
            </div>
          </header>

          {/* Main content area */}
          <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8">
            {children}
          </main>

          {/* Footer */}
          <footer className="bg-white border-t border-gray-200 mt-auto">
            <div className="max-w-4xl mx-auto px-4 py-4">
              <p className="text-center text-gray-500 text-sm">
                Built with Next.js, TypeScript, and Tailwind CSS
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}