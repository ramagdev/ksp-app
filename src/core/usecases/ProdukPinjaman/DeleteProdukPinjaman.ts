import { ProdukPinjamanRepository } from "../../repositories/Mutasi/ProdukPinjamanRepository";

export class DeleteProdukPinjaman {
    constructor(private produkPinjamanRepository: ProdukPinjamanRepository) {}
  
    async execute(id: number): Promise<void> {
      return await this.produkPinjamanRepository.update(id, { is_active: false });
    }
  }