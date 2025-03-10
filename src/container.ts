// src/container.ts

// Import repository
import { ProdukPinjamanRepository } from './core/repositories/Mutasi/ProdukPinjamanRepository';
import { ProdukPinjamanIndexedDBRepository } from './data/repositories/IndexedDB/ProdukPinjamanIndexedDBRepository';

import { PinjamanRepository } from './core/repositories/Mutasi/PinjamanRepository';
import { PinjamanIndexedDBRepository } from './data/repositories/IndexedDB/PinjamanIndexedDBRepository';

import { TransaksiRepository } from './core/repositories/Mutasi/TransaksiRepository';
import { TransaksiIndexedDBRepository } from './data/repositories/IndexedDB/TransaksiIndexedDBRepository';

import { CicilanRepository } from './core/repositories/Mutasi/CicilanRepository';
import { CicilanIndexedDBRepository } from './data/repositories/IndexedDB/CicilanIndexedDBRepository';

// Import use case
import { CreateProdukPinjaman } from './core/usecases/Mutasi/CreateProdukPinjaman';
import { GetAllProdukPinjaman } from "./core/usecases/Mutasi/GetAllProdukPinjaman";
import { UpdateProdukPinjaman } from "./core/usecases/Mutasi/UpdateProdukPinjaman";
import { DeleteProdukPinjaman } from "./core/usecases/Mutasi/DeleteProdukPinjaman";
import { GetProdukPinjamanById } from "./core/usecases/Mutasi/GetProdukPinjamanById";

import { GetPinjamanIdByNasabahId } from './core/usecases/Mutasi/GetPinjamanIdByNasabahId';

import { CreateNewLoan } from './core/usecases/Mutasi/CreateNewLoan';
import { GetLoanMutations } from './core/usecases/Mutasi/GetLoanMutations';

// Buat instance repository
const produkPinjamanRepository: ProdukPinjamanRepository = new ProdukPinjamanIndexedDBRepository();
const pinjamanRepository: PinjamanRepository = new PinjamanIndexedDBRepository();
const transaksiRepository: TransaksiRepository = new TransaksiIndexedDBRepository();
const cicilanRepository: CicilanRepository = new CicilanIndexedDBRepository();

// Buat instance use case dengan dependency yang diperlukan
export const createProdukPinjaman = new CreateProdukPinjaman(produkPinjamanRepository);
export const getAllProdukPinjaman = new GetAllProdukPinjaman(produkPinjamanRepository);
export const updateProdukPinjaman = new UpdateProdukPinjaman(produkPinjamanRepository);
export const deleteProdukPinjaman = new DeleteProdukPinjaman(produkPinjamanRepository);
export const getProdukPinjamanById = new GetProdukPinjamanById(produkPinjamanRepository);

export const getPinjamanIdByNasabahId = new GetPinjamanIdByNasabahId(pinjamanRepository);

export const createNewLoan = new CreateNewLoan(pinjamanRepository, transaksiRepository, cicilanRepository, produkPinjamanRepository);
export const getLoanMutations = new GetLoanMutations(
    pinjamanRepository,
    cicilanRepository,
    transaksiRepository,
    produkPinjamanRepository
  );