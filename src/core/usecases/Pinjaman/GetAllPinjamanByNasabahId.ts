import { PinjamanRepository } from '../../repositories/Mutasi/PinjamanRepository';
import { Pinjaman } from '../../entities/Mutasi/Pinjaman';
export class GetAllPinjamanByNasabahId {
    constructor(private pinjamanRepository: PinjamanRepository) {}

    async execute(nasabahId: number): Promise<Pinjaman[] | null> {
        const pinjamanList = await this.pinjamanRepository.getAllPinjamanByNasabahId(nasabahId);
        if (pinjamanList.length === 0) return null;
        return pinjamanList
    }
}