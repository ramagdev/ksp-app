import React, { useState } from "react";
import { Tab } from "@headlessui/react";
import { TabPinjamanBaru } from "../tabpages/TabPinjamanBaru";
import { createNewLoan, getAllProdukPinjaman } from "../../../container";

interface ModalCatatTransaksiProps {
  nasabahId: number;
  onClose: () => void;
}

export const ModalCatatTransaksi: React.FC<ModalCatatTransaksiProps> = ({ nasabahId, onClose }) => {
  const [selectedTab, setSelectedTab] = useState<number>(0);

  return (
    <div className="fixed inset-0 bg-black/75 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
        {/* Tanda Silang (X) */}
        <button
          onClick={onClose}
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
                onCreateSuccess={(pinjamanId) => {
                  console.log("Pinjaman berhasil dibuat dengan ID:", pinjamanId);
                  onClose();
                }}
                createNewLoan={createNewLoan}
                getAllProdukPinjaman={getAllProdukPinjaman}
              />
            </Tab.Panel>
            <Tab.Panel>
              {/* Tambahkan komponen untuk Bayar Cicilan di sini */}
              <div className="text-gray-700">Fitur Bayar Cicilan akan segera hadir.</div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};