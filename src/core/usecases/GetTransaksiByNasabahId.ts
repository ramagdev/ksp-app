// core/usecases/GetTransaksiByNasabahId.ts
import { TransaksiRepository } from "../../data/repositories/IndexDB/TransaksiRepository";
import { Transaksi } from "../entities/Transaksi";

export class GetTransaksiByNasabahId {
  constructor(private transaksiRepo: TransaksiRepository) {}

  async execute(nasabahId: number): Promise<Transaksi[]> {
    return this.transaksiRepo.getByNasabahId(nasabahId);
  }
}