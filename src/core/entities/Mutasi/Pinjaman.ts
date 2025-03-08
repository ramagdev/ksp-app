export interface Pinjaman {
    id?: number;
    nasabahId: number;
    produkPinjamanId: number; // Relasi ke ProdukPinjaman
    tanggalPinjaman: Date;
    jumlahPinjaman: number;
    status: 'Aktif' | 'Lunas' | 'Macet' | 'Gagal';
    keterangan?: string;
}