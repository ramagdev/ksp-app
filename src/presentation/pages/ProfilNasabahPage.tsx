import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Tab } from "@headlessui/react";
import { Nasabah } from "../../core/entities/Nasabah";
import { NasabahDetail } from "../../core/entities/NasabahDetail";
import { NasabahIndexedDBRepository as NasabahRepository } from "../../data/repositories/IndexedDB/NasabahRepository";
import { NasabahDetailIndexedDBRepository as NasabahDetailRepository } from "../../data/repositories/IndexedDB/NasabahDetailRepository";
import { EditNasabahProfile } from "../../core/usecases/EditNasabahProfile";
import { ProfilNasabah } from "../components/ProfilNasabah";
import { ModalCatatTransaksi } from "./modalpages/ModalCatatTransaksi";
import ToastNotification from "../components/ToastNotifications";
import RiwayatMutasi from "../components/RiwayatMutasi";

const nasabahRepo = new NasabahRepository();
const nasabahDetailRepo = new NasabahDetailRepository();
const editProfileUseCase = new EditNasabahProfile(nasabahRepo, nasabahDetailRepo);

export const ProfilNasabahPage = () => {
  const { id } = useParams<{ id: string }>();
  const [nasabah, setNasabah] = useState<Nasabah | null>(null);
  const [detail, setDetail] = useState<NasabahDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState<string>("");
  const [showToast, setShowToast] = useState(false);
  const [renderCounter, setRenderCounter] = useState(0);

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
            foto: null,
          }
        )
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

    const { success, error } = await editProfileUseCase.execute(
      nasabah.id!,
      field,
      value
    );

    if (success) {
      const updatedNasabah = await nasabahRepo.nasabah.get(nasabah.id!);
      const updatedDetail = await nasabahDetailRepo.nasabahDetail
        .where("nasabahId")
        .equals(nasabah.id!)
        .first();

      setNasabah(updatedNasabah || null);
      setDetail(updatedDetail || null);

    } else {
      setError(error);
    }
  };

  const handleCatatTransaksi = () => {
    setIsModalOpen(true);
  };

  const handleDataChange = async () => {
    setRenderCounter((prevCounter) => prevCounter + 1);

    // if (nasabah) {
    //   await fetchPinjamanId(nasabah.id!); // Fetch ulang pinjamanId
    // }
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
      {showToast && (
        <ToastNotification
          message={notificationMessage}
          onClose={() => setShowToast(false)}
        />
      )}
      <h1 className="text-3xl font-semibold text-gray-700 mb-6 text-center">Profil Nasabah</h1>
      <Tab.Group>
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
        <Tab.Panels className="mt-4">
          <Tab.Panel className="bg-white p-4 rounded-lg shadow">
            <ProfilNasabah nasabah={nasabah} detail={detail} onSave={handleSave} />
          </Tab.Panel>
          <Tab.Panel className="bg-white p-4 rounded-lg shadow">
            <div className="flex-col justify-between items-center">
              <div className="flex justify-end items-center mb-4">
                <button
                  onClick={handleCatatTransaksi}
                  className="bg-blue-500 text-white mr-5 px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  + Catat Transaksi
                </button>
              </div>
              {nasabah.id && (
                <RiwayatMutasi nasabahId={nasabah.id} renderCounter={renderCounter} 
                onDelete={async (msg) => {
                  if (msg !== "" && msg !== undefined) {
                    setNotificationMessage(msg);
                    setShowToast(true);
                  }
                }}
                />
              )}
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
      {isModalOpen && nasabah.id && (
        <ModalCatatTransaksi
          nasabahId={nasabah.id}
          namaNasabah={nasabah.nama}
          onClose={async (msg) => {
            await handleDataChange(); // Panggil handleDataChange
            setIsModalOpen(false);

            if (msg !== "" && msg !== undefined) {
              setNotificationMessage(msg);
              setShowToast(true);
            }
          }}
        />
      )}
    </div>
  );
};