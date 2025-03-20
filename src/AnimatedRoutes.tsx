import { useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { Routes, Route, useLocation } from "react-router-dom";
import App from "./App";
import HomePage from "./presentation/pages/HomePage";
import { TambahNasabahPage } from "./presentation/pages/TambahNasabahPage";
import { NotFoundPage } from "./presentation/pages/NotFoundPage";
import { ProfilNasabahPage } from "./presentation/pages/ProfilNasabahPage";
import { ProdukPinjamanPage } from "./presentation/pages/ProdukPinjamanPage";
import { TambahProdukPinjamanPage } from "./presentation/pages/TambahProdukPinjamanPage";
import { EditProdukPinjamanPage } from "./presentation/pages/EditProdukPinjamanPage";
import RestoreFromExcelPage from "./presentation/pages/RestoreFromExcelPage";
import { AppShell } from "./presentation/components/AppShell";

const AnimatedRoute = ({ children, inProp }: { children: React.ReactNode; inProp: boolean }) => {
  const nodeRef = useRef(null);

  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={inProp} // Tambahkan prop in untuk mengontrol animasi
      timeout={1000}
      classNames="page"
      unmountOnExit // Opsional: menghapus komponen dari DOM setelah animasi selesai
    >
      <div ref={nodeRef}>{children}</div>
    </CSSTransition>
  );
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<AppShell />}>
        <Route
          index
          element={
            <AnimatedRoute inProp={location.pathname === "/"}>
              <App />
            </AnimatedRoute>
          }
        />
        <Route
          path="home"
          element={
            <AnimatedRoute inProp={location.pathname === "/home"}>
              <HomePage />
            </AnimatedRoute>
          }
        />
        <Route
          path="tambah-nasabah"
          element={
            <AnimatedRoute inProp={location.pathname === "/tambah-nasabah"}>
              <TambahNasabahPage />
            </AnimatedRoute>
          }
        />
        <Route
          path="nasabah/:id"
          element={
            <AnimatedRoute inProp={location.pathname.startsWith("/nasabah/")}>
              <ProfilNasabahPage />
            </AnimatedRoute>
          }
        />
        <Route 
          path="/restore" 
          element={
            <AnimatedRoute inProp={location.pathname.startsWith("/restore")}>
              <RestoreFromExcelPage />
            </AnimatedRoute>
          } 
        />
        <Route
          path="produk-pinjaman"
          element={
            <AnimatedRoute inProp={location.pathname === "/produk-pinjaman"}>
              <ProdukPinjamanPage />
            </AnimatedRoute>
          }
        />
        <Route
          path="produk-pinjaman/tambah"
          element={
            <AnimatedRoute inProp={location.pathname === "/produk-pinjaman/tambah"}>
              <TambahProdukPinjamanPage />
            </AnimatedRoute>
          }
        />
        <Route
          path="produk-pinjaman/edit/:id"
          element={
            <AnimatedRoute inProp={location.pathname.startsWith("/produk-pinjaman/edit/")}>
              <EditProdukPinjamanPage/>
            </AnimatedRoute>
          }
        />
        <Route
          path="*"
          element={
            <AnimatedRoute inProp={true}> {/* Selalu true untuk 404 agar terlihat */}
              <NotFoundPage />
            </AnimatedRoute>
          }
        />
      </Route>
    </Routes>
  );
};

export default AnimatedRoutes;