// src/core/repositories/Mutasi/CicilanRepository.ts
import { Cicilan } from '../../entities/Mutasi/Cicilan';

export interface CicilanRepository {
    createCicilanBatch(cicilanList: Omit<Cicilan, 'id'>[]): Promise<void>;
    getCicilanByPinjamanId(pinjamanId: number): Promise<Cicilan[]>;
    updateCicilan(id: number, cicilan: Partial<Cicilan>): Promise<void>;
}