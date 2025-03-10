// Entity TypeScript
export interface ProdukPinjamanEntity {
    id?: number;
    namaProduk: string;
    jarakCicilan: 'Harian' | 'Mingguan' | 'Bulanan';
    banyakCicilan: number;
    bunga: number;
    jenisPeminjam: 'Perorangan' | 'Kelompok';
    maksimumPinjaman?: number;
    minimumPinjaman?: number;
    keterangan?: string;
    is_active: boolean; // boolean di entity
}

// Tipe untuk Dexie
export interface ProdukPinjamanDexie extends Omit<ProdukPinjamanEntity, 'is_active'> {
    is_active: number; // number di Dexie
}