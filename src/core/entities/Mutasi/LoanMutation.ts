// src/core/entities/Mutasi/LoanMutation.ts
export default interface LoanMutation {
  pinjamanId: number;
  nasabahId: number;
  produkPinjamanNama: string;
  jumlahPinjaman: number;
  tanggalPinjaman: Date;
  statusPinjaman: string;
  cicilan: {
    nomor: number; // Nomor urut cicilan
    tanggalJatuhTempo: Date;
    jumlahHarusDibayar: number;
    tanggalBayar: Date[]; // Daftar tanggal pembayaran
    lcDays: number;
    pembayaran: number; // Jumlah yang sudah dibayar
    kurangBayar: number; // Jumlah yang belum dibayar
    status: 'Belum Bayar' | 'Dibayar' | 'Macet' | 'Terlambat';
    keterangan?: string;
  }[];
}