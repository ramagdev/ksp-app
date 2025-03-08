import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Tab } from "@headlessui/react";
import { Nasabah} from "../../core/entities/Nasabah";
import { NasabahDetail } from "../../core/entities/NasabahDetail";
import { NasabahIndexedDBRepository as NasabahRepository } from "../../data/repositories/IndexedDB/NasabahRepository";
import { NasabahDetailIndexedDBRepository as NasabahDetailRepository } from "../../data/repositories/IndexedDB/NasabahDetailRepository";
import { EditNasabahProfile } from "../../core/usecases/EditNasabahProfile";
import { ProfilNasabah } from "../components/ProfilNasabah";
// import { HistoryTransaksi } from "../components/HistoryTransaksi";
import { ModalCatatTransaksi } from "./modalpages/ModalCatatTransaksi";

const nasabahRepo = new NasabahRepository();
const nasabahDetailRepo = new NasabahDetailRepository();
const editProfileUseCase = new EditNasabahProfile(nasabahRepo, nasabahDetailRepo);

export const ProfilNasabahPage = () => {
  const { id } = useParams<{ id: string }>();
  const [nasabah, setNasabah] = useState<Nasabah | null>(null);
  const [detail, setDetail] = useState<NasabahDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State untuk modal

  useEffect(() => {
    const loadData = async () => {
      try {
        const nasabahId = Number(id);
        const nasabahData = await nasabahRepo.nasabah.get(nasabahId);
        const detailData = await nasabahDetailRepo.nasabahDetail
          .where("nasabahId")
          .equals(nasabahId)
          .first();

        if (!nasabahData) {
          throw new Error("Data nasabah tidak ditemukan");
        }

        setNasabah(nasabahData);
        setDetail(
          detailData || {
            nasabahId: nasabahId,
            tanggalLahir: new Date(),
            pekerjaanUsaha: "",
            statusPerkawinan: "Belum Menikah",
            namaPasangan: "",
            namaPenjamin: "",
            hubunganPenjamin: "Anak",
            teleponPenjamin: "",
            foto: null
          }
        );
      } catch (err) {
        setError(err instanceof Error ? err.message : "Terjadi kesalahan");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [id]);

  const handleSave = async (field: string, value: any) => {
    if (!nasabah) return;
    console.log(field, value);
    const { success, error } = await editProfileUseCase.execute(
      nasabah.id!,
      field,
      value
    );
  
    if (success) {
      // Ambil ulang data nasabah dan detail dari IndexedDB
      const updatedNasabah = await nasabahRepo.nasabah.get(nasabah.id!);
      const updatedDetail = await nasabahDetailRepo.nasabahDetail
        .where("nasabahId")
        .equals(nasabah.id!)
        .first();
  
      // Perbarui state
      setNasabah(updatedNasabah || null);
      setDetail(updatedDetail || null);
    } else {
      setError(error);
    }
  };

  const handleCatatTransaksi = () => {
    setIsModalOpen(true); // Buka modal
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-red-50 p-6 rounded-lg border border-red-200 text-red-600 max-w-md text-center">
          <p className="font-semibold">Error:</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!nasabah) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-red-50 p-6 rounded-lg border border-red-200 text-red-600 max-w-md text-center">
          <p className="font-semibold">Error:</p>
          <p>Data nasabah tidak ditemukan</p>
        </div>
      </div>
    );
  }

  return (

      <div className="w-full md:max-w-7xl mx-auto p-6 bg-white shadow-md rounded-lg my-10">
        <h1 className="text-3xl font-semibold text-gray-700 mb-6 text-center">Profil Nasabah</h1>
        <Tab.Group>
          {/* Tab List */}
          <Tab.List className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            <Tab
              className={({ selected }) =>
                `w-full py-2.5 text-sm font-medium rounded-lg ${
                  selected
                    ? "bg-white shadow text-blue-600"
                    : "text-gray-600 hover:bg-gray-200"
                }`
              }
            >
              Informasi Profil
            </Tab>
            <Tab
              className={({ selected }) =>
                `w-full py-2.5 text-sm font-medium rounded-lg ${
                  selected
                    ? "bg-white shadow text-blue-600"
                    : "text-gray-600 hover:bg-gray-200"
                }`
              }
            >
              History Transaksi
            </Tab>
          </Tab.List>

          {/* Tab Panels */}
          <Tab.Panels className="mt-4">
            <Tab.Panel className="bg-white p-4 rounded-lg shadow">
              <ProfilNasabah nasabah={nasabah} detail={detail} onSave={handleSave} />
            </Tab.Panel>
            <Tab.Panel className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">History Transaksi</h2>
                <button
                  onClick={handleCatatTransaksi}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  + Catat Transaksi
                </button>
              </div>
              {/* <HistoryTransaksi nasabahId={nasabah.id!} /> */}
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>

        {/* Modal Catat Transaksi */}
        {(isModalOpen && nasabah.id) && (
          <ModalCatatTransaksi
            nasabahId={nasabah.id} // Ganti dengan ID nasabah yang sesuai
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </div>

  );
};