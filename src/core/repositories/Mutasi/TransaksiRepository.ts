// src/core/repositories/Mutasi/TransaksiRepository.ts
import { Transaksi } from '../../entities/Mutasi/Transaksi';

export interface TransaksiRepository {
  createTransaksi(transaksi: Omit<Transaksi, 'id'>): Promise<number>;
  deleteTransaksiByPinjamanId(pinjamanId: number): Promise<void>;
}