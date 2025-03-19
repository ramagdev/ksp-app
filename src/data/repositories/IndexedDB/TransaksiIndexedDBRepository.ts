// src/data/repositories/IndexedDB/TransaksiIndexedDBRepository.ts
import Dexie from 'dexie';
import { Transaksi } from '../../../core/entities/Mutasi/Transaksi';
import { TransaksiRepository } from '../../../core/repositories/Mutasi/TransaksiRepository';

class KoperasiDB extends Dexie {
  transaksi: Dexie.Table<Transaksi, number>;

  constructor() {
    super('KoperasiDB');
    this.version(5).stores({
      transaksi: '++id, pinjamanId, tanggalTransaksi, jenisTransaksi, jumlahTransaksi, keterangan',
    });
    this.transaksi = this.table('transaksi');
  }
}

const db = new KoperasiDB();

export class TransaksiIndexedDBRepository implements TransaksiRepository {
  async createTransaksi(transaksi: Omit<Transaksi, 'id'>): Promise<number> {
    return await db.transaksi.add(transaksi);
  }

  async getTransaksiByPinjamanId(pinjamanId: number): Promise<Transaksi[]> {
    return await db.transaksi
      .where('pinjamanId')
      .equals(pinjamanId)
      .and(t => t.jenisTransaksi === 'Pembayaran Cicilan')
      .toArray();
  }

  async deleteTransaksiByPinjamanId(pinjamanId: number): Promise<void> {
    await db.transaksi.where('pinjamanId').equals(pinjamanId).delete();
  }
}