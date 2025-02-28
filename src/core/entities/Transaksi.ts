export interface Transaksi {
    id: number;
    nasabahId: number;
    tanggalTransaksi: Date;
    jumlahTransaksi: number;
    status: "Cicilan" | "Pinjaman";
    keterangan?: string;
  }