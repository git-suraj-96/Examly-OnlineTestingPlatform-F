import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { TokenProvider } from './Context/TokenContext.jsx'
import { LoaderProvider } from './Context/LoaderContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LoaderProvider> 
       <TokenProvider>
          <App />
      </TokenProvider>
    </LoaderProvider>

  </StrictMode>
)
