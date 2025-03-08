export interface Transaksi {
    id?: number;
    tanggalTransaksi: Date;
    jenisTransaksi: "Pinjaman" | "Pembayaran Cicilan";
    pinjamanId: number; // Relasi ke Pinjaman
    jumlahTransaksi: number;
    keterangan?: string;
  }