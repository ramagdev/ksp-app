// src/core/repositories/Mutasi/PinjamanRepository.ts
import { Pinjaman } from '../../entities/Mutasi/Pinjaman';
import { Transaksi } from '../../entities/Mutasi/Transaksi';

export interface PinjamanRepository {
  createPinjaman(pinjaman: Omit<Pinjaman, 'id'>): Promise<number>; // Mengembalikan ID pinjaman yang baru dibuat
  createTransaksi(transaksi: Omit<Transaksi, 'id'>): Promise<void>;
  getPinjamanAktifByNasabahId(nasabahId: number): Promise<Pinjaman[]>;
}