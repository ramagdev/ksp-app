import { useState } from "react";
import { NasabahIndexedDBRepository as NasabahRepository } from "../../data/repositories/IndexDB/NasabahRepository";
import { NasabahDetailIndexedDBRepository as NasabahDetailRepository } from "../../data/repositories/IndexDB/NasabahDetailRepository";
import { useNavigate } from "react-router-dom";

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
  const [hubunganPenjamin, setHubunganPenjamin] = useState<"Anak" | "Orang Tua" | "Saudara">("Saudara");
  const [teleponPenjamin, setTeleponPenjamin] = useState("");
  const [foto, setFoto] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!nama.trim()) newErrors.nama = "Nama harus diisi.";
    if (!telepon.trim()) newErrors.telepon = "Telepon harus diisi.";
    if (!nik.trim()) newErrors.nik = "NIK harus diisi.";
    if (!alamat.trim()) newErrors.alamat = "Alamat harus diisi.";

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
      const nasabahId = await nasabahRepo.nasabah.add({ noKta, nama, 
        telepon: telepon.replace(/[^0-9]/g, ""),
        nik, alamat, kodeMarketing });
      await nasabahDetailRepo.nasabahDetail.add({
        nasabahId,
        tanggalLahir,
        pekerjaanUsaha,
        statusPerkawinan,
        namaPasangan,
        namaPenjamin,
        hubunganPenjamin,
        teleponPenjamin: teleponPenjamin.replace(/[^0-9]/g, ""),
        foto,
      });
      navigate("/home");
    } catch (err) {
      setErrors({ general: "Gagal menambahkan nasabah. Silakan coba lagi." });
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="max-w-7xl p-6 bg-white shadow-md rounded-lg my-10">
        <h1 className="text-3xl font-semibold text-gray-700 mb-6 text-center">Tambah Nasabah</h1>

        <form onSubmit={handleSubmit} className="flex justify-center flex-wrap gap-7 gap-x-10">
          <div className="w-full md:w-1/3">
            <label htmlFor="noKta" className="block text-sm font-medium text-gray-700">
              No KTA
            </label>
            <input
              type="text"
              id="noKta"
              value={noKta}
              onChange={(e) => setNoKta(e.target.value)}
              placeholder="No KTA"
              className="p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {errors.noKta && <p className="text-red-500 text-sm mt-1">{errors.noKta}</p>}
          </div>
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
              required
            />
            {errors.nama && <p className="text-red-500 text-sm mt-1">{errors.nama}</p>}
          </div>
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
              className="p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {errors.telepon && <p className="text-red-500 text-sm mt-1">{errors.telepon}</p>}
          </div>
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
              className="p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {errors.nik && <p className="text-red-500 text-sm mt-1">{errors.nik || "NIK harus 16 digit angka"}</p>}
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
              required
            />
            {errors.alamat && <p className="text-red-500 text-sm mt-1">{errors.alamat}</p>}
          </div>
          <div className="w-full md:w-1/3">
            <label htmlFor="kodeMarketingarketing" className="block text-sm font-medium text-gray-700">
              Kode Marketing
            </label>
            <input
              type="text"
              id="kodeMarketingarketing"
              value={kodeMarketing}
              onChange={(e) => setKodeMarketing(e.target.value)}
              placeholder="Kode Marketing"
              className="p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {errors.kodeMarketing && <p className="text-red-500 text-sm mt-1">{errors.kodeMarketing}</p>}
          </div>
          {/* Field lainnya */}
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
              onChange={(e) => setStatusPerkawinan(e.target.value as 'Belum Menikah' | 'Menikah' | 'Duda' | 'Janda')}
              className="p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Belum Menikah">Belum Menikah</option>
              <option value="Menikah">Menikah</option>
              <option value="Duda">Duda</option>
              <option value="Janda">Janda</option>
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
              onChange={(e) => setHubunganPenjamin(e.target.value as 'Anak' | 'Orang Tua' | 'Saudara')}
              className="p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Anak">Anak</option>
              <option value="Orang Tua">Orang Tua</option>
              <option value="Saudara">Saudara</option>
            </select>
          </div>
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
          <div className="w-full md:w-1/3">
            <label htmlFor="foto" className="px-11 block text-sm font-medium text-gray-700">
              Foto
            </label>
            <div className="flex items-center justify-center pt-2 pb-2">
              <label
                htmlFor="foto"
                className="w-60 h-80 flex flex-col justify-center items-center p-4 text-gray-500 border-2 border-dashed rounded-lg cursor-pointer"
              >
                <svg
                  className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round" // Diubah ke camelCase
                    strokeLinejoin="round" // Diubah ke camelCase
                    strokeWidth="2" // Diubah ke camelCase
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
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
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
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