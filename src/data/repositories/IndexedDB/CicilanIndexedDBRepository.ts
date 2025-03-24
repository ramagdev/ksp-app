// src/data/repositories/IndexedDB/CicilanIndexedDBRepository.ts
import Dexie from 'dexie';
import { Cicilan } from '../../../core/entities/Mutasi/Cicilan';
import { CicilanRepository } from '../../../core/repositories/Mutasi/CicilanRepository';
import { Pembayaran } from '../../../core/entities/Mutasi/Pembayaran';

export class CicilanIndexedDBRepository extends Dexie implements CicilanRepository {
    cicilan: Dexie.Table<Cicilan, number>;

    constructor() {
        super('KoperasiDB');
        this.version(5).stores({
            cicilan: '++id, pinjamanId, tanggalJatuhTempo, jumlahHarusDibayar, kurangBayar, pembayaran, tanggalPembayaranLunas, status',
        });
        this.cicilan = this.table('cicilan');
    }

    async getAll(): Promise<Cicilan[]> {
      return await this.cicilan.toArray();
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

    async getAllCicilanByPinjamanId(pinjamanId: number): Promise<Cicilan[]> {
        return this.cicilan.where('pinjamanId').equals(pinjamanId).toArray();
    }

    async getSortedUnpaidCicilanByPinjamanId(pinjamanId: number): Promise<Cicilan[]> {
        const unpaidCicilanList = await this.cicilan.where('pinjamanId').equals(pinjamanId).and(t => t.status === 'Belum Bayar').toArray();
        return unpaidCicilanList.sort((a, b) => new Date(a.tanggalJatuhTempo).getTime() - new Date(b.tanggalJatuhTempo).getTime());
    }

    async getAllPembayaranByPinjamanId(pinjamanId: number): Promise<Pembayaran[]> {
        const cicilanList = await this.cicilan.where('pinjamanId').equals(pinjamanId).toArray();
        return cicilanList.flatMap(cicilan => cicilan.pembayaran);
    }

    async deleteCicilanByPinjamanId(pinjamanId: number): Promise<void> {
        await this.cicilan.where('pinjamanId').equals(pinjamanId).delete();
    }

    async checkCicilanExists(cicilanId: number): Promise<void> {
        const cicilan = await this.cicilan.get(cicilanId);
        if (!cicilan) {
            throw new Error('Cicilan not found');
        }
    }

    async checkPembayaranExists(cicilanId: number, transaksiId: number): Promise<void> {
        const cicilan = await this.cicilan.get(cicilanId);
        if (!cicilan) {
            throw new Error('Cicilan not found');
        }
        const pembayaran = cicilan.pembayaran.find(p => p.transaksiId === transaksiId);
        if (!pembayaran) {
            throw new Error('Pembayaran not found');
        }
    }

    async getCicilanById(id: number): Promise<Cicilan> {
        const cicilan = await this.cicilan.get(id);
        if (!cicilan) {
            throw new Error('Cicilan not found');
        }
        return cicilan;
    }

    async getAllCicilanByTransaksiId(pinjamanId: number, transaksiId: number): Promise<Cicilan[]> {
        const cicilanList = await this.cicilan.where('pinjamanId').equals(pinjamanId).toArray();
        return cicilanList.filter(cicilan => cicilan.pembayaran.some(p => p.transaksiId === transaksiId));
    }

    async deletePembayaran(cicilanId: number, transaksiId: number): Promise<void> {
        const cicilan = await this.cicilan.get(cicilanId);
        if (!cicilan) {
            throw new Error('Cicilan not found');
        }
        const updatedCicilan = {
            kurangBayar: cicilan.kurangBayar + cicilan.pembayaran.find(p => p.transaksiId === transaksiId)!.jumlah,
            pembayaran:cicilan.pembayaran.filter(p => p.transaksiId !== transaksiId),
            tanggalPembayaranLunas: undefined,
            status: 'Belum Bayar' as 'Belum Bayar'|'Dibayar'|'Terlambat',
        };

        await this.cicilan.update(cicilanId, updatedCicilan);
    }

}