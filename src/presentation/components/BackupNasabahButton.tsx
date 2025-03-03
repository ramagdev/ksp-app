import React, { useState } from 'react';
import { BackupNasabahToExcel } from '../../core/usecases/BackupNasabahToExcel';
import { NasabahIndexedDBRepository } from '../../data/repositories/IndexDB/NasabahRepository';

const BackupNasabahButton: React.FC<{ isSidebarOpen: boolean }> = ({ isSidebarOpen }) => {
  const [error, setError] = useState<string | null>(null); // State untuk menyimpan pesan error

  const handleBackup = async () => {
    const repository = new NasabahIndexedDBRepository();
    const backupUseCase = new BackupNasabahToExcel(repository);

    try {
    //   Simulasikan error untuk testing
    //   await Promise.reject(new Error('Gagal melakukan backup'));

      const blob = await backupUseCase.execute();

      // Buat link untuk mengunduh file Excel
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'nasabah_backup.xlsx'; // Nama file
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setError(null); // Reset error jika backup berhasil
    } catch (error) {
      console.error('Gagal melakukan backup:', error);
      setError('Gagal melakukan backup. Silakan coba lagi.'); // Set pesan error
    }
  };

  return (
    <div>
      {/* Tombol Backup */}
      <button
        onClick={handleBackup}
        className="flex items-center p-2 rounded-md hover:bg-gray-700 w-full text-left"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
          />
        </svg>
        {isSidebarOpen && <span className="ml-3">Backup Data</span>}
      </button>

      {/* Tampilkan pesan error jika ada */}
      {error && (
        <div className="mt-2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}
    </div>
  );
};

export default BackupNasabahButton;