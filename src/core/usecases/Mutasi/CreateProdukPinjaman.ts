
import { ProdukPinjamanRepository } from '../../repositories/ProdukPinjamanRepository';
import { ProdukPinjaman } from '../../entities/Mutasi/ProdukPinjaman';

export class CreateProdukPinjaman {
    constructor(private produkPinjamanRepository: ProdukPinjamanRepository) {}

    async execute(produkPinjaman: Omit<ProdukPinjaman, 'id'>): Promise<number> {
        return await this.produkPinjamanRepository.create(produkPinjaman);
    }
}