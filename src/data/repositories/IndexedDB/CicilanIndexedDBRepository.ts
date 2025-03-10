// src/data/repositories/IndexedDB/CicilanIndexedDBRepository.ts
import Dexie from 'dexie';
import { Cicilan } from '../../../core/entities/Mutasi/Cicilan';
import { CicilanRepository } from '../../../core/repositories/Mutasi/CicilanRepository';

export class CicilanIndexedDBRepository extends Dexie implements CicilanRepository {
    cicilan: Dexie.Table<Cicilan, number>;

    constructor() {
        super('KoperasiDB');
        this.version(1).stores({
            cicilan: '++id, pinjamanId, tanggalJatuhTempo, jumlahHarusDibayar, tanggalPembayaran, status, keterangan',
        });
        this.cicilan = this.table('cicilan');
    }

    async createCicilanBatch(cicilanList: Omit<Cicilan, 'id'>[]): Promise<void> {
        await this.cicilan.bulkAdd(cicilanList as Cicilan[]);
    }

    async getCicilanByPinjamanId(pinjamanId: number): Promise<Cicilan[]> {
        return this.cicilan.where('pinjamanId').equals(pinjamanId).toArray();
    }

    async updateCicilan(id: number, cicilan: Partial<Cicilan>): Promise<void> {
        await this.cicilan.update(id, cicilan);
    }
}