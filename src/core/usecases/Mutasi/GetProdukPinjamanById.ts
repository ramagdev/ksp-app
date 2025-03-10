// src/core/usecases/Mutasi/GetProdukPinjamanById.ts
import { ProdukPinjamanRepository } from "../../repositories/Mutasi/ProdukPinjamanRepository";
import { ProdukPinjamanEntity } from "../../entities/Mutasi/ProdukPinjaman";

export class GetProdukPinjamanById {
  constructor(private produkPinjamanRepository: ProdukPinjamanRepository) {}

  async execute(id: number): Promise<ProdukPinjamanEntity | null> {
    return await this.produkPinjamanRepository.getById(id);
  }
}