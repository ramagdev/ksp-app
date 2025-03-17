export interface Transaksi {
    id?: number;
    pinjamanId: number; // Relasi ke Pinjaman
    jenisTransaksi: "Pinjaman" | "Pembayaran Cicilan";
    tanggalTransaksi: Date;
    jumlahTransaksi: number;
    keterangan?: string;
  }