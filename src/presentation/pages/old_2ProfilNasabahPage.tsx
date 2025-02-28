import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { NasabahRepository, Nasabah } from "../../data/repositories/IndexDB/NasabahRepository";
import { NasabahDetailRepository, NasabahDetail } from "../../data/repositories/IndexDB/NasabahDetailRepository";
import { EditNasabahProfile } from "../../core/usecases/EditNasabahProfile";
import { EditableField } from "../components/EditableField";

const nasabahRepo = new NasabahRepository();
const nasabahDetailRepo = new NasabahDetailRepository();
const editProfileUseCase = new EditNasabahProfile(nasabahRepo, nasabahDetailRepo);

export const ProfilNasabahPage = () => {
  const { id } = useParams<{ id: string }>();
  const [nasabah, setNasabah] = useState<Nasabah | null>(null);
  const [detail, setDetail] = useState<NasabahDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load data nasabah dan detail
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
        setDetail(detailData || null);
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
      // Update state lokal
      if (field in nasabah) {
        setNasabah((prev) => (prev ? { ...prev, [field]: value } : null));
      } else if (detail && field in detail) {
        setDetail((prev) => (prev ? { ...prev, [field]: value } : null));
      }
    } else {
      setError(error);
    }
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
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="max-w-7xl p-6 bg-white shadow-md rounded-lg my-10">
      
        {/* Header */}
        <h1 className="text-3xl font-semibold text-gray-700 mb-6 text-center">Profil Nasabah</h1>

        {/* Body */}
        <div className="p-6 m-5 mt-0">

          {/* Informasi Utama */}
          <div className=" grid grid-cols-1 md:grid-cols-3 gap-7 gap-x-5">
            <div className="col-span-1 md:col-span-2 p-3 pt-0 ">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Informasi Pribadi</h2>
              <div className="space-y-4">
                <EditableField
                  label="Nama"
                  value={nasabah.nama}
                  onSave={(value) => handleSave("nama", value)}
                />
                <EditableField
                  label="Telepon"
                  value={nasabah.telepon}
                  onSave={(value) => handleSave("telepon", value)}
                />
                <EditableField
                  label="NIK"
                  value={nasabah.nik}
                  onSave={(value) => handleSave("nik", value)}
                />
                <EditableField
                  label="Alamat"
                  value={nasabah.alamat}
                  onSave={(value) => handleSave("alamat", value)}
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
                  value={
                    detail?.tanggalLahir && detail.tanggalLahir.toISOString().split('T')[0] 
                  }
                  type="date" 
                  onSave={(value) => handleSave("tanggalLahir", value)} />
                <EditableField 
                  label="Pekerjaan/Usaha" 
                  value={
                    detail?.pekerjaanUsaha && detail.pekerjaanUsaha} 
                  onSave={(value) => handleSave("pekerjaanUsaha", value)} />
                <EditableField 
                  label="Status Perkawinan" 
                  value={
                    detail?.statusPerkawinan && detail.statusPerkawinan}
                  type="select" 
                  options={[
                    { value: "Belum Menikah", label: "Belum Menikah" },
                    { value: "Menikah", label: "Menikah" },
                    { value: "Duda", label: "Duda" },
                    { value: "Janda", label: "Janda" }
                  ]} 
                  onSave={(value) => handleSave("statusPerkawinan", value)} />
                <EditableField 
                  label="Nama Pasangan" 
                  value={
                    detail?.namaPasangan && detail.namaPasangan} 
                  onSave={(value) => handleSave("namaPasangan", value)} />
                <EditableField 
                  label="Nama Penjamin" 
                  value={
                    detail?.penjamin?.nama && detail.penjamin.nama} 
                  onSave={(value) => handleSave("penjamin", { nama: value})} />
                <EditableField 
                  label="Hubungan Penjamin" 
                  value={
                    detail?.penjamin?.hubungan && detail.penjamin.hubungan}
                  type="select" 
                  options={[
                    { value: "Anak", label: "Anak" },
                    { value: "Orang Tua", label: "Orang Tua" },
                    { value: "Saudara", label: "Saudara" }
                  ]} 
                  onSave={(value) => handleSave("penjamin", {hubungan: value })} />
              </div>
        </div>
      </div>
    </div>
  );
};