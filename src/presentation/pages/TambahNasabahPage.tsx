// src/pages/TambahNasabahPage.tsx
import { useState } from "react";
import { NasabahIndexedDBRepository as NasabahRepository } from "../../data/repositories/IndexedDB/NasabahIndexedDBRepository";
import { NasabahDetailIndexedDBRepository as NasabahDetailRepository } from "../../data/repositories/IndexedDB/NasabahDetailRepository";
import { useNavigate } from "react-router-dom";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { FotoInput } from "../components/inputs/FotoInput";
import { uploadPhoto } from "../../container";

const nasabahRepo = new NasabahRepository();
const nasabahDetailRepo = new NasabahDetailRepository();

export const TambahNasabahPage = () => {
  const [noKta, setNoKta] = useState("");
  const [nama, setNama] = useState("");
  const [telepon, setTelepon] = useState("");
  const [nik, setNik] = useState("");
  const [alamat, setAlamat] = useState("");
  const [kodeMarketing, setKodeMarketing] = useState("");
  const [tanggalLahir, setTanggalLahir] = useState<Date>(new Date());
  const [pekerjaanUsaha, setPekerjaan] = useState("");
  const [statusPerkawinan, setStatusPerkawinan] = useState<"Belum Menikah" | "Menikah" | "Duda" | "Janda">("Belum Menikah");
  const [namaPasangan, setNamaPasangan] = useState("");
  const [namaPenjamin, setNamaPenjamin] = useState("");
  const [hubunganPenjamin, setHubunganPenjamin] = useState<"Anak" | "Orang Tua" | "Saudara" | "Lainnya">("Saudara");
  const [teleponPenjamin, setTeleponPenjamin] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!noKta.trim()) newErrors.noKta = "No KTA harus diisi.";
    if (!nama.trim()) newErrors.nama = "Nama harus diisi.";
    if (!telepon.trim()) newErrors.telepon = "Telepon harus diisi.";
    if (!nik.trim()) newErrors.nik = "NIK harus diisi.";
    if (!alamat.trim()) newErrors.alamat = "Alamat harus diisi.";
    if (!kodeMarketing.trim()) newErrors.kodeMarketing = "Kode Marketing harus diisi.";
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      // Simpan data nasabah utama
      const nasabahId = await nasabahRepo.nasabah.add({
        noKta,
        nama,
        telepon: telepon.replace(/[^0-9]/g, ""),
        nik,
        alamat,
        kodeMarketing,
      });

      // Simpan data detail
      await nasabahDetailRepo.nasabahDetail.add({
        nasabahId,
        tanggalLahir,
        pekerjaanUsaha,
        statusPerkawinan,
        namaPasangan,
        namaPenjamin,
        hubunganPenjamin,
        teleponPenjamin: teleponPenjamin.replace(/[^0-9]/g, ""),
      });

      // Upload foto jika ada
      if (selectedPhoto) {
        try {
          setIsUploadingPhoto(true);
          const photoUrl = await uploadPhoto.execute(nasabahId, selectedPhoto, {
            maxWidth: 800,
            maxHeight: 600,
          });
          if (!photoUrl) {
            setUploadError("Foto gagal diupload, tetapi data nasabah tersimpan.");
          }
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : "Unknown error";
          setUploadError(`Data nasabah berhasil disimpan, tetapi gagal upload foto: ${errorMessage}`);
        } finally {
          setIsUploadingPhoto(false);
        }
      }

      // Navigasi hanya jika tidak ada error kritis
      if (!uploadError || !selectedPhoto) {
        navigate("/home");
      }
    } catch (err) {
      setErrors({ general: "Gagal menambahkan nasabah. Silakan coba lagi." });
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="max-w-7xl p-6 bg-white shadow-md rounded-lg my-10">
        <h1 className="text-3xl font-semibold text-gray-700 mb-6 text-center">Tambah Nasabah</h1>

        <form noValidate onSubmit={handleSubmit} className="flex justify-center flex-wrap gap-7 gap-x-10">
          {/* Field Nama */}
          <div className="w-full md:w-1/3">
            <label htmlFor="nama" className="block text-sm font-medium text-gray-700">
              Nama
            </label>
            <input
              type="text"
              id="nama"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              placeholder="Nama"
              required
              className="peer invalid:border-red-500 invalid:focus:ring-red-500 valid:border-green-500 valid:focus:ring-green-500 p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2"
            />
            <div className="pointer-events-none opacity-0 peer-valid:opacity-100 -translate-y-7 justify-end flex mr-3">
              <CheckCircleIcon className="h-5 w-5 text-green-500" />
            </div>
            {errors.nama && <p className="text-red-500 text-sm mt-1">{errors.nama}</p>}
          </div>

          {/* Field NIK */}
          <div className="w-full md:w-1/3">
            <label htmlFor="nik" className="block text-sm font-medium text-gray-700">
              NIK
            </label>
            <input
              type="text"
              id="nik"
              value={nik}
              onChange={(e) => setNik(e.target.value.replace(/\D+/g, ""))}
              placeholder="NIK"
              pattern="[0-9]{16}"
              required
              className="peer invalid:border-red-500 invalid:focus:ring-red-500 valid:border-green-500 valid:focus:ring-green-500 p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2"
            />
            <div className="pointer-events-none opacity-0 peer-valid:opacity-100 -translate-y-7 justify-end flex mr-3">
              <CheckCircleIcon className="h-5 w-5 text-green-500" />
            </div>
            {errors.nik && <p className="text-red-500 text-sm mt-1">{errors.nik || "NIK harus 16 digit angka"}</p>}
          </div>

          {/* Field No KTA */}
          <div className="w-full md:w-1/3">
            <label htmlFor="noKta" className="block text-sm font-medium text-gray-700">
              No.KTA
            </label>
            <input
              type="text"
              id="noKta"
              value={noKta}
              onChange={(e) => setNoKta(e.target.value)}
              placeholder="No KTA"
              required
              className="peer invalid:border-red-500 invalid:focus:ring-red-500 valid:border-green-500 valid:focus:ring-green-500 p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2"
            />
            <div className="pointer-events-none opacity-0 peer-valid:opacity-100 -translate-y-7 justify-end flex mr-3">
              <CheckCircleIcon className="h-5 w-5 text-green-500" />
            </div>
            {errors.noKta && <p className="text-red-500 text-sm mt-1">{errors.noKta}</p>}
          </div>

          {/* Field Telepon */}
          <div className="w-full md:w-1/3">
            <label htmlFor="telepon" className="block text-sm font-medium text-gray-700">
              Telepon
            </label>
            <input
              type="text"
              id="telepon"
              value={telepon}
              onChange={(e) => {
                const value = e.target.value.replace(/\D+/g, "");
                const result = [];
                for (let i = 0; i < value.length; i += 4) {
                  result.push(value.substring(i, i + 4));
                }
                setTelepon(result.join("-"));
              }}
              placeholder="08xx-xxxx-xxxx"
              required
              className="peer invalid:border-red-500 invalid:focus:ring-red-500 valid:border-green-500 valid:focus:ring-green-500 p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2"
            />
            <div className="pointer-events-none opacity-0 peer-valid:opacity-100 -translate-y-7 justify-end flex mr-3">
              <CheckCircleIcon className="h-5 w-5 text-green-500" />
            </div>
            {errors.telepon && <p className="text-red-500 text-sm mt-1">{errors.telepon}</p>}
          </div>

          {/* Field Alamat */}
          <div className="w-full md:w-1/3">
            <label htmlFor="alamat" className="block text-sm font-medium text-gray-700">
              Alamat
            </label>
            <input
              type="text"
              id="alamat"
              value={alamat}
              onChange={(e) => setAlamat(e.target.value)}
              placeholder="Alamat"
              required
              className="peer invalid:border-red-500 invalid:focus:ring-red-500 valid:border-green-500 valid:focus:ring-green-500 p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2"
            />
            <div className="pointer-events-none opacity-0 peer-valid:opacity-100 -translate-y-7 justify-end flex mr-3">
              <CheckCircleIcon className="h-5 w-5 text-green-500" />
            </div>
            {errors.alamat && <p className="text-red-500 text-sm mt-1">{errors.alamat}</p>}
          </div>

          {/* Field Kode Marketing */}
          <div className="w-full md:w-1/3">
            <label htmlFor="kodeMarketing" className="block text-sm font-medium text-gray-700">
              Kode Marketing
            </label>
            <input
              type="text"
              id="kodeMarketing"
              value={kodeMarketing}
              onChange={(e) => setKodeMarketing(e.target.value)}
              placeholder="Kode Marketing"
              required
              className="peer invalid:border-red-500 invalid:focus:ring-red-500 valid:border-green-500 valid:focus:ring-green-500 p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2"
            />
            <div className="pointer-events-none opacity-0 peer-valid:opacity-100 -translate-y-7 justify-end flex mr-3">
              <CheckCircleIcon className="h-5 w-5 text-green-500" />
            </div>
            {errors.kodeMarketing && <p className="text-red-500 text-sm mt-1">{errors.kodeMarketing}</p>}
          </div>

          {/* Field Tanggal Lahir */}
          <div className="w-full md:w-1/3">
            <label htmlFor="tanggalLahir" className="block text-sm font-medium text-gray-700">
              Tanggal Lahir
            </label>
            <input
              type="date"
              id="tanggalLahir"
              value={tanggalLahir.toISOString().split("T")[0]}
              onChange={(e) => setTanggalLahir(new Date(e.target.value))}
              placeholder="Tanggal Lahir"
              className="p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Field Pekerjaan */}
          <div className="w-full md:w-1/3">
            <label htmlFor="pekerjaanUsaha" className="block text-sm font-medium text-gray-700">
              Pekerjaan/Usaha
            </label>
            <input
              type="text"
              id="pekerjaanUsaha"
              value={pekerjaanUsaha}
              onChange={(e) => setPekerjaan(e.target.value)}
              placeholder="Pekerjaan/Usaha"
              className="p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Field Status Perkawinan */}
          <div className="w-full md:w-1/3">
            <label htmlFor="statusPerkawinan" className="block text-sm font-medium text-gray-700">
              Status Perkawinan
            </label>
            <select
              id="statusPerkawinan"
              value={statusPerkawinan}
              onChange={(e) => setStatusPerkawinan(e.target.value as "Belum Menikah" | "Menikah" | "Duda" | "Janda")}
              className="p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Belum Menikah">Belum Menikah</option>
              <option value="Menikah">Menikah</option>
              <option value="Duda">Duda</option>
              <option value="Janda">Janda</option>
            </select>
          </div>

          {/* Field Nama Pasangan */}
          <div className="w-full md:w-1/3">
            <label htmlFor="namaPasangan" className="block text-sm font-medium text-gray-700">
              Nama Pasangan
            </label>
            <input
              type="text"
              id="namaPasangan"
              value={namaPasangan}
              onChange={(e) => setNamaPasangan(e.target.value)}
              placeholder="Nama Pasangan"
              className="p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Field Nama Penjamin */}
          <div className="w-full md:w-1/3">
            <label htmlFor="namaPenjamin" className="block text-sm font-medium text-gray-700">
              Nama Penjamin
            </label>
            <input
              type="text"
              id="namaPenjamin"
              value={namaPenjamin}
              onChange={(e) => setNamaPenjamin(e.target.value)}
              placeholder="Nama Penjamin"
              className="p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Field Hubungan Penjamin */}
          <div className="w-full md:w-1/3">
            <label htmlFor="hubunganPenjamin" className="block text-sm font-medium text-gray-700">
              Hubungan Penjamin
            </label>
            <select
              id="hubunganPenjamin"
              value={hubunganPenjamin}
              onChange={(e) => setHubunganPenjamin(e.target.value as "Anak" | "Orang Tua" | "Saudara" | "Lainnya")}
              className="p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Anak">Anak</option>
              <option value="Orang Tua">Orang Tua</option>
              <option value="Saudara">Saudara</option>
              <option value="Lainnya">Lainnya</option>
            </select>
          </div>

          {/* Field Telepon Penjamin */}
          <div className="w-full md:w-1/3">
            <label htmlFor="teleponPenjamin" className="block text-sm font-medium text-gray-700">
              Telepon Penjamin
            </label>
            <input
              type="text"
              id="teleponPenjamin"
              value={teleponPenjamin}
              onChange={(e) => {
                const value = e.target.value.replace(/\D+/g, "");
                const result = [];
                for (let i = 0; i < value.length; i += 4) {
                  result.push(value.substring(i, i + 4));
                }
                setTeleponPenjamin(result.join("-"));
              }}
              placeholder="08xx-xxxx-xxxx"
              className="p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Foto Input */}
          <FotoInput onFileSelected={setSelectedPhoto} />

          {/* Pesan Error atau Status */}
          {uploadError && (
            <div className="mt-4 p-3 bg-yellow-100 text-yellow-800 rounded w-full">
              {uploadError}
            </div>
          )}
          {isUploadingPhoto && (
            <div className="mt-4 p-3 bg-blue-100 text-blue-800 rounded w-full">
              Mengupload foto...
            </div>
          )}

          {/* Tombol Submit */}
          <div className="w-full flex justify-center mt-4">
            <button
              type="submit"
              disabled={isUploadingPhoto}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg disabled:bg-gray-400"
            >
              Simpan
            </button>
          </div>
          {errors.general && <p className="text-red-500 text-sm mt-2 text-center">{errors.general}</p>}
        </form>
      </div>
    </div>
  );
};