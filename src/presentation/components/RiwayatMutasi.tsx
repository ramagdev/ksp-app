import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PinjamanMutationTable from "./tables/PinjamanMutationTable";
import { getAllPinjamanByNasabahId } from "../../container";
import { Pinjaman } from "../../core/entities/Mutasi/Pinjaman";


interface RiwayatMutasiProps {
  nasabahId: number;
  renderCounter: number;
  onDelete: (message?: string) => void;
}

const RiwayatMutasi = ({ nasabahId, renderCounter, onDelete }: RiwayatMutasiProps) => {
  // State untuk menyimpan data pinjaman
  const [pinjamanList, setPinjamanList] = useState<Pinjaman[]>([]);
  const [openTableId, setOpenTableId] = useState<number | null>(null);
  const [message, setMessage] = useState<string>("");
  const [deleteClicked, setDeleteClicked] = useState(false);

  useEffect(() => {
        if (deleteClicked) {
          onDelete(message); // Panggil onDelete hanya setelah message diperbarui
          setDeleteClicked(false);
        }
      }, [message, deleteClicked, onDelete]);

  // Fetch data pinjaman
  const fetchPinjaman = async (nasabahId: number) => {
    try {
      const unsortedPinjamanList = await getAllPinjamanByNasabahId.execute(nasabahId);
      if(!unsortedPinjamanList) {
        setPinjamanList([]);
      } else {
        const pinjamanList = unsortedPinjamanList.sort((a, b) => b.tanggalPinjaman.getTime() - a.tanggalPinjaman.getTime());
      setPinjamanList(pinjamanList);
      }
    } catch (error) {
      console.error("Error fetching pinjamanList:", error);
      setPinjamanList([]); // Set ke array kosong jika terjadi error
    }
  };
  useEffect(() => {
    fetchPinjaman(nasabahId);
  }, [nasabahId, renderCounter]);

  // Fungsi untuk toggle collapse/expand
  useEffect(() => {
    setOpenTableId(pinjamanList[0]?.id || null);
  }, [pinjamanList]);

  const toggleTable = (id: number) => {
    setOpenTableId((prevId) => (prevId === id ? null : id));
  };

  // Tampilkan pesan jika tidak ada data
  if (pinjamanList.length === 0) {
    return <div className="p-4 text-gray-600">Tidak ada data pinjaman.</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold text-md mb-4">Mutasi</h1>
      {pinjamanList.map((pinjaman) => (
        <div key={pinjaman.id} className="mb-4 border rounded-lg overflow-hidden">
          {/* Header untuk tabel yang di-collapse */}
          <div
            className="flex justify-between items-center p-4 bg-gray-100 cursor-pointer"
            onClick={() => {
              if (pinjaman.id !== undefined) {
                toggleTable(pinjaman.id);
              }
            }}
          >
            <div>
              <span className="font-semibold ">
                Tanggal Peminjaman: {pinjaman.tanggalPinjaman.toLocaleDateString("id-ID")}
              </span>
              <span className="text-sm ml-5 text-gray-600">Pinjaman Pokok: Rp {pinjaman.jumlahPinjaman.toLocaleString("id-ID")},-</span>

              <span className="ml-5 text-sm text-gray-600">
                Status: {pinjaman.status}
              </span>
            </div>
            <button
              className="text-blue-500 hover:text-blue-700"
              aria-label={openTableId === pinjaman.id ? "Tutup tabel" : "Buka tabel"}
            >
              {openTableId === pinjaman.id ? "Tutup" : "Buka"}
            </button>
          </div>

          {/* Tabel yang expandable dengan animasi */}
          <AnimatePresence>
            {openTableId === pinjaman.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div>
                  <PinjamanMutationTable
                    pinjamanId={pinjaman.id}
                    renderCounter={renderCounter}
                    onDelete={(message, deleteClicked) => {
                      setMessage(message)
                      setDeleteClicked(deleteClicked)
                    }}
                    onDeleteSuccess={() => fetchPinjaman(nasabahId)}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

export default RiwayatMutasi; 