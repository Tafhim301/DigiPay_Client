import './index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from './providers/theme.provider.tsx'
import { RouterProvider } from 'react-router'
import { Provider as ReduxProvider } from 'react-redux'
import { router } from './routes/index.tsx'
import { store } from './redux/store.ts'
import { Toaster } from './components/ui/sonner.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme='system'>
      <ReduxProvider store={store}>
        <Toaster />

        <RouterProvider router={router} />,
      </ReduxProvider>

    </ThemeProvider>
  </StrictMode>,
)
