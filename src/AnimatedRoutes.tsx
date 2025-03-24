import { Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./presentation/pages/HomePage";
import { TambahNasabahPage } from "./presentation/pages/TambahNasabahPage";
import { NotFoundPage } from "./presentation/pages/NotFoundPage";
import { ProfilNasabahPage } from "./presentation/pages/ProfilNasabahPage";
import { ProdukPinjamanPage } from "./presentation/pages/ProdukPinjamanPage";
import { TambahProdukPinjamanPage } from "./presentation/pages/TambahProdukPinjamanPage";
import { EditProdukPinjamanPage } from "./presentation/pages/EditProdukPinjamanPage";
import RestoreFromExcelPage from "./presentation/pages/RestoreFromExcelPage";
import { PrivateRoute } from "./presentation/router/PrivateRoute";

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <Routes location={location} key={location.pathname}>
      <Route
        index
        element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        }
      />
      <Route
        path="home"
        element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        }
      />
      <Route
        path="tambah-nasabah"
        element={
          <PrivateRoute>
            <TambahNasabahPage />
          </PrivateRoute>
        }
      />
      <Route
        path="nasabah/:id"
        element={
          <PrivateRoute>
            <ProfilNasabahPage />
          </PrivateRoute>
        }
      />
      <Route
        path="restore"
        element={
          <PrivateRoute>
            <RestoreFromExcelPage />
          </PrivateRoute>
        }
      />
      <Route
        path="produk-pinjaman"
        element={
          <PrivateRoute>
            <ProdukPinjamanPage />
          </PrivateRoute>
        }
      />
      <Route
        path="produk-pinjaman/tambah"
        element={
          <PrivateRoute>
            <TambahProdukPinjamanPage />
          </PrivateRoute>
        }
      />
      <Route
        path="produk-pinjaman/edit/:id"
        element={
          <PrivateRoute>
            <EditProdukPinjamanPage />
          </PrivateRoute>
        }
      />
      <Route
        path="*"
        element={
          <PrivateRoute>
            <NotFoundPage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AnimatedRoutes;