// presentation/components/ProfilNasabah.tsx
import React , { useState, useEffect } from "react";
import { Nasabah } from "../../core/entities/Nasabah";
import { NasabahDetail } from "../../core/entities/NasabahDetail";
import { EditableField } from "../components/EditableField";
import { TeleponEditableField } from "./inputs/TeleponEditableField";
import { EditablePhotoField } from "./EditablePhotoField";
import { getPhotoUrl } from "../../container";


interface ProfilNasabahProps {
  nasabah: Nasabah;
  detail: NasabahDetail | null;
  onSave: (field: string, value: any) => Promise<void>;
}

export const ProfilNasabah: React.FC<ProfilNasabahProps> = ({ nasabah, detail, onSave }) => {
  const [initialPhotoUrl, setInitialPhotoUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPhoto = async () => {
      try {
        console.log(nasabah.id);
        const url = await getPhotoUrl.execute(nasabah.id!);
        console.log(url);

        setInitialPhotoUrl(url);
      } catch (error) {
        console.error("Error loading photo:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPhoto();

    return () => {
      if (initialPhotoUrl) {
        URL.revokeObjectURL(initialPhotoUrl);
      }
    };
  }, [nasabah.id]);

  const handleSavePhoto = (newUrl: string) => {
    // Update state atau lakukan aksi lain setelah save
    setInitialPhotoUrl(newUrl);
  };

  if (isLoading) return <div>Memuat foto...</div>;


  return (
    <div className="p-6 space-y-6">
      {/* Informasi Utama */}
      <div className="p-4 rounded-lg shadow">
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-7 gap-x-5 w-4/5 mx-auto">
          <div className="col-span-1 p-3 pt-0">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Informasi Pribadi</h2>
            <div className="space-y-4">
              <EditableField
                label="No.KTA"
                value={nasabah.noKta}
                onSave={(value) => onSave("noKta", value)}
              />
              <EditableField
                label="Nama"
                value={nasabah.nama}
                onSave={(value) => onSave("nama", value)}
              />
              <TeleponEditableField
                label="Telepon"
                value={nasabah.telepon}
                onSave={(value) => onSave("telepon", value)}
              />
              <EditableField
                label="NIK"
                value={nasabah.nik}
                onSave={(value) => onSave("nik", value)}
              />
              <EditableField
                label="Alamat"
                value={nasabah.alamat}
                onSave={(value) => onSave("alamat", value)}
              />
              <EditableField
                label="Kode Marketing"
                value={nasabah.kodeMarketing}
                onSave={(value) => onSave("kodeMarketing", value)}
              />
            </div>
          </div>

          {/* Foto */}
          <div className="mx-auto">
            {nasabah.id && (
              <div className="flip-in">
                <EditablePhotoField
                  nasabahId={nasabah.id}
                  initialPhotoUrl={initialPhotoUrl}
                  onSave={handleSavePhoto}
                />
              </div>
            )}
          </div>
          
        </div>
      </div>

      {/* Informasi Detail */}
      <div className="p-8 rounded-lg shadow">
      <h2 className="text-2xl text-center font-semibold text-gray-700 mt-2 mb-4">Detail Profil</h2>
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 p-3">
        <div className="grid gap-y-7 md:col-start-2 md:col-span-2">
          <EditableField
            label="Tanggal Lahir"
            value={detail?.tanggalLahir ? detail.tanggalLahir: ""}
            type="date"
            onSave={(value) => onSave("tanggalLahir", value)}
          />
          <EditableField
            label="Pekerjaan/Usaha"
            value={detail?.pekerjaanUsaha || ""}
            onSave={(value) => onSave("pekerjaanUsaha", value)}
          />
          <EditableField
            label="Status Perkawinan"
            value={detail?.statusPerkawinan || ""}
            type="select"
            options={[
              { value: "Belum Menikah", label: "Belum Menikah" },
              { value: "Menikah", label: "Menikah" },
              { value: "Duda", label: "Duda" },
              { value: "Janda", label: "Janda" },
            ]}
            onSave={(value) => onSave("statusPerkawinan", value)}
          />
          <EditableField
            label="Nama Pasangan"
            value={detail?.namaPasangan || ""}
            onSave={(value) => onSave("namaPasangan", value)}
          />
        </div>
        <div className="grid gap-y-7 md:col-start-5 md:col-span-2">
          <EditableField
            label="Nama Penjamin"
            value={detail?.namaPenjamin || ""}
            onSave={(value) => onSave("namaPenjamin", value)}
          />
          <EditableField
            label="Hubungan Penjamin"
            value={detail?.hubunganPenjamin || ""}
            type="select"
            options={[
              { value: "Anak", label: "Anak" },
              { value: "Orang Tua", label: "Orang Tua" },
              { value: "Saudara", label: "Saudara" },
              { value: "Lainnya", label: "Lainnya" },
            ]}
            onSave={(value) => onSave("hubunganPenjamin", value)}
          />
          <TeleponEditableField
            label="Telepon Penjamin"
            value={detail?.teleponPenjamin || ""}
            onSave={(value) => onSave("teleponPenjamin", value)}
          />
        </div>
        
      </div>
      </div>

    </div>
  );
};