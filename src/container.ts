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

import { PhotoRepository } from './core/repositories/PhotoRepository';
import { PhotoIndexedDBRepository } from './data/repositories/IndexedDB/PhotoIndexedDBRepository';
// Import use case
import { CreateProdukPinjaman } from './core/usecases/ProdukPinjaman/CreateProdukPinjaman';
import { GetAllProdukPinjaman } from "./core/usecases/ProdukPinjaman/GetAllProdukPinjaman";
import { UpdateProdukPinjaman } from "./core/usecases/ProdukPinjaman/UpdateProdukPinjaman";
import { DeleteProdukPinjaman } from "./core/usecases/ProdukPinjaman/DeleteProdukPinjaman";
import { GetProdukPinjamanById } from "./core/usecases/ProdukPinjaman/GetProdukPinjamanById";

import { GetPinjamanIdByNasabahId } from './core/usecases/Pinjaman/GetPinjamanIdByNasabahId';
import { GetAllPinjamanByNasabahId } from './core/usecases/Pinjaman/GetAllPinjamanByNasabahId';
import { HapusPinjaman } from './core/usecases/Pinjaman/HapusPinjaman';
import { DeleteCicilanPayment } from './core/usecases/Cicilan/DeleteCicilanPayment';

import { CreateNewLoan } from './core/usecases/Pinjaman/CreateNewLoan';
import { GetLoanMutations } from './core/usecases/Mutasi/GetLoanMutations';

import { CreateCicilanPayment } from './core/usecases/Cicilan/CreateCicilanPayment';

import { UploadPhoto } from './core/usecases/Customer/UploadPhoto';
import { GetPhotoUrl } from './core/usecases/Customer/GetPhotoUrl';

// Buat instance repository
const produkPinjamanRepository: ProdukPinjamanRepository = new ProdukPinjamanIndexedDBRepository();
const pinjamanRepository: PinjamanRepository = new PinjamanIndexedDBRepository();
const transaksiRepository: TransaksiRepository = new TransaksiIndexedDBRepository();
const cicilanRepository: CicilanRepository = new CicilanIndexedDBRepository();
const customerPhotoRepository: PhotoRepository = new PhotoIndexedDBRepository();

// Buat instance use case dengan dependency yang diperlukan
export const createProdukPinjaman = new CreateProdukPinjaman(produkPinjamanRepository);
export const getAllProdukPinjaman = new GetAllProdukPinjaman(produkPinjamanRepository);
export const updateProdukPinjaman = new UpdateProdukPinjaman(produkPinjamanRepository);
export const deleteProdukPinjaman = new DeleteProdukPinjaman(produkPinjamanRepository);
export const getProdukPinjamanById = new GetProdukPinjamanById(produkPinjamanRepository);

export const getPinjamanIdByNasabahId = new GetPinjamanIdByNasabahId(pinjamanRepository);
export const getAllPinjamanByNasabahId = new GetAllPinjamanByNasabahId(pinjamanRepository);
export const hapusPinjaman = new HapusPinjaman(pinjamanRepository, transaksiRepository, cicilanRepository);
export const hapusPembayaran = new DeleteCicilanPayment(cicilanRepository);

export const createNewLoan = new CreateNewLoan(pinjamanRepository, transaksiRepository, cicilanRepository, produkPinjamanRepository);
export const getLoanMutations = new GetLoanMutations(
    pinjamanRepository,
    cicilanRepository,
    produkPinjamanRepository
  );

export const createCicilanPayment = new CreateCicilanPayment(pinjamanRepository, cicilanRepository, transaksiRepository);

export const uploadPhoto = new UploadPhoto(customerPhotoRepository);
export const getPhotoUrl = new GetPhotoUrl(customerPhotoRepository);
