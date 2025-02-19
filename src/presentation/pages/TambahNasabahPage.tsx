import { useState } from "react";
import { NasabahRepository } from "../../data/repositories/NasabahRepository";
import { useNavigate } from "react-router-dom";

const nasabahRepo = new NasabahRepository();

export const TambahNasabahPage = () => {
  const [nama, setNama] = useState("");
  const [telepon, setTelepon] = useState("");
  const [nik, setNik] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    await nasabahRepo.nasabah.add({ nama, telepon, nik });
    navigate("/");
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Tambah Nasabah</h1>
      <input
        type="text"
        value={nama}
        onChange={(e) => setNama(e.target.value)}
        placeholder="Nama"
        className="p-2 border rounded w-full mb-4"
      />
      <input
        type="text"
        value={telepon}
        onChange={(e) => setTelepon(e.target.value)}
        placeholder="Telepon"
        className="p-2 border rounded w-full mb-4"
      />
      <input
        type="text"
        value={nik}
        onChange={(e) => setNik(e.target.value)}
        placeholder="NIK"
        className="p-2 border rounded w-full mb-4"
      />
      <button
        onClick={handleSubmit}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Simpan
      </button>
    </div>
  );
};