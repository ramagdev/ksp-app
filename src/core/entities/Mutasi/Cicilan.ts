export interface Cicilan {
    id?: number;
    pinjamanId: number; // Relasi ke Pinjaman
    tanggalJatuhTempo: Date;
    jumlahHarusDibayar: number; // Jumlah cicilan + bunga
    status: 'Belum Bayar' | 'Dibayar' | 'Macet';
    tanggalPembayaran?: Date; // Diisi saat cicilan dibayar
    keterangan?: string;
}