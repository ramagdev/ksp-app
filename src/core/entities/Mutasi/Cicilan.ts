import { Pembayaran } from "./Pembayaran";

export interface Cicilan {
    id?: number;
    pinjamanId: number; // Relasi ke Pinjaman
    tanggalJatuhTempo: Date;
    jumlahHarusDibayar: number; // Jumlah cicilan + bunga
    kurangBayar: number;
    pembayaran: Pembayaran[];
    tanggalPembayaranLunas?: Date; // Diisi saat cicilan selesai dibayar
    status: 'Belum Bayar' | 'Dibayar' | 'Terlambat';
}