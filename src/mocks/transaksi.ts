import { Transaksi } from "../core/entities/Transaksi";

export const mockTransaksi: Transaksi[] = [
        // Data contoh, ganti dengan data nyata dari API atau IndexedDB
        { id: 1, nasabahId: 1001, tanggalTransaksi: new Date("2023-01-01"), jumlahTransaksi: 500000, status: "Cicilan", keterangan: "Transaksi ke-1 dari 10" },
        { id: 2, nasabahId: 1001, tanggalTransaksi: new Date("2023-02-01"), jumlahTransaksi: 500000, status: "Cicilan" },
        { id: 3, nasabahId: 1001, tanggalTransaksi: new Date("2023-03-01"), jumlahTransaksi: 1500000, status: "Pinjaman" },
];
    