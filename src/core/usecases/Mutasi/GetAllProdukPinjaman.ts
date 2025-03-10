// src/core/usecases/Mutasi/GetAllProdukPinjaman.ts
import { ProdukPinjamanRepository } from "../../repositories/Mutasi/ProdukPinjamanRepository";
import { ProdukPinjamanEntity } from "../../entities/Mutasi/ProdukPinjaman";

export class GetAllProdukPinjaman {
  constructor(private produkPinjamanRepository: ProdukPinjamanRepository) {}

  async execute(): Promise<ProdukPinjamanEntity[]> {
    return await this.produkPinjamanRepository.getAll();
  }
}