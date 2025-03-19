import Dexie from 'dexie';
import { ProdukPinjamanEntity, ProdukPinjamanDexie } from '../../../core/entities/Mutasi/ProdukPinjaman';
import { ProdukPinjamanRepository } from '../../../core/repositories/Mutasi/ProdukPinjamanRepository';

export class ProdukPinjamanIndexedDBRepository extends Dexie implements ProdukPinjamanRepository {
    produkPinjaman: Dexie.Table<ProdukPinjamanDexie, number>; // Gunakan tipe Dexie

    constructor() {
        super('KoperasiDB');
        this.version(23).stores({
            produkPinjaman: '++id, namaProduk, jarakCicilan, bunga, jenisPeminjam, maksimumPinjaman, minimumPinjaman, keterangan, is_active', // is_active sebagai number
        });
        this.produkPinjaman = this.table('produkPinjaman');
        this.initData();
    }

    async getAll(): Promise<ProdukPinjamanEntity[]> {
        // Ambil data dari Dexie (is_active sebagai number)
        const data = await this.produkPinjaman.where('is_active').equals(1).toArray();
        // Konversi is_active dari number ke boolean
        return data.map(item => ({
            ...item,
            is_active: item.is_active === 1, // Konversi ke boolean
        }));
    }

    async getById(id: number): Promise<ProdukPinjamanEntity | null> {
        // Ambil data dari Dexie (is_active sebagai number)
        const produkPinjaman = await this.produkPinjaman.get(id);
        // Jika data ditemukan, konversi is_active dari number ke boolean
        return produkPinjaman ? {
            ...produkPinjaman,
            is_active: produkPinjaman.is_active === 1, // Konversi ke boolean
        } : null;
    }

    async create(produkPinjaman: Omit<ProdukPinjamanEntity, 'id'>): Promise<number> {
        // Konversi is_active dari boolean ke number sebelum menyimpan
        const produkWithActiveStatus: ProdukPinjamanDexie = {
            ...produkPinjaman,
            is_active: produkPinjaman.is_active ? 1 : 0, // Konversi ke number
        };
        // Tambahkan data ke Dexie
        return this.produkPinjaman.add(produkWithActiveStatus);
    }

    async update(id: number, produkPinjaman: Partial<ProdukPinjamanEntity>): Promise<void> {
        // Konversi is_active dari boolean ke number sebelum update
        const updatedData: Partial<ProdukPinjamanDexie> = {
            ...produkPinjaman,
            is_active: produkPinjaman.is_active ? 1 : 0, // Konversi ke number
        };
        // Update data di Dexie
        await this.produkPinjaman.update(id, updatedData);
    }

    async deleteProduk(id: number): Promise<void> {
        // Soft delete: ubah is_active menjadi 0 (false)
        await this.produkPinjaman.update(id, { is_active: 0 });
    }

    async getProdukPinjamanById(id: number): Promise<ProdukPinjamanEntity | null> {
        // Ambil data dari Dexie (is_active sebagai number)
        const produkPinjaman = await this.produkPinjaman.get(id);
        // Jika data ditemukan, konversi is_active dari number ke boolean
        return produkPinjaman ? {
            ...produkPinjaman,
            is_active: produkPinjaman.is_active === 1, // Konversi ke boolean
        } : null;
    }

    private async initData() {
        // Cek apakah tabel produkPinjaman kosong
        const count = await this.produkPinjaman.count();
        if (count === 0) {
            // Data awal yang akan ditambahkan jika tabel kosong
            const initialData: Omit<ProdukPinjamanEntity, 'id'>[] = [
                {
                    namaProduk: 'Pinjaman Harian',
                    jarakCicilan: 'Harian',
                    banyakCicilan: 30,
                    bunga: 10,
                    jenisPeminjam: 'Perorangan',
                    is_active: true,
                },
                {
                    namaProduk: 'Pinjaman Mingguan',
                    jarakCicilan: 'Mingguan',
                    banyakCicilan: 4,
                    bunga: 15,
                    jenisPeminjam: 'Perorangan',
                    is_active: true,
                },
            ];
            // Konversi is_active dari boolean ke number dan tambahkan data ke Dexie
            await this.produkPinjaman.bulkAdd(
                initialData.map(item => ({
                    ...item,
                    is_active: item.is_active ? 1 : 0, // Konversi ke number
                }))
            );
        }
    }
}