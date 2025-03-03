// presentation/components/ProfilNasabah.tsx
import React from "react";
import { Nasabah } from "../../core/entities/Nasabah";
import { NasabahDetail } from "../../core/entities/NasabahDetail";
import { EditableField } from "../components/EditableField";
import { TeleponEditableField } from "./TeleponEditableField";

interface ProfilNasabahProps {
  nasabah: Nasabah;
  detail: NasabahDetail | null;
  onSave: (field: string, value: any) => Promise<void>;
}

export const ProfilNasabah: React.FC<ProfilNasabahProps> = ({ nasabah, detail, onSave }) => {
  return (
    <div className="p-6">
      {/* Informasi Utama */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-7 gap-x-5">
        <div className="col-span-1 md:col-span-2 p-3 pt-0">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Informasi Pribadi</h2>
          <div className="space-y-4">
          <EditableField
              label="No.KTA"
              value={nasabah.noKta}
              onSave={(value) => onSave("naoKta", value)}
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
        <div className="flex justify-center col-span-1">
          <div className="w-48 h-48 bg-gray-200 rounded-lg overflow-hidden">
            {detail?.foto ? (
              <img
                src={URL.createObjectURL(detail.foto)}
                alt="Foto Nasabah"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                Tidak ada foto
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Informasi Detail */}
      <h2 className="text-2xl text-center font-semibold text-gray-700 mb-4">Detail Profil</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-3">
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
  );
};