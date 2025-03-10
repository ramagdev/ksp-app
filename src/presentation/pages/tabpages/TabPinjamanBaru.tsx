import React, { useState, useEffect } from "react";
import { ProdukPinjamanEntity } from "../../../core/entities/Mutasi/ProdukPinjaman";
import { RupiahInput } from "../../components/inputs/RupiahInput";
import { getAllProdukPinjaman, createNewLoan } from "../../../container";

interface TabPinjamanBaruProps {
  nasabahId: number;
  onCreateSuccess: (pinjamanId: number) => void;
}

export const TabPinjamanBaru: React.FC<TabPinjamanBaruProps> = ({
  nasabahId,
  onCreateSuccess
}) => {
  const [jumlahPinjaman, setJumlahPinjaman] = useState<number>(0);
  const [tanggalPinjaman, setTanggalPinjaman] = useState<Date>(new Date());
  const [keterangan, setKeterangan] = useState<string>("");
  const [produkPinjamanId, setProdukPinjamanId] = useState<number | null>(null);
  const [produkPinjamanList, setProdukPinjamanList] = useState<ProdukPinjamanEntity[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Ambil daftar produk pinjaman saat komponen dimuat
  useEffect(() => {
    const fetchProdukPinjaman = async () => {
      const data = await getAllProdukPinjaman.execute();
      setProdukPinjamanList(data);
    };
    fetchProdukPinjaman();
  }, [getAllProdukPinjaman]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    if (!produkPinjamanId) {
      setMessage({ type: "error", text: "Pilih jenis pinjaman terlebih dahulu." });
      setIsLoading(false);
      return;
    }

    try {
      await createNewLoan.execute(
        nasabahId,
        produkPinjamanId,
        jumlahPinjaman,
        tanggalPinjaman,
        keterangan
      );
      setMessage({ type: "success", text: "Pinjaman berhasil dibuat!" });
      onCreateSuccess(jumlahPinjaman); // Panggil callback untuk memberi tahu parent
    } catch (error) {
      setMessage({ type: "error", text: "Gagal membuat pinjaman. Silakan coba lagi." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-700">Pinjaman Baru</h3>
      {message && (
        <div
          className={`p-4 rounded-lg ${
            message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Jenis Pinjaman</label>
          <select
            value={produkPinjamanId || ""}
            onChange={(e) => setProdukPinjamanId(Number(e.target.value))}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:ring-2"
            required
          >
            <option value="">Pilih Jenis Pinjaman</option>
            {produkPinjamanList.map((produk) => (
              <option key={produk.id} value={produk.id}>
                {produk.namaProduk} (Bunga: {produk.bunga}%)
              </option>
            ))}
          </select>
        </div>
        <div>
          <RupiahInput
            id="jumlahPinjaman"
            label="Jumlah Pinjaman"
            onChange={(value) => setJumlahPinjaman(Number(value))}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Tanggal Pinjaman</label>
          <input
            type="date"
            value={tanggalPinjaman.toISOString().split("T")[0]}
            onChange={(e) => setTanggalPinjaman(new Date(e.target.value))}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:ring-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Keterangan (Opsional)</label>
          <input
            type="text"
            value={keterangan}
            onChange={(e) => setKeterangan(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:ring-2"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? "Menyimpan..." : "Simpan"}
        </button>
      </form>
    </div>
  );
};