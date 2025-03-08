// src/data/repositories/IndexedDB/PinjamanIndexedDBRepository.ts
import { PinjamanRepository } from '../../../core/repositories/Mutasi/PinjamanRepository';
import { Pinjaman } from '../../../core/entities/Mutasi/Pinjaman';
import { Transaksi } from '../../../core/entities/Mutasi/Transaksi';
import Dexie from 'dexie';

class MyDatabase extends Dexie {
  pinjaman: Dexie.Table<Pinjaman, number>;
  transaksi: Dexie.Table<Transaksi, number>;

  constructor() {
    super('MyDatabase');
    this.version(1).stores({
      pinjaman: '++id, nasabahId, produkPinjamanId',
      transaksi: '++id, pinjamanId',
    });
    this.pinjaman = this.table('pinjaman');
    this.transaksi = this.table('transaksi');
  }
}

const db = new MyDatabase();

export class PinjamanIndexedDBRepository implements PinjamanRepository {
  async createPinjaman(pinjaman: Omit<Pinjaman, 'id'>): Promise<number> {
    return await db.pinjaman.add(pinjaman);
  }

  async createTransaksi(transaksi: Omit<Transaksi, 'id'>): Promise<void> {
    await db.transaksi.add(transaksi);
  }

  async getPinjamanAktifByNasabahId(nasabahId: number): Promise<Pinjaman[]> {
    return await db.pinjaman
      .where('nasabahId')
      .equals(nasabahId)
      .and(p => p.status === 'Aktif')
      .toArray();
  }
}