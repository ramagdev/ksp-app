import { ProdukPinjamanRepository } from "../../repositories/Mutasi/ProdukPinjamanRepository";
import { ProdukPinjamanEntity } from "../../entities/Mutasi/ProdukPinjaman";

export class UpdateProdukPinjaman {
    constructor(private produkPinjamanRepository: ProdukPinjamanRepository) {}
  
    async execute(id: number, produk: Partial<ProdukPinjamanEntity>): Promise<void> {
      return await this.produkPinjamanRepository.update(id, produk);
    }
  }