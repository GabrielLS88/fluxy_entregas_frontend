import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from "sonner"
import DeliveryContext from "./components/AppContext/AppContex.jsx"

import './styles/global.css'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"

import MainRoutes from './routes/routes'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Toaster richColors position="top-center" />
    <DeliveryContext>
      <MainRoutes />
    </DeliveryContext>
  </BrowserRouter>
)
