
import { ProdukPinjamanRepository } from '../../repositories/Mutasi/ProdukPinjamanRepository';
import { ProdukPinjamanEntity } from '../../entities/Mutasi/ProdukPinjaman';

export class CreateProdukPinjaman {
    constructor(private produkPinjamanRepository: ProdukPinjamanRepository) {}

    async execute(produkPinjaman: Omit<ProdukPinjamanEntity, 'id'>): Promise<number> {
        return await this.produkPinjamanRepository.create(produkPinjaman);
    }
}