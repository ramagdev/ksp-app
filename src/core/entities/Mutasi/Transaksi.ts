export interface Transaksi {
    id?: number;
    pinjamanId: number; // Relasi ke Pinjaman
    tanggalTransaksi: Date;
    jumlahTransaksi: number;
    jenisTransaksi: "Pinjaman" | "Cicilan";
    keterangan?: string;
  }