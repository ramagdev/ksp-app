// src/core/repositories/Mutasi/ProdukPinjamanRepository.ts
import { ProdukPinjaman } from "../../entities/Mutasi/ProdukPinjaman";

export interface ProdukPinjamanRepository {
  getAll(): Promise<ProdukPinjaman[]>;
  getById(id: number): Promise<ProdukPinjaman | null>;
  create(produk: Omit<ProdukPinjaman, "id">): Promise<number>;
  update(id: number, produk: Partial<ProdukPinjaman>): Promise<void>;
  deleteProduk(id: number): Promise<void>;
}