import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index'
import App from '../src/App'
import StoreContextProvider from './Contexts/StoreContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <StoreContextProvider>
      <App />
    </StoreContextProvider>
    
  </StrictMode>,
)
