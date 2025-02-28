import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { NasabahRepository } from "../../data/repositories/IndexDB/NasabahRepository";
// import { NasabahDetailRepository } from "../../data/repositories/NasabahDetailRepository";
import { Nasabah } from "../../data/repositories/IndexDB/NasabahRepository";
import { NasabahDetail } from "../../data/repositories/IndexDB/NasabahDetailRepository";

const nasabahRepo = new NasabahRepository();
// const nasabahDetailRepo = new NasabahDetailRepository();

export const ProfilNasabahPage = () => {
  const { id } = useParams<{ id: string }>();
  const [nasabah, setNasabah] = useState<Nasabah | null>(null);
  const [detail, setDetail] = useState<NasabahDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        const nasabahId = Number(id);
        const nasabahData = await nasabahRepo.nasabah.get(nasabahId);
        // const detailData = await nasabahDetailRepo.nasabahDetail
        //   .where("nasabahId")
        //   .equals(nasabahId)
        //   .first();

        if (!nasabahData) {
          throw new Error("Data nasabah tidak ditemukan");
        }

        setNasabah(nasabahData);
        setDetail(/* detailData || */ null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Terjadi kesalahan");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [id]);

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
          <button
            onClick={() => navigate("/")}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>
    );
  }

  if (!nasabah) {
    return null;
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
                <InfoItem label="Nama" value={nasabah.nama} />
                <InfoItem label="Telepon" value={nasabah.telepon} />
                <InfoItem label="NIK" value={nasabah.nik} />
                <InfoItem label="Alamat" value={nasabah.alamat} />
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
          {detail && (
            <>
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Detail Profil</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InfoItem label="Tanggal Lahir" value={detail.tanggalLahir.toLocaleDateString()} />
                <InfoItem label="Pekerjaan/Usaha" value={detail.pekerjaanUsaha} />
                <InfoItem label="Status Perkawinan" value={detail.statusPerkawinan} />
                <InfoItem label="Nama Pasangan" value={detail.namaPasangan} />
                <InfoItem label="Nama Penjamin" value={detail.penjamin.nama} />
                <InfoItem label="Hubungan Penjamin" value={detail.penjamin.hubungan} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// Komponen kecil untuk menampilkan info
const InfoItem = ({ label, value }: { label: string; value: string | null }) => (
  <div>
    <p className="text-sm text-gray-600">{label}</p>
    <p className="font-medium text-gray-800">{value || "-"}</p>
  </div>
);