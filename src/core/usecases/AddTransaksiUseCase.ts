// core/usecases/AddTransaksiUseCase.ts
import { TransaksiRepository } from "../../data/repositories/IndexDB/TransaksiRepository";
import { Transaksi } from "../entities/Transaksi";

export class AddTransaksiUseCase {
  constructor(private transaksiRepo: TransaksiRepository) {}

  async execute(transaksi: Omit<Transaksi, "id">): Promise<{ success: boolean; data?: Transaksi; error?: string }> {
    try {
      const newTransaksi = await this.transaksiRepo.add(transaksi);
      return { success: true, data: newTransaksi };
    } catch (err) {
      return { success: false, error: err instanceof Error ? err.message : "Gagal menambah transaksi" };
    }
  }
}