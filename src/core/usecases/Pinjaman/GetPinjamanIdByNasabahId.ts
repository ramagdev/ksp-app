import { PinjamanRepository } from '../../repositories/Mutasi/PinjamanRepository';
export class GetPinjamanIdByNasabahId {
    constructor(private pinjamanRepository: PinjamanRepository) {}

    async execute(nasabahId: number): Promise<number| null> {
        const pinjaman = await this.pinjamanRepository.getPinjamanAktifByNasabahId(nasabahId);
        if (pinjaman.length === 0) return null;
        const last = pinjaman[pinjaman.length - 1].id;
        return last || null;
    }
}