// presentation/pages/TambahTransaksiPage.tsx
import React from "react";
import { useParams } from "react-router-dom";
import { TransaksiRepository } from "../../data/repositories/IndexDB/TransaksiRepository";
import { AddTransaksiUseCase } from "../../core/usecases/AddTransaksiUseCase";
import { TransaksiForm } from "../components/TransaksiForm";
import { Transaksi } from "../../core/entities/Transaksi";

const transaksiRepo = new TransaksiRepository();
const addTransaksiUseCase = new AddTransaksiUseCase(transaksiRepo);

export const TambahTransaksiPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const nasabahId = Number(id);

  const handleSubmit = async (data: Omit<Transaksi, "id">) => {
    const result = await addTransaksiUseCase.execute(data);
    return result;
  };

  if (isNaN(nasabahId)) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-red-50 p-6 rounded-lg border border-red-200 text-red-600 max-w-md text-center">
          <p className="font-semibold">Error:</p>
          <p>ID Nasabah tidak valid</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <TransaksiForm nasabahId={nasabahId} onSubmit={handleSubmit} />
    </div>
  );
};