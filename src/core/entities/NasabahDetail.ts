export interface NasabahDetail {
    id?: number;
    nasabahId: number; // Foreign key ke tabel nasabah
    tanggalLahir: Date;
    pekerjaanUsaha: string;
    statusPerkawinan: 'Belum Menikah' | 'Menikah' | 'Duda' | 'Janda';
    namaPasangan: string | null;
    namaPenjamin: string;
    hubunganPenjamin: 'Anak' | 'Orang Tua' | 'Saudara'| 'Lainnya';
    teleponPenjamin: string | null;
}