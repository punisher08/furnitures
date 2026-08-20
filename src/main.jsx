import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { HelmetProvider } from 'react-helmet-async';
// import SingleProduct from './pages/SingleProduct';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <App/>
    </HelmetProvider>
  </StrictMode>,
);
