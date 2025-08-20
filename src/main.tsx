import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from './providers/theme.provider.tsx'
import { RouterProvider } from 'react-router'
import { router } from './routes/index.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />,
    <ThemeProvider defaultTheme='system'>
      <App />
    </ThemeProvider>
  </StrictMode>,
)
