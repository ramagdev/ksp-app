// src/core/repositories/ProdukPinjamanRepository.ts
import { ProdukPinjaman } from "../../core/entities/Mutasi/ProdukPinjaman";

export interface ProdukPinjamanRepository {
    getAll(): Promise<ProdukPinjaman[]>;
    getById(id: number): Promise<ProdukPinjaman | undefined>;
    create(produkPinjaman: Omit<ProdukPinjaman, 'id'>): Promise<number>;
    update(id: number, produkPinjaman: Partial<ProdukPinjaman>): Promise<void>;
    deleteProduk(id: number): Promise<void>;
}