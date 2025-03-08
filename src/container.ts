// src/container.ts

// Import repository
import { ProdukPinjamanRepository } from './core/repositories/Mutasi/ProdukPinjamanRepository';
import { ProdukPinjamanIndexedDBRepository } from './data/repositories/IndexedDB/ProdukPinjamanIndexedDBRepository';

import { PinjamanRepository } from './core/repositories/Mutasi/PinjamanRepository';
import { PinjamanIndexedDBRepository } from './data/repositories/IndexedDB/PinjamanIndexedDBRepository';

// Import use case
import { CreateProdukPinjaman } from './core/usecases/Mutasi/CreateProdukPinjaman';
import { GetAllProdukPinjaman } from "./core/usecases/Mutasi/GetAllProdukPinjaman";
import { UpdateProdukPinjaman } from "./core/usecases/Mutasi/UpdateProdukPinjaman";
import { DeleteProdukPinjaman } from "./core/usecases/Mutasi/DeleteProdukPinjaman";
import { GetProdukPinjamanById } from "./core/usecases/Mutasi/GetProdukPinjamanById";

import { CreateNewLoan } from './core/usecases/Mutasi/CreateNewLoan';

// Buat instance repository
const produkPinjamanRepository: ProdukPinjamanRepository = new ProdukPinjamanIndexedDBRepository();
const pinjamanRepository: PinjamanRepository = new PinjamanIndexedDBRepository();

// Buat instance use case dengan dependency yang diperlukan
export const createProdukPinjaman = new CreateProdukPinjaman(produkPinjamanRepository);
export const getAllProdukPinjaman = new GetAllProdukPinjaman(produkPinjamanRepository);
export const updateProdukPinjaman = new UpdateProdukPinjaman(produkPinjamanRepository);
export const deleteProdukPinjaman = new DeleteProdukPinjaman(produkPinjamanRepository);
export const getProdukPinjamanById = new GetProdukPinjamanById(produkPinjamanRepository);

export const createNewLoan = new CreateNewLoan(pinjamanRepository);