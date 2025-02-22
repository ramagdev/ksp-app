import { useState } from "react";
import { NasabahRepository } from "../../data/repositories/NasabahRepository";
import { NasabahDetailRepository } from "../../data/repositories/NasabahDetailRepository";
import { useNavigate } from "react-router-dom";

const nasabahRepo = new NasabahRepository();
const nasabahDetailRepo = new NasabahDetailRepository();

export const TambahNasabahPage = () => {
  const [nama, setNama] = useState("");
  const [telepon, setTelepon] = useState("");
  const [nik, setNik] = useState("");
  const [alamat, setAlamat] = useState("");
  const [tanggalLahir, setTanggalLahir] = useState<Date>(new Date());
  const [pekerjaanUsaha, setPekerjaan] = useState("");
  const [statusPerkawinan, setStatusPerkawinan] = useState<"belum_menikah" | "menikah" | "duda" | "janda">("belum_menikah");
  const [namaPasangan, setNamaPasangan] = useState("");
  const [namaPenjamin, setNamaPenjamin] = useState("");
  const [hubunganPenjamin, setHubunganPenjamin] = useState<"anak" | "orang_tua" | "saudara">("saudara");
  const [foto, setFoto] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const nasabahId = await nasabahRepo.nasabah.add({ nama, telepon, nik, alamat });
    await nasabahDetailRepo.nasabahDetail.add({
      nasabahId, 
      tanggalLahir, 
      pekerjaanUsaha, 
      statusPerkawinan, 
      namaPasangan,
      penjamin: {
        nama: namaPenjamin,
        hubungan: hubunganPenjamin
      }, 
      foto
    });
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="max-w-7xl p-6 bg-white shadow-md rounded-lg my-10">
        <h1 className="text-3xl font-semibold text-gray-700 mb-6 text-center">Tambah Nasabah</h1>

        <form className="flex justify-center flex-wrap gap-7 gap-x-10">
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
              className="p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="w-full md:w-1/3">
            <label htmlFor="telepon" className="block text-sm font-medium text-gray-700">
              Telepon
            </label>
            <input
              type="text"
              id="telepon"
              value={telepon}
              onChange={(e) => setTelepon(e.target.value)}
              placeholder="Telepon"
              className="p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="w-full md:w-1/3">
            <label htmlFor="nik" className="block text-sm font-medium text-gray-700">
              NIK
            </label>
            <input
              type="text"
              id="nik"
              value={nik}
              onChange={(e) => setNik(e.target.value)}
              placeholder="NIK"
              className="p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
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
              className="p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
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
          <div className="w-full md:w-1/3">
            <label htmlFor="pekerjaanUsaha" className="block text-sm font-medium text-gray-700">
              Pekerjaan/ Usaha
            </label>
            <input
              type="text"
              id="pekerjaanUsaha"
              value={pekerjaanUsaha}
              onChange={(e) => setPekerjaan(e.target.value)}
              placeholder="Pekerjaan/ Usaha"
              className="p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="w-full md:w-1/3">
            <label htmlFor="statusPerkawinan" className="block text-sm font-medium text-gray-700">
              Status Perkawinan
            </label>
            <select
              id="statusPerkawinan"
              value={statusPerkawinan}
              onChange={(e) => setStatusPerkawinan(e.target.value as 'belum_menikah' | 'menikah' | 'duda' | 'janda')}
              className="p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="belum_menikah">Belum Menikah</option>
              <option value="menikah">Menikah</option>
              <option value="duda">Duda</option>
              <option value="janda">Janda</option>
            </select>
          </div>
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
          <div className="w-full md:w-1/3">
          <label htmlFor="hubunganPenjamin" className="block text-sm font-medium text-gray-700">
              Hubungan Penjamin
            </label>
            <select
              id="hubunganPenjamin"
              value={hubunganPenjamin}
              onChange={(e) => setHubunganPenjamin(e.target.value as 'anak' | 'orang_tua' | 'saudara')}
              className="p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="anak">Anak</option>
              <option value="orang_tua">Orang Tua</option>
              <option value="saudara">Saudara</option>
            </select>
          </div>
          <div className="w-full md:w-1/3">
            <label htmlFor="foto" className="px-11 block text-sm font-medium text-gray-700">
              Foto
            </label>
            <div className="flex items-center justify-center pt-2 pb-2">
              <label
                htmlFor="foto"
                className="w-60 h-80 flex flex-col justify-center items-center p-4 text-gray-500 border-2 border-dashed rounded-lg cursor-pointer"
              >
                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                </svg>
                <p className="mb-2 text-m">Upload file photo</p>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Klik untuk upload</span>
                </p>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  atau
                </p>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  drag and drop
                </p>

                <input
                  type="file"
                  id="foto"
                  onChange={(e) => setFoto(e.target.files?.[0] || null)}
                  className="hidden"
                  accept="image/*"
                />
              </label>
            </div>
          </div>
          <div className="w-full flex justify-center mt-4">
            <button
              type="submit"
              onClick={handleSubmit}
              className="text-white px-6 py-2 rounded-lg"
            >
              Simpan
            </button>
          </div>
        </form>
       </div>
    </div>
  );
};