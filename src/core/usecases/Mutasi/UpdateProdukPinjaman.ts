import { ProdukPinjamanRepository } from "../../repositories/Mutasi/ProdukPinjamanRepository";
import { ProdukPinjaman } from "../../entities/Mutasi/ProdukPinjaman";

export class UpdateProdukPinjaman {
    constructor(private produkPinjamanRepository: ProdukPinjamanRepository) {}
  
    async execute(id: number, produk: Partial<ProdukPinjaman>): Promise<void> {
      return await this.produkPinjamanRepository.update(id, produk);
    }
  }