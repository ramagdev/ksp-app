// import React, { useState } from "react";
// // import { TransaksiRepository } from "../../data/repositories/IndexDB/TransaksiRepository";

// interface ModalTambahTransaksiProps {
//   // nasabahId: number;
//   namaNasabah: string; // Tambahkan prop untuk nama nasabah
//   onClose: () => void;
// }

// // const transaksiRepo = new TransaksiRepository();

// // export const ModalTambahTransaksi: React.FC<ModalTambahTransaksiProps> = ({ nasabahId, namaNasabah, onClose }) => {
//   const [tanggal, setTanggal] = useState("");
//   const [jumlah, setJumlah] = useState(""); // Menggunakan string untuk memungkinkan input desimal
//   const [status, setStatus] = useState<"Pinjaman" | "Cicilan">("Cicilan");
//   const [keterangan, setKeterangan] = useState(""); // State untuk keterangan
//   const [error, setError] = useState<string | null>(null);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       // Konversi jumlah ke number (desimal)
//       const jumlahTransaksi = parseFloat(jumlah);

//       // Validasi jumlah transaksi
//       if (isNaN(jumlahTransaksi)) {
//         setError("Jumlah transaksi harus berupa angka.");
//         return;
//       }

//       // await transaksiRepo.add({
//       //   nasabahId,
//       //   tanggalTransaksi: new Date(tanggal),
//       //   jumlahTransaksi,
//       //   status,
//       //   keterangan, // Tambahkan keterangan ke data transaksi
//       // });

//       onClose(); // Tutup modal setelah berhasil
//       window.location.reload(); // Refresh halaman untuk memperbarui data
//     } catch (err) {
//       setError("Gagal menambahkan transaksi. Silakan coba lagi.");
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black/75 flex items-center justify-center">
//       <div className="bg-white p-6 rounded-lg w-full max-w-md">
//         {/* Tambahkan nama nasabah di sini */}
//         <div className="mb-4 pb-4">
//           <h2 className="text-xl font-semibold">Tambah Transaksi</h2>
//           <p className="text-sm text-gray-600">Untuk: <span className="font-medium">{namaNasabah}</span></p>
//         </div>
//         {error && (
//           <div className="bg-red-50 p-2 rounded-lg text-red-600 mb-4">
//             {error}
//           </div>
//         )}
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">Tanggal</label>
//             <input
//               type="date"
//               value={tanggal}
//               onChange={(e) => setTanggal(e.target.value)}
//               className="w-full p-2 border border-gray-300 rounded-lg"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">Jumlah</label>
//             <input
//               type="text" // Menggunakan type="text" untuk memungkinkan input desimal
//               value={jumlah}
//               onChange={(e) => setJumlah(e.target.value)}
//               className="w-full p-2 border border-gray-300 rounded-lg"
//               placeholder="Contoh: 100000.50"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">Status</label>
//             <select
//               value={status}
//               onChange={(e) => setStatus(e.target.value as "Pinjaman" | "Cicilan")}
//               className="w-full p-2 border border-gray-300 rounded-lg"
//             >
//               <option value="Cicilan">Cicilan</option>
//               <option value="Pinjaman">Pinjaman</option>
//             </select>
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">Keterangan</label>
//             <input
//               type="text"
//               value={keterangan}
//               onChange={(e) => setKeterangan(e.target.value)}
//               className="w-full p-2 border border-gray-300 rounded-lg"
//               placeholder="Masukkan keterangan (opsional)"
//             />
//           </div>
//           <div className="flex justify-end space-x-2">
//             <button
//               type="button"
//               onClick={onClose}
//               className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
//             >
//               Batal
//             </button>
//             <button
//               type="submit"
//               className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
//             >
//               Simpan
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };