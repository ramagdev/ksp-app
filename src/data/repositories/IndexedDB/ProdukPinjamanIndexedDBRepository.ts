import Dexie from 'dexie';
import { ProdukPinjaman } from '../../../core/entities/Mutasi/ProdukPinjaman';
import { ProdukPinjamanRepository } from '../../../core/repositories/Mutasi/ProdukPinjamanRepository';

export class ProdukPinjamanIndexedDBRepository extends Dexie implements ProdukPinjamanRepository {
    produkPinjaman: Dexie.Table<ProdukPinjaman, number>
    constructor() {
        super('KoperasiDB');
        this.version(1).stores({
            produkPinjaman: '++id, namaProduk, jarakCicilan, bunga, jenisPeminjam, maksimumPinjaman, minimumPinjaman, keterangan, is_active', // Indexes
        });
        this.produkPinjaman = this.table('produkPinjaman');
        this.initData();
    }

    async getAll(): Promise<ProdukPinjaman[]> {
        const semuaProduk = await this.produkPinjaman.toArray(); // Ambil semua data
        for (const produk of semuaProduk) {
            if (produk.is_active === null || produk.is_active === undefined) {
                await this.produkPinjaman.update(produk, { is_active: true });
            }
        }
        return semuaProduk.filter((produk) => produk.is_active === true); // Filter secara manual
    }

    async getById(id: number): Promise<ProdukPinjaman | null> {
        const produkPinjaman = await this.produkPinjaman.get(id);
        return produkPinjaman || null;
    }

    async create(produkPinjaman: Omit<ProdukPinjaman, 'id'>): Promise<number> {
        const produkWithActiveStatus = { ...produkPinjaman, is_active: true };
        return this.produkPinjaman.add(produkWithActiveStatus as ProdukPinjaman);
    }

    async update(id: number, produkPinjaman: Partial<ProdukPinjaman>): Promise<void> {
        this.produkPinjaman.update(id, produkPinjaman);
    }

    async deleteProduk(id: number): Promise<void> {
        // Soft delete: ubah is_active menjadi false
    await this.produkPinjaman.update(id, { is_active: false });
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