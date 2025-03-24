import React, { useState } from 'react';
import { RequiredTextInput } from '../inputs/RequiredTextInput';
import { useNavigate } from 'react-router-dom';
import { ProdukPinjamanEntity } from '../../../core/entities/Mutasi/ProdukPinjaman';

interface ProdukPinjamanFormProps {
    initialData?: ProdukPinjamanEntity; // Data produk yang akan diedit
    onSubmit: (produk: Omit<ProdukPinjamanEntity, 'id'>) => Promise<void>; // Fungsi untuk handle submit
  }
  
  export const ProdukPinjamanForm: React.FC<ProdukPinjamanFormProps> = ({ initialData, onSubmit }) => {
    const [namaProduk, setNamaProduk] = useState(initialData?.namaProduk || '');
    const [jarakCicilan, setJarakCicilan] = useState<"Harian" | "Mingguan" | "Bulanan">(initialData?.jarakCicilan || "Harian");
    const [banyakCicilan, setBanyakCicilan] = useState(initialData?.banyakCicilan || 1);
    const [bunga, setBunga] = useState(initialData?.bunga || 0);
    const [jenisPeminjam, setJenisPeminjam] = useState<'Perorangan' | 'Kelompok'>(initialData?.jenisPeminjam || 'Perorangan');
    const [keterangan, setKeterangan] = useState(initialData?.keterangan || '');
    const [errors, setErrors] = useState<Record<string, string>>({});
    const navigate = useNavigate();
  
    const validateForm = () => {
      const newErrors: Record<string, string> = {};
      if (!namaProduk.trim()) newErrors.namaProduk = "Nama Produk harus diisi.";
      return newErrors;
    };
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
  
      const newErrors = validateForm();
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
  
      try {
        const produkPinjaman = {
          namaProduk,
          jarakCicilan,
          banyakCicilan,
          bunga,
          jenisPeminjam,
          keterangan,
          is_active: true
        };
  
        await onSubmit(produkPinjaman); // Gunakan fungsi onSubmit dari props
        navigate('/app/produk-pinjaman');
      } catch (err) {
        setErrors({ general: "Gagal menyimpan produk pinjaman. Silakan coba lagi." });
      }
    };
  
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 rounded-lg">
        <div className="w-full max-w-4xl p-6 bg-white shadow-md rounded-lg my-10">
          <h1 className="text-3xl font-semibold text-gray-700 mb-6 text-center">
            {initialData ? 'Edit Produk Pinjaman' : 'Tambah Produk Pinjaman'}
          </h1>

                <form noValidate onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Nama Produk */}
                    <div className="col-span-2">
                        <RequiredTextInput
                            id="namaProduk"
                            value={namaProduk}
                            onChange={(e) => setNamaProduk(e.target.value)}
                            label="Nama Produk"
                            errorMsg={errors.namaProduk}
                        />
                    </div>

                    {/* Jarak Cicilan */}
                    <div>
                        <label htmlFor="jarakCicilan" className="block text-sm font-medium text-gray-700">
                            Jarak Cicilan (harian, mingguan, bulanan)
                        </label>
                        <select
                            id="jarakCicilan"
                            value={jarakCicilan}
                            onChange={(e) => setJarakCicilan(e.target.value as 'Harian' | 'Mingguan' | 'Bulanan')}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:ring-2"
                        >
                            <option value="Harian">Harian</option>
                            <option value="Mingguan">Mingguan</option>
                            <option value="Bulanan">Bulanan</option>    
                        </select>
                        {errors.jarakCicilan && <p className="text-red-500 text-sm mt-1">{errors.jarakCicilan}</p>}
                    </div>

                    {/* Banyak Cicilan */}
                    <div>
                        <label htmlFor="banyakCicilan" className="block text-sm font-medium text-gray-700">
                            Banyak Cicilan
                        </label>
                        <input
                            type="number"
                            id="banyakCicilan"
                            value={banyakCicilan}
                            onChange={(e) => setBanyakCicilan(Math.max(1, Number(e.target.value)))}
                            required
                            className='invalid:border-red-500 invalid:focus:ring-red-500 valid:border-green-500 valid:focus:ring-green-500 p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2'
                        />
                    </div>

                    {/* Bunga */}
                    <div>
                        <label htmlFor="bunga" className="block text-sm font-medium text-gray-700">
                            Bunga dalam Persentase (%)
                        </label>
                        <input
                            type="number"
                            id="bunga"
                            value={bunga}
                            onChange={(e) => setBunga(Math.max(0, Number(e.target.value)))}
                            required
                            className="invalid:border-red-500 invalid:focus:ring-red-500 valid:border-green-500 valid:focus:ring-green-500 p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2"
                        />
                    </div>

                    {/* Jenis Peminjam */}
                    <div>
                        <label htmlFor="jenisPeminjam" className="block text-sm font-medium text-gray-700">
                            Jenis Peminjam
                        </label>
                        <select
                            id="jenisPeminjam"
                            value={jenisPeminjam}
                            onChange={(e) => setJenisPeminjam(e.target.value as 'Perorangan' | 'Kelompok')}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:ring-2"
                        >
                            <option value="Perorangan">Perorangan</option>
                            <option value="Kelompok">Kelompok</option>
                        </select>
                    </div>

                    {/* Keterangan */}
                    <div className="col-span-2">
                        <label htmlFor="keterangan" className="block text-sm font-medium text-gray-700">
                            Keterangan
                        </label>
                        <textarea
                            id="keterangan"
                            value={keterangan}
                            onChange={(e) => setKeterangan(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:ring-2"
                            rows={3}
                        />
                    </div>

                    {/* Tombol Simpan */}
                    <div className="col-span-2 flex justify-center mt-6">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                        >
                            Simpan
                        </button>
                    </div>

                    {/* Pesan Error Umum */}
                    {errors.general && (
                        <div className="col-span-2 text-center mt-4">
                            <p className="text-red-500 text-sm">{errors.general}</p>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};