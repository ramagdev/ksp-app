export interface ProdukPinjaman {
    id?: number;
    namaProduk: string; // Misalnya: "Pinjaman Harian", "Pinjaman Mingguan", dll.
    jarakCicilan: 'Harian' | 'Mingguan' | 'Bulanan';
    bunga: number; // Bunga dalam persentase
    jenisPeminjam: 'Perorangan' | 'Kelompok'; // Apakah pinjaman untuk perorangan atau kelompok
    maksimumPinjaman?: number; // Batas maksimum pinjaman (opsional)
    minimumPinjaman?: number; // Batas minimum pinjaman (opsional)
    keterangan?: string; // Deskripsi tambahan tentang produk pinjaman
    is_active: boolean;
}