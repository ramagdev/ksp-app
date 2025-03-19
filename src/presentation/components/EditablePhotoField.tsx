// src/components/EditablePhotoField.tsx
import { useState, useEffect, useRef } from "react";
import { PencilIcon } from "@heroicons/react/24/outline";
import { uploadPhoto, getPhotoUrl } from "../../container"; // Impor dari container

interface EditablePhotoFieldProps {
  nasabahId: number;
  initialPhotoUrl?: string | null;
  onSave: (photoUrl: string) => void;
}

export const EditablePhotoField = ({
  nasabahId,
  initialPhotoUrl,
  onSave,
}: EditablePhotoFieldProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialPhotoUrl || null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mengambil URL foto saat komponen dimuat atau nasabahId berubah
  useEffect(() => {
    const loadPhotoUrl = async () => {
      try {
        const url = await getPhotoUrl.execute(nasabahId);
        setPreviewUrl(url);
      } catch (err: any) {
        console.error("Gagal memuat URL foto:", err.message);
      }
    };
    loadPhotoUrl();

    // Cleanup untuk revoke URL saat komponen unmount atau previewUrl berubah
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [nasabahId]);

  const handleUpload = async (file: File) => {
    try {
      setIsLoading(true);
      setError(null);

      // Gunakan use case uploadPhoto dari container
      console.log("Mengupload foto untuk nasabahId:", nasabahId);
      const newPhotoUrl = await uploadPhoto.execute(nasabahId, file, {
        maxWidth: 800,
        maxHeight: 800,
      });

      if (newPhotoUrl) {
        console.log("URL foto baru:", newPhotoUrl);
        setPreviewUrl(newPhotoUrl); // Set URL baru
        onSave(newPhotoUrl); // Panggil callback onSave
        setIsEditing(false);
      }
    } catch (err: any) {
      setError(err.message || "Gagal mengupload foto");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Revoke URL lama sebelum membuat yang baru
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
    }
  };

  const handleCancel = () => {
    // Revoke previewUrl jika ada dan kembalikan ke initialPhotoUrl
    if (previewUrl && previewUrl !== initialPhotoUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(initialPhotoUrl || null);
    setIsEditing(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="group relative">
      <div className="flex items-center gap-4">
        <div className="relative">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Foto Nasabah"
              className="w-70 h-70 rounded-full object-cover border-2 border-gray-200"
            />
          ) : (
            <div className="w-70 h-70 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">Belum Ada Foto</span>
            </div>
          )}

          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="absolute -right-2 -top-2 bg-white rounded-full p-1 shadow-sm border hover:bg-gray-50 transition-colors"
            >
              <PencilIcon className="h-5 w-5 text-gray-600 hidden group-hover:block" />
            </button>
          )}
        </div>

        {isEditing && (
          <div className="flex flex-col gap-2">
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              disabled={isLoading}
            />

            <div className="flex flex-col gap-2 w-min">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="text-sm px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
                disabled={isLoading}
              >
                Pilih Foto
              </button>

              {fileInputRef.current?.files?.[0] && (
                <>
                  <button
                    onClick={() => handleUpload(fileInputRef.current!.files![0])}
                    disabled={isLoading}
                    className="text-sm px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400"
                  >
                    {isLoading ? "Mengupload..." : "Simpan"}
                  </button>
                  <button
                    onClick={handleCancel}
                    disabled={isLoading}
                    className="text-sm px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-gray-400"
                  >
                    Batal
                  </button>
                </>
              )}
            </div>

            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
        )}
      </div>
    </div>
  );
};