import React, { useState } from 'react';
import { BackupMultipleTablesToExcel } from '../../core/usecases/BackupMultipleTablesToExcel';
import { NasabahIndexedDBRepository } from '../../data/repositories/IndexedDB/NasabahRepository';
import { NasabahDetailIndexedDBRepository } from '../../data/repositories/IndexedDB/NasabahDetailRepository';

const MIN_BACKUP_INTERVAL = 5 * 60 * 1000; // 5 menit dalam milidetik
const BackupMultipleTablesButton: React.FC<{ isSidebarOpen: boolean; isMenuOpen: boolean }> = ({ isSidebarOpen, isMenuOpen }) => {
  const [error, setError] = useState<string | null>(null); // State untuk menyimpan pesan error

  const handleBackup = async () => {
    const lastBackupTime = localStorage.getItem('lastBackupTime');
    const currentTime = new Date().getTime();

    // Cek apakah jarak waktu sejak backup terakhir sudah memenuhi batas minimal
    if (lastBackupTime && currentTime - parseInt(lastBackupTime) < MIN_BACKUP_INTERVAL) {
      setError(`Anda hanya bisa melakukan backup sekali setiap ${MIN_BACKUP_INTERVAL / 60000} menit.`);
      return;
    }

    const repositories = {
      Nasabah: new NasabahIndexedDBRepository(),
      NasabahDetail: new NasabahDetailIndexedDBRepository(),
    };

    const backupUseCase = new BackupMultipleTablesToExcel(repositories);

    try {
      //   Simulasikan error untuk testing
      //await Promise.reject(new Error('Gagal melakukan backup'));
      
      // Lakukan backup
      const backups = await backupUseCase.execute();

      // Unduh setiap file Excel
      for (const [tableName, blob] of Object.entries(backups)) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        const timestamp = new Date().toISOString().replace(/\d\d\.\d+Z$/, '').replace(/-|:/g, '').replace('T', '_');
        a.download = `${tableName}_backup_${timestamp}.xlsx`; // Nama file dengan timestamp
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }

      // Simpan waktu terakhir backup
      localStorage.setItem('lastBackupTime', currentTime.toString());
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
        <div className="group">
          <span className="ml-5 absolute -translate-y-4 text-black opacity-0 group-hover:opacity-100 bg-white text-sm px-2 py-1 rounded">Backup Data</span>
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
        </div>
        {(isMenuOpen || isSidebarOpen) && <span className="ml-3">Backup Data</span>}
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

export default BackupMultipleTablesButton;