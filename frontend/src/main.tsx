import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ContextProvider } from './context/AppContext.tsx'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
    <ContextProvider>
        <StrictMode>
            <App />
        </StrictMode>
    </ContextProvider>
)
