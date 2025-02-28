import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Transaksi } from "../../core/entities/Transaksi";

interface GrafikTransaksiProps {
  transaksiList: Transaksi[];
}

export const GrafikTransaksi: React.FC<GrafikTransaksiProps> = ({ transaksiList }) => {
  // Fungsi untuk menghitung akumulasi cicilan dan pinjaman
  const calculateAccumulatedData = (transaksiList: Transaksi[]) => {
    let jumlahCicilan = 0;
    let jumlahPinjaman = 0;

    return transaksiList.map((transaksi) => {
      if (transaksi.status === "Cicilan") {
        jumlahCicilan += transaksi.jumlahTransaksi;
      } else if (transaksi.status === "Pinjaman") {
        jumlahPinjaman += transaksi.jumlahTransaksi;
      }

      return {
        tanggal: transaksi.tanggalTransaksi.toLocaleDateString(),
        jumlahCicilan,
        jumlahPinjaman,
      };
    });
  };

  // Data yang sudah diakumulasi
  const data = calculateAccumulatedData(transaksiList);

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2">Progres Transaksi</h3>
      <div className="w-full h-[200px] sm:h-[300px]">
        {" "}
        {/* Responsif untuk mobile */}
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}
            margin={({ top: 5, right: 30, left: 20, bottom: 5 })}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="tanggal" />
            <YAxis/>
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="jumlahCicilan"
              stroke="#82ca9d"
              name="Total Cicilan"
            />
            <Line
              type="monotone"
              dataKey="jumlahPinjaman"
              stroke="#ff7300"
              name="Total Pinjaman"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};