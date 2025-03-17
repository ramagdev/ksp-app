import React, { useState } from "react";
import { RupiahInput } from "../../components/inputs/RupiahInput";
import { createCicilanPayment } from "../../../container"; // Asumsikan ada fungsi untuk membuat pembayaran cicilan

interface TabBayarCicilanProps {
  pinjamanId: number | null;
  onPaymentSuccess: (jumlahPembayaran: number) => void;
}

export const TabBayarCicilan: React.FC<TabBayarCicilanProps> = ({
  pinjamanId,
  onPaymentSuccess
}) => {

  if (!pinjamanId) {
    return <div>Belum ada data pinjaman.</div>;
  }
  const [jumlahPembayaran, setJumlahPembayaran] = useState<number>(0);
  const [tanggalPembayaran, setTanggalPembayaran] = useState<Date>(new Date());
  const [keterangan, setKeterangan] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      await createCicilanPayment.execute(
        pinjamanId,
        jumlahPembayaran,
        tanggalPembayaran,
        keterangan
      );
      setMessage({ type: "success", text: "Pembayaran berhasil dicatat!" });
      onPaymentSuccess(jumlahPembayaran); // Panggil callback untuk memberi tahu parent
    } catch (error) {
      console.log(error);
      setMessage({ type: "error", text: "Gagal mencatat pembayaran. Silakan coba lagi." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-700">Bayar Cicilan</h3>
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
          <RupiahInput
            id="jumlahPembayaran"
            label="Jumlah Pembayaran"
            onChange={(value) => setJumlahPembayaran(Number(value))}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Tanggal Pembayaran</label>
          <input
            type="date"
            value={tanggalPembayaran.toISOString().split("T")[0]}
            onChange={(e) => setTanggalPembayaran(new Date(e.target.value))}
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