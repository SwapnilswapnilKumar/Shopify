import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDom from 'react-dom/client'

ReactDom.createRoot(document.getElementById('root')).render(
 <BrowserRouter>
   <React.StrictMode>
    <App />
  </React.StrictMode>,
 </BrowserRouter>
)
