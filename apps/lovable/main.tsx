import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from '@tanstack/react-router'
import { createRouter } from './router'

const router = createRouter()

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)
