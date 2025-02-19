import { useState } from "react";
import { Nasabah, NasabahRepository } from "../../data/repositories/NasabahRepository";


const nasabahRepo = new NasabahRepository();

export const MockHomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [nasabahList, setNasabahList] = useState<Nasabah[]>([]);

  const handleSearch = async () => {
    const results = await nasabahRepo.nasabah
      .where("nama")
      .startsWithIgnoreCase(searchQuery)
      .toArray();
    setNasabahList(results);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Daftar Nasabah</h1>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Cari berdasarkan nama, telepon, atau NIK"
        className="p-2 border rounded w-full mb-4"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Cari
      </button>
      <ul className="mt-4">
        {nasabahList.map((nasabah) => (
          <li key={nasabah.id} className="border-b py-2">
            {nasabah.nama} - {nasabah.telepon} - {nasabah.nik}
          </li>
        ))}
      </ul>
    </div>
  );
};