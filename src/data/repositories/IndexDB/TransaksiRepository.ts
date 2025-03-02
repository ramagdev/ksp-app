// data/repositories/TransaksiRepository.ts
import { Transaksi } from "../../../core/entities/Transaksi";
import { mockTransaksi } from "../../../mocks/transaksi";

export class TransaksiRepository {
  private transaksiData: Transaksi[] = mockTransaksi;

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