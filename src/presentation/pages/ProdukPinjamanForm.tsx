import React, { useState } from 'react';
import { createProdukPinjaman } from '../../container';
import { RequiredTextInput } from '../components/inputs/RequiredTextInput';
import { useNavigate } from 'react-router-dom';

export const ProdukPinjamanForm = () => {
    const [namaProduk, setNamaProduk] = useState('');
    const [jarakCicilan, setJarakCicilan] = useState(0);
    const [bunga, setBunga] = useState(0);
    const [jenisPeminjam, setJenisPeminjam] = useState<'Perorangan' | 'Kelompok'>('Perorangan');
    const [maksimumPinjaman, setMaksimumPinjaman] = useState(0);
    const [minimumPinjaman, setMinimumPinjaman] = useState(0);
    const [keterangan, setKeterangan] = useState('');
    const [errors, setErrors] = useState<Record<string, string>>({});
    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        if (!namaProduk.trim()) newErrors.namaProduk = "Nama Produk harus diisi.";
        if (jarakCicilan <= 0) newErrors.jarakCicilan = "Jarak Cicilan harus lebih besar dari 0.";

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
                bunga,
                jenisPeminjam,
                maksimumPinjaman,
                minimumPinjaman,
                keterangan
            };

            const id = await createProdukPinjaman.execute(produkPinjaman);
            navigate('/produk-pinjaman');
            console.log('Produk Pinjaman created with ID:', id);
        } catch (err) {
            setErrors({ general: "Gagal menambahkan produk pinjaman. Silakan coba lagi." });
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-4xl p-6 bg-white shadow-md rounded-lg my-10">
                <h1 className="text-3xl font-semibold text-gray-700 mb-6 text-center">Tambah Produk Pinjaman</h1>

                <form noValidate onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Nama Produk */}
                    <div className="col-span-2">
                        <RequiredTextInput
                            id={namaProduk}
                            onChange={(e) => setNamaProduk(e.target.value)}
                            label="Nama Produk"
                            errorMsg={errors.namaProduk}
                        />
                    </div>

                    {/* Jarak Cicilan */}
                    <div>
                        <label htmlFor="jarakCicilan" className="block text-sm font-medium text-gray-700">
                            Jarak Cicilan (hari, minimal 1 hari)
                        </label>
                        <input
                            type="number"
                            id="jarakCicilan"
                            value={jarakCicilan}
                            onChange={(e) => setJarakCicilan(Math.max(1, Number(e.target.value)))}
                            min={1}
                            required
                            className="invalid:border-red-500 invalid:focus:ring-red-500 valid:border-green-500 valid:focus:ring-green-500 p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2"
                        />
                        {errors.jarakCicilan && <p className="text-red-500 text-sm mt-1">{errors.jarakCicilan}</p>}
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
                            onChange={(e) => setBunga(Number(e.target.value))}
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
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="Perorangan">Perorangan</option>
                            <option value="Kelompok">Kelompok</option>
                        </select>
                    </div>

                    {/* Maksimum Pinjaman */}
                    <div>
                        <label htmlFor="maksimumPinjaman" className="block text-sm font-medium text-gray-700">
                            Maksimum Pinjaman
                        </label>
                        <input
                            type="number"
                            id="maksimumPinjaman"
                            value={maksimumPinjaman}
                            onChange={(e) => setMaksimumPinjaman(Number(e.target.value))}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>

                    {/* Minimum Pinjaman */}
                    <div>
                        <label htmlFor="minimumPinjaman" className="block text-sm font-medium text-gray-700">
                            Minimum Pinjaman
                        </label>
                        <input
                            type="number"
                            id="minimumPinjaman"
                            value={minimumPinjaman}
                            onChange={(e) => setMinimumPinjaman(Number(e.target.value))}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
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
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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