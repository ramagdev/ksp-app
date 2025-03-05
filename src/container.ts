// src/container.ts

// Import repository
import { ProdukPinjamanRepository } from './core/repositories/ProdukPinjamanRepository';
import { ProdukPinjamanIndexedDBRepository } from './data/repositories/IndexDB/ProdukPinjamanRepository';


// Import use case
import { CreateProdukPinjaman } from './core/usecases/Mutasi/CreateProdukPinjaman';

// Buat instance repository
const produkPinjamanRepository: ProdukPinjamanRepository = new ProdukPinjamanIndexedDBRepository();

// Buat instance use case dengan dependency yang diperlukan
export const createProdukPinjaman = new CreateProdukPinjaman(produkPinjamanRepository);