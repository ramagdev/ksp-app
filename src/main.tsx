import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom'; // Ganti BrowserRouter ke HashRouter
import './index.css';
import App from './App';
import HomePage from './presentation/pages/HomePage';
import { TambahNasabahPage } from './presentation/pages/TambahNasabahPage';
import { NotFoundPage } from './presentation/pages/NotFoundPage';
import { ProfilNasabahPage } from './presentation/pages/ProfilNasabahPage';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter> {/* Tidak perlu basename */}
      <Routes>
        <Route path="/">
          <Route index element={<App />} />
          <Route path='home' element={<HomePage />} />
          <Route path="tambah-nasabah" element={<TambahNasabahPage />} />
          <Route path="nasabah/:id" element={<ProfilNasabahPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </HashRouter>
  </StrictMode>
);