// src/core/usecases/Mutasi/GetProdukPinjamanById.ts
import { ProdukPinjamanRepository } from "../../repositories/Mutasi/ProdukPinjamanRepository";
import { ProdukPinjaman } from "../../entities/Mutasi/ProdukPinjaman";

export class GetProdukPinjamanById {
  constructor(private produkPinjamanRepository: ProdukPinjamanRepository) {}

  async execute(id: number): Promise<ProdukPinjaman | null> {
    return await this.produkPinjamanRepository.getById(id);
  }
}