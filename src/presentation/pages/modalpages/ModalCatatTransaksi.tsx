import React, { useState, useEffect } from "react";
import { Tab } from "@headlessui/react";
import { TabPinjamanBaru } from "../tabpages/TabPinjamanBaru";
import { TabBayarCicilan } from "../tabpages/TabBayarCicilan";
import { getPinjamanIdByNasabahId } from "../../../container";

interface ModalCatatTransaksiProps {
  nasabahId: number;
  namaNasabah: string;
  onClose: (message?: string) => void;
}

export const ModalCatatTransaksi: React.FC<ModalCatatTransaksiProps> = ({ 
  nasabahId, 
  namaNasabah, 
  onClose 
}) => {
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pinjamanId, setPinjamanId] = useState<number | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const pinjamanId = await getPinjamanIdByNasabahId.execute(nasabahId);
        if (pinjamanId) {
          setSelectedTab(1);
          setPinjamanId(pinjamanId);
        } else {
          setSelectedTab(0);
        }
      } catch (error) {
        setError("Terjadi kesalahan saat memuat data.");
      } finally {
        setIsLoading(false);
      }
    }

    loadData();

  }, [nasabahId]);
  
  // Gunakan useEffect untuk memantau perubahan pada `message`
  useEffect(() => {
    if (message) {
      onClose(message); // Panggil onClose hanya setelah message diperbarui
    }
  }, [message]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/75 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
        {/* Tanda Silang (X) */}
        <button
          onClick={() => { 
            onClose();
          }}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Catat Transaksi</h2>
        <p className="text-sm text-gray-600 mb-4">Untuk: <span className="font-medium">{namaNasabah}</span></p>
        <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
          <Tab.List className="flex space-x-2 border-b border-gray-200">
            <Tab
              className={`py-2 px-4 text-sm font-medium ${
                selectedTab === 0
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Pinjaman Baru
            </Tab>
            <Tab
              className={`py-2 px-4 text-sm font-medium ${
                selectedTab === 1
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Bayar Cicilan
            </Tab>
          </Tab.List>
          <Tab.Panels className="mt-4">
            <Tab.Panel>
              <TabPinjamanBaru
                nasabahId={nasabahId}
                onCreateSuccess={(jumlahPinjaman) => {
                  setMessage("Berhasil mencatat pinjaman sebesar Rp." + jumlahPinjaman + " untuk " + namaNasabah);
                }}
              />
            </Tab.Panel>
            <Tab.Panel>
              <TabBayarCicilan
                pinjamanId={pinjamanId}
                onPaymentSuccess={(jumlahPembayaran) => {
                  setMessage("Berhasil mencatat pembayaran sebesar Rp." + jumlahPembayaran + " untuk " + namaNasabah);
                }}
              />
              {error && <p className="text-red-500 mt-2">{error}</p>}
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};