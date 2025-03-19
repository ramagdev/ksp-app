// src/data/repositories/IndexedDB/PinjamanIndexedDBRepository.ts
import { PinjamanRepository } from '../../../core/repositories/Mutasi/PinjamanRepository';
import { Pinjaman } from '../../../core/entities/Mutasi/Pinjaman';
import Dexie from 'dexie';

class KoperasiDB extends Dexie {
  pinjaman: Dexie.Table<Pinjaman, number>;

  constructor() {
    super('KoperasiDB');
    this.version(23).stores({
      pinjaman: '++id, nasabahId, produkPinjamanId, tanggalPinjaman, jumlahPinjaman, status, keterangan',
    });
    this.pinjaman = this.table('pinjaman');
  }
}

const db = new KoperasiDB();

export class PinjamanIndexedDBRepository implements PinjamanRepository {
  async createPinjaman(pinjaman: Omit<Pinjaman, 'id'>): Promise<number> {
    return await db.pinjaman.add(pinjaman);
  }

  async getPinjamanAktifByNasabahId(nasabahId: number): Promise<Pinjaman[]> {
    return await db.pinjaman
      .where('nasabahId')
      .equals(nasabahId)
      .and(p => p.status === 'Aktif')
      .toArray();
  }

  async getPinjamanById(pinjamanId: number): Promise<Pinjaman | undefined> {
    return await db.pinjaman.get(pinjamanId);
  }

  async checkPinjamanExists(pinjamanId: number): Promise<void> {
    const pinjaman = await db.pinjaman.get(pinjamanId);
    if (!pinjaman) {
      throw new Error('Pinjaman tidak ditemukan');
    }
  }

  async getAllPinjamanByNasabahId(nasabahId: number): Promise<Pinjaman[]> {
    return await db.pinjaman.where('nasabahId').equals(nasabahId).toArray();
  }

  async deletePinjaman(pinjamanId: number): Promise<void> {
    await db.pinjaman.delete(pinjamanId);
  }
}