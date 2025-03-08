// src/core/usecases/Mutasi/GetAllProdukPinjaman.ts
import { ProdukPinjamanRepository } from "../../repositories/Mutasi/ProdukPinjamanRepository";
import { ProdukPinjaman } from "../../entities/Mutasi/ProdukPinjaman";

export class GetAllProdukPinjaman {
  constructor(private produkPinjamanRepository: ProdukPinjamanRepository) {}

  async execute(): Promise<ProdukPinjaman[]> {
    return await this.produkPinjamanRepository.getAll();
  }
}