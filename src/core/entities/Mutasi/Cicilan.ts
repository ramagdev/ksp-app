export interface Cicilan {
    id?: number;
    pinjamanId: number; // Relasi ke Pinjaman
    tanggalJatuhTempo: Date;
    jumlahHarusDibayar: number; // Jumlah cicilan + bunga
    tanggalPembayaran?: Date; // Diisi saat cicilan dibayar
    status: 'Belum Bayar' | 'Dibayar' | 'Macet' | 'Terlambat';
    keterangan?: string;
}