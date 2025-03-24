// src/core/repositories/Mutasi/CicilanRepository.ts
import { Cicilan } from '../../entities/Mutasi/Cicilan';
import { Pembayaran } from '../../entities/Mutasi/Pembayaran';

export interface CicilanRepository {
    createCicilanBatch(cicilanList: Omit<Cicilan, 'id'>[]): Promise<void>;
    getAllCicilanByPinjamanId(pinjamanId: number): Promise<Cicilan[]>;
    updateCicilan(id: number, cicilan: Partial<Cicilan>): Promise<void>;
    // getCicilanById(id: number): Promise<Cicilan | null>;
    getSortedUnpaidCicilanByPinjamanId(pinjamanId: number): Promise<Cicilan[]>;
    getAllPembayaranByPinjamanId(pinjamanId: number): Promise<Pembayaran[]>;
    deleteCicilanByPinjamanId(pinjamanId: number): Promise<void>;

    checkCicilanExists(cicilanId: number): Promise<void>;
    checkPembayaranExists(cicilanId: number, transaksiId: number): Promise<void>;

    getCicilanById(id: number): Promise<Cicilan>;

    getAllCicilanByTransaksiId(pinjamanId: number, transaksiId: number): Promise<Cicilan[]>;
    deletePembayaran(cicilanId: number, transaksiId: number): Promise<void>;
    getAll(): Promise<Cicilan[]>
}