import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/global.css'
import { BrowserRouter } from 'react-router-dom'
import MainRoutes from './routes/routes'


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
      <MainRoutes />
  </BrowserRouter>
)