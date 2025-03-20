import { useState, useEffect } from "react";
import { Nasabah } from "../../core/entities/Nasabah";
import { NasabahIndexedDBRepository as NasabahRepository } from "../../data/repositories/IndexedDB/NasabahIndexedDBRepository";
import NasabahList from "../components/NasabahList";
import { useDebounce } from "use-debounce";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"; // Ikon pencarian

const nasabahRepo = new NasabahRepository();

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [allNasabah, setAllNasabah] = useState<Nasabah[]>([]);
  const [filteredNasabah, setFilteredNasabah] = useState<Nasabah[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [debouncedQuery] = useDebounce(searchQuery, 300);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const allData = await nasabahRepo.nasabah.toArray();
        setAllNasabah(allData);
        setFilteredNasabah(allData); // Set filteredNasabah dengan data awal
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
      const filtered = allNasabah.filter((nasabah) =>
        nasabah.nama.toLowerCase().includes(lowerQuery) ||
        nasabah.noKta.toLowerCase().includes(lowerQuery) ||
        nasabah.nik.toLowerCase().includes(lowerQuery) ||
        nasabah.kodeMarketing.toLowerCase().includes(lowerQuery)
      );
      setFilteredNasabah(filtered); // Update filteredNasabah dengan hasil pencarian
    };
  
    filterResults();
  }, [debouncedQuery, allNasabah]);

  return (
    <div className="min-h-screen bg-gray-50 rounded-lg py-8">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex sm:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Daftar Nasabah</h1>
          <div className="relative md:w-1/3 sm:w-80 mt-4 sm:mt-0 mr-10">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama, no KTA, NIK, atau kode marketing"
              className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>

        {/* Konten Tabel */}

          {filteredNasabah.length === 0 && !isLoading ? (
            <div className="text-center text-gray-500">
              Tidak ada data nasabah yang cocok dengan pencarian.
            </div>
          ) : (
            <NasabahList
              nasabahList={filteredNasabah}
              isLoading={isLoading}
              error={error}
            />
          )}

      </div>
    </div>
  );
} 