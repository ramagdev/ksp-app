// // presentation/components/TransaksiForm.tsx
// import React, { useState, FormEvent } from "react";
// import { Transaksi } from "../../core/entities/Mutasi/Transaksi";

// interface TransaksiFormProps {
//   nasabahId: number;
//   onSubmit: (data: Omit<Transaksi, "id">) => Promise<{ success: boolean; error?: string }>;
// }

// export const TransaksiForm: React.FC<TransaksiFormProps> = ({ nasabahId, onSubmit }) => {
//   const [formData, setFormData] = useState({
//     tanggalTransaksi: "",
//     jumlahTransaksi: "",
//     status: "Pinjaman" as const,
//     keterangan: "",
//   });
//   const [isLoading, setIsLoading] = useState(false);
//   const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setMessage(null);

//     const transaksiData: Omit<Transaksi, "id"> = {
//       nasabahId,
//       tanggalTransaksi: new Date(formData.tanggalTransaksi),
//       jumlahTransaksi: parseFloat(formData.jumlahTransaksi),
//       status: formData.status,
//       keterangan: formData.keterangan || undefined,
//     };

//     const result = await onSubmit(transaksiData);
//     setIsLoading(false);

//     if (result.success) {
//       setMessage({ type: "success", text: "Transaksi berhasil ditambahkan!" });
//       setFormData({ tanggalTransaksi: "", jumlahTransaksi: "", status: "Pinjaman", keterangan: "" });
//     } else {
//       setMessage({ type: "error", text: result.error || "Terjadi kesalahan" });
//     }
//   };

//   return (
//     <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
//       <h2 className="text-2xl font-semibold text-gray-700 mb-4">Tambah Transaksi</h2>
//       {message && (
//         <div
//           className={`p-4 mb-4 rounded-lg ${
//             message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
//           }`}
//         >
//           {message.text}
//         </div>
//       )}
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Tanggal Transaksi</label>
//           <input
//             type="date"
//             value={formData.tanggalTransaksi}
//             onChange={(e) => setFormData({ ...formData, tanggalTransaksi: e.target.value })}
//             className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Jumlah Transaksi (Rp)</label>
//           <input
//             type="number"
//             value={formData.jumlahTransaksi}
//             onChange={(e) => setFormData({ ...formData, jumlahTransaksi: e.target.value })}
//             className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//             min="0"
//             step="1000"
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Status</label>
//           <select
//             value={formData.status}
//             onChange={(e) => setFormData({ ...formData, status: e.target.value as typeof formData.status })}
//             className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//           >
//             <option value="Pinjaman">Pinjaman</option>
//             <option value="Cicilan">Cicilan</option>
//           </select>
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Keterangan (Opsional)</label>
//           <input
//             type="text"
//             value={formData.keterangan}
//             onChange={(e) => setFormData({ ...formData, keterangan: e.target.value })}
//             className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//           />
//         </div>
//         <button
//           type="submit"
//           disabled={isLoading}
//           className={`w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//             isLoading ? "opacity-50 cursor-not-allowed" : ""
//           }`}
//         >
//           {isLoading ? "Menambahkan..." : "Tambah Transaksi"}
//         </button>
//       </form>
//     </div>
//   );
// };