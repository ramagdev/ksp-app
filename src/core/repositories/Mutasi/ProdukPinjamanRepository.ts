// src/core/repositories/Mutasi/ProdukPinjamanEntityRepository.ts
import { ProdukPinjamanEntity } from "../../entities/Mutasi/ProdukPinjaman";

export interface ProdukPinjamanRepository {
  getAll(): Promise<ProdukPinjamanEntity[]>;
  getById(id: number): Promise<ProdukPinjamanEntity | null>;
  create(produk: Omit<ProdukPinjamanEntity, "id">): Promise<number>;
  update(id: number, produk: Partial<ProdukPinjamanEntity>): Promise<void>;
  deleteProduk(id: number): Promise<void>;
  getProdukPinjamanById(id: number): Promise<ProdukPinjamanEntity | null>;
}