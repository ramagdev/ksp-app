// presentation/pages/HistoryTransaksiPage.tsx
import React, { useEffect, useState } from "react";
import { TransaksiRepository } from "../../data/repositories/IndexDB/TransaksiRepository";
import { GetTransaksiByNasabahId } from "../../core/usecases/GetTransaksiByNasabahId";
import { RingkasanTransaksi } from "./RingkasanTransaksi";
import { TabelTransaksi } from "./TabelTransaksi";
import { GrafikTransaksi } from "./GrafikTransaksi";
import { Transaksi } from "../../core/entities/Transaksi";

interface HistoryTransaksiProps {
  nasabahId: number;
}

const transaksiRepo = new TransaksiRepository();
const getTransaksiUseCase = new GetTransaksiByNasabahId(transaksiRepo);

export const HistoryTransaksi: React.FC<HistoryTransaksiProps> = ({ nasabahId }) => {
  const [transaksiList, setTransaksiList] = useState<Transaksi[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTransaksi = async () => {
      try {
        const data = await getTransaksiUseCase.execute(nasabahId);
        setTransaksiList(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Terjadi kesalahan");
      } finally {
        setIsLoading(false);
      }
    };

    loadTransaksi();
  }, [nasabahId]);

  if (isLoading) {
    return <div className="p-6">Loading...</div>;
  }

  if (error) {
    return <div className="p-6">Error: {error}</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">History Transaksi</h2>
      <RingkasanTransaksi transaksiList={transaksiList} />
      <GrafikTransaksi transaksiList={transaksiList} />
      <TabelTransaksi transaksiList={transaksiList} />
    </div>
  );
};