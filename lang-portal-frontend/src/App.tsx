// src/App.tsx
import { ThemeProvider } from '@/providers/theme-provider'
import { ThemeToggle } from '@/components/theme-toggle'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter as Router } from 'react-router-dom'
import Dashboard from './pages/Dashboard'

const queryClient = new QueryClient()

// In the main App component
export default function App() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <QueryClientProvider client={queryClient}>
        <Router>
          <nav className="p-4 border-b flex gap-4 items-center">
            <div className="flex-1">
              {/* Existing navigation links */}
            </div>
            <ThemeToggle />
            <Dashboard />
          </nav>
          {/* Rest of the app */}
        </Router>
      </QueryClientProvider>
    </ThemeProvider>
  )
}