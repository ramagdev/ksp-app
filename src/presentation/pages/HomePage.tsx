import { useState, useEffect } from "react";
import { NasabahRepository, Nasabah } from "../../data/repositories/NasabahRepository";
import NasabahList from "../components/NasabahList";
import { useDebounce } from 'use-debounce';

const nasabahRepo = new NasabahRepository();

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [allNasabah, setAllNasabah] = useState<Nasabah[]>([]);
  const [filteredNasabah, setFilteredNasabah] = useState<Nasabah[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [debouncedQuery] = useDebounce(searchQuery, 700);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const allData = await nasabahRepo.nasabah.toArray();
        console.log(allData);
        setAllNasabah(allData);
        setFilteredNasabah(allData);
      } catch (err) {
        setError("Gagal memuat data nasabah");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadInitialData();
  }, []);

  useEffect(() => {
    const filterResults = () => {
      const lowerQuery = debouncedQuery.toLowerCase();
      const filtered = allNasabah.filter(nasabah =>
        nasabah.nama.toLowerCase().includes(lowerQuery)
      );
      setFilteredNasabah(filtered);
    };

    filterResults();
  }, [debouncedQuery, allNasabah]);

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="w-full p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-3xl font-semibold text-gray-700 mb-6 text-center">Daftar Nasabah</h1>
        <div className="mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari berdasarkan nama..."
            className="p-3 border border-gray-300 rounded-lg w-80 md:w-96 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="overflow-x-auto">
          <NasabahList
            nasabahList={filteredNasabah}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </div>
    </div>
  );
}