import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App.tsx';
import HomePage from './presentation/pages/HomePage';
import { TambahNasabahPage } from './presentation/pages/TambahNasabahPage';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/tambah-nasabah" element={<TambahNasabahPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);