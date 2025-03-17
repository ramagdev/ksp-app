// src/core/repositories/Mutasi/PinjamanRepository.ts
import { Pinjaman } from '../../entities/Mutasi/Pinjaman';

export interface PinjamanRepository {
  createPinjaman(pinjaman: Omit<Pinjaman, 'id'>): Promise<number>;
  getPinjamanAktifByNasabahId(nasabahId: number): Promise<Pinjaman[]>;
  getPinjamanById(pinjamanId: number): Promise<Pinjaman | undefined>; // Tambahkan ini
  checkPinjamanExists(pinjamanId: number): Promise<void>;
  getAllPinjamanByNasabahId(nasabahId: number): Promise<Pinjaman[]>;
  deletePinjaman(pinjamanId: number): Promise<void>;
}