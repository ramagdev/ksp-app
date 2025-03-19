// src/components/inputs/FotoInput.tsx
import { useState, useEffect } from "react";

interface FotoInputProps {
  onFileSelected: (file: File | null) => void;
  initialPreview?: string | null;
}

export const FotoInput = ({ onFileSelected, initialPreview }: FotoInputProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialPreview || null);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Cleanup URL sementara saat komponen unmount atau previewUrl berubah
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const processFile = (file: File | null) => {
    // Revoke URL lama sebelum membuat yang baru
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    if (!file) {
      setPreviewUrl(null);
      onFileSelected(null);
      return;
    }

    if (!file.type.startsWith("image/")) {
      setError("File harus berupa gambar");
      setPreviewUrl(null);
      onFileSelected(null);
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Ukuran file maksimal 5MB");
      setPreviewUrl(null);
      onFileSelected(null);
      return;
    }

    setError(null);
    const preview = URL.createObjectURL(file);
    setPreviewUrl(preview);
    onFileSelected(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    processFile(file || null);
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    processFile(file);
  };

  return (
    <div className="w-full md:w-1/3">
      <label htmlFor="foto" className="px-11 block text-sm font-medium text-gray-700">
        Foto
      </label>
      <div className="flex items-center justify-center pt-2 pb-2">
        <label
          htmlFor="foto"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`w-60 h-80 flex flex-col justify-center items-center p-4 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
            isDragging
              ? "bg-blue-100 border-blue-500"
              : previewUrl
              ? "bg-gray-100 border-gray-300"
              : "text-gray-500 border-gray-400"
          }`}
        >
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Preview Foto"
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <>
              <svg
                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              {isDragging ? (
                <span>Lepaskan untuk Upload</span>
              ) : (
                <div className="flex flex-col text-sm text-gray-600 justify-center items-center">
                  <p>Pilih</p>
                  <p>atau</p>
                  <p>Geser dan Jatuhkan Foto</p>
                  <p>di sini</p>
                </div>
              )}
            </>
          )}
          <input
            type="file"
            id="foto"
            onChange={handleFileChange}
            className="hidden"
            accept="image/*"
          />
        </label>
      </div>

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      {previewUrl && (
        <p className="text-sm text-gray-600 mt-2">
          Foto akan diupload setelah data nasabah tersimpan
        </p>
      )}
    </div>
  );
};