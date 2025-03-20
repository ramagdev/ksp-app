// ui/pages/RestoreFromExcelPage.tsx
import React, { useState } from 'react';
import { restoreUseCases } from '../../container';

const RestoreFromExcelPage: React.FC = () => {
  const [selectedRepository, setSelectedRepository] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const availableRepositories = Object.keys(restoreUseCases);

  const handleRepositoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRepository(e.target.value);
    setFile(null);
    setError(null);
    setSuccess(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError(null);
      setSuccess(null);
    }
  };

  const handleRestore = async () => {
    if (!selectedRepository) {
      setError('Silakan pilih repository terlebih dahulu!');
      return;
    }
    if (!file) {
      setError('Silakan pilih file Excel untuk diunggah!');
      return;
    }

    const useCase = restoreUseCases[selectedRepository];
    if (!useCase) {
      setError('Use case untuk repository ini belum dikonfigurasi!');
      return;
    }

    setIsLoading(true);
    try {
      await useCase.execute(file);
      setSuccess(`Data dari ${selectedRepository} berhasil dipulihkan!`);
      setError(null);
      setFile(null);
    } catch (error) {
      console.error(`Gagal memulihkan data untuk ${selectedRepository}:`, error);
      setError('Gagal memulihkan data. Pastikan file sesuai dengan skema.');
      setSuccess(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-purple-200">
      <div className="max-w-7xl p-6 bg-white shadow-md rounded-lg my-10 w-full md:w-1/2">
        <h1 className="text-3xl font-semibold text-gray-700 mb-6 text-center">
          Restore Data dari Excel
        </h1>

        {/* Dropdown untuk memilih repository */}
        <div className="mb-6">
          <label
            htmlFor="repository"
            className="block text-sm font-medium text-gray-700"
          >
            Pilih Repository
          </label>
          <select
            id="repository"
            value={selectedRepository}
            onChange={handleRepositoryChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-200"
            disabled={isLoading}
          >
            <option value="">-- Pilih Repository --</option>
            {availableRepositories.map((repo) => (
              <option key={repo} value={repo}>
                {repo}
              </option>
            ))}
          </select>
        </div>

        {/* Input file */}
        <div className="mb-6">
          <label htmlFor="file" className="block text-sm font-medium text-gray-700">
            Pilih File Excel
          </label>
          <input
            type="file"
            id="file"
            accept=".xlsx"
            onChange={handleFileChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-200"
            disabled={!selectedRepository || isLoading}
          />
        </div>

        {/* Tombol Restore */}
        <div className="w-full flex justify-center">
          <button
            onClick={handleRestore}
            className={`w-full py-2 px-4 rounded-lg text-white font-bold ${
              isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-700'
            }`}
            disabled={isLoading}
          >
            {isLoading ? 'Memproses...' : 'Restore Data'}
          </button>
        </div>

        {/* Feedback */}
        {error && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg w-full">
            <strong className="font-bold">Error: </strong>
            <span>{error}</span>
          </div>
        )}
        {success && (
          <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-lg w-full">
            <strong className="font-bold">Sukses: </strong>
            <span>{success}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default RestoreFromExcelPage;