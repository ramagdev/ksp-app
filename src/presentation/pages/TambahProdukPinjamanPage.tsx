import React from 'react';
import { ProdukPinjamanForm } from '../components/forms/ProdukPinjamanForm';
import { useNavigate } from 'react-router-dom';
import { createProdukPinjaman } from '../../container';
import { ProdukPinjamanEntity } from '../../core/entities/Mutasi/ProdukPinjaman';

export const TambahProdukPinjamanPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = async (produk: Omit<ProdukPinjamanEntity, 'id'>) => {
    await createProdukPinjaman.execute(produk); // Tambahkan produk baru
    navigate('/produk-pinjaman'); // Redirect ke halaman daftar produk
  };

  return (
    <ProdukPinjamanForm
      onSubmit={handleSubmit} // Fungsi untuk menambah produk
    />
  );
};