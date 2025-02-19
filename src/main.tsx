import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App.tsx';
import HomePage from './presentation/pages/HomePage';
import { TambahNasabahPage } from './presentation/pages/TambahNasabahPage';
import { NotFoundPage } from './presentation/pages/NotFoundPage';

// Ambil base URL dari environment Vite
const base = import.meta.env.BASE_URL;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={base}>
      <Routes>
        <Route path="/">
          <Route index element={<App />} />
          <Route path="#/home" element={<HomePage />} />
          <Route path="#/tambah-nasabah" element={<TambahNasabahPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);