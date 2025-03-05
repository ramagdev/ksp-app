import Dexie from 'dexie';
import { ProdukPinjaman } from '../../../core/entities/Mutasi/ProdukPinjaman';
import { ProdukPinjamanRepository } from '../../../core/repositories/ProdukPinjamanRepository';

export class ProdukPinjamanIndexedDBRepository extends Dexie implements ProdukPinjamanRepository {
    produkPinjaman: Dexie.Table<ProdukPinjaman, number>
    constructor() {
        super('KoperasiDB');
        this.version(1).stores({
            produkPinjaman: '++id, namaProduk, jarakCicilan, bunga, jenisPeminjam, maksimumPinjaman, minimumPinjaman, keterangan', // Indexes
        });
        this.produkPinjaman = this.table('produkPinjaman');
        this.initData();
    }

    async getAll(): Promise<ProdukPinjaman[]> {
        return this.produkPinjaman.toArray();
    }

    async getById(id: number): Promise<ProdukPinjaman | undefined> {
        return this.produkPinjaman.get(id);
    }

    async create(produkPinjaman: Omit<ProdukPinjaman, 'id'>): Promise<number> {
        return this.produkPinjaman.add(produkPinjaman as ProdukPinjaman);
    }

    async update(id: number, produkPinjaman: Partial<ProdukPinjaman>): Promise<void> {
        this.produkPinjaman.update(id, produkPinjaman);
    }

    async deleteProduk(id: number): Promise<void> {
        this.produkPinjaman.delete(id);
    }

    private async initData() {
        const storedProdukPinjamanList = await this.produkPinjaman.toArray();
        const storedProdukPinjamanMap = new Map(storedProdukPinjamanList.map(n => [n.id, n]));

        for (const produkPinjaman of storedProdukPinjamanList) {
            if (!storedProdukPinjamanMap.has(produkPinjaman.id)) {
                await this.produkPinjaman.add(produkPinjaman);
            } else {
                const storedProdukPinjaman = storedProdukPinjamanMap.get(produkPinjaman.id);
                if (storedProdukPinjaman && JSON.stringify(storedProdukPinjaman) !== JSON.stringify(produkPinjaman)) {
                    await this.produkPinjaman.put(produkPinjaman);
                }
            }
        }
    }
}