// data/repositories/TransaksiRepository.ts
import { Transaksi } from "../../../core/entities/Transaksi";

export class TransaksiRepository {
  private transaksiData: Transaksi[] = [
    // Data contoh, ganti dengan data nyata dari API atau IndexedDB
    { id: 1, nasabahId: 1, tanggalTransaksi: new Date("2023-01-01"), jumlahTransaksi: 500000, status: "Cicilan", keterangan: "Transaksi ke-1 dari 10" },
    { id: 2, nasabahId: 1, tanggalTransaksi: new Date("2023-02-01"), jumlahTransaksi: 500000, status: "Cicilan" },
    { id: 3, nasabahId: 1, tanggalTransaksi: new Date("2023-03-01"), jumlahTransaksi: 1500000, status: "Pinjaman" },
  ];

  async getByNasabahId(nasabahId: number): Promise<Transaksi[]> {
    return this.transaksiData.filter((transaksi) => transaksi.nasabahId === nasabahId);
  }
  
  async add(transaksi: Omit<Transaksi, "id">): Promise<Transaksi> {
    const newId = this.transaksiData.length > 0 ? Math.max(...this.transaksiData.map(c => c.id)) + 1 : 1;
    const newTransaksi: Transaksi = { id: newId, ...transaksi };
    this.transaksiData.push(newTransaksi);
    return newTransaksi;
  }
}