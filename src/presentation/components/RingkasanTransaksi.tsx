// presentation/components/RingkasanTransaksi.tsx
import React from "react";
import { Transaksi } from "../../core/entities/Transaksi";

interface RingkasanTransaksiProps {
  transaksiList: Transaksi[];
}

export const RingkasanTransaksi: React.FC<RingkasanTransaksiProps> = ({ transaksiList }) => {
  const totalDibayar = transaksiList
    .filter((c) => c.status === "Cicilan")
    .reduce((sum, c) => sum + c.jumlahTransaksi, 0);

  const sisaPinjaman =
    transaksiList
      .filter((c) => c.status === "Pinjaman")
      .reduce((sum, c) => sum + c.jumlahTransaksi, 0) -
    totalDibayar;

  const lastPaymentDate = transaksiList
    .filter((c) => c.status === "Cicilan")
    .sort((a, b) => b.tanggalTransaksi.getTime() - a.tanggalTransaksi.getTime())[0]?.tanggalTransaksi;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-blue-100 p-4 rounded-lg">
        <p className="text-sm text-blue-800">Total Cicilan Dibayar</p>
        <p className="text-xl font-bold text-blue-900">Rp {totalDibayar.toLocaleString()}</p>
      </div>
      <div className="bg-yellow-100 p-4 rounded-lg">
        <p className="text-sm text-yellow-800">Sisa Pinjaman</p>
        <p className="text-xl font-bold text-yellow-900">Rp {sisaPinjaman.toLocaleString()}</p>
      </div>
      <div className="bg-green-100 p-4 rounded-lg">
        <p className="text-sm text-green-800">Tanggal Cicilan Terakhir</p>
        <p className="text-xl font-bold text-green-900">
          {lastPaymentDate ? lastPaymentDate.toLocaleDateString() : "-"}
        </p>
      </div>
    </div>
  );
};