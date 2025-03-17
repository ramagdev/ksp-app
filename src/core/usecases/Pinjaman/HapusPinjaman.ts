import {PinjamanRepository} from "../../repositories/Mutasi/PinjamanRepository";
import {TransaksiRepository} from "../../repositories/Mutasi/TransaksiRepository";
import {CicilanRepository} from "../../repositories/Mutasi/CicilanRepository";

export class HapusPinjaman {
    constructor(
        private pinjamanRepository: PinjamanRepository,
        private transaksiRepository: TransaksiRepository,
        private cicilanRepository: CicilanRepository
    ) {}

    async execute (
        pinjamanId: number
    ): Promise<void> {
        
    

    //Validasi input
    await this.pinjamanRepository.checkPinjamanExists(pinjamanId);

    //Cek apakah ada catatan pembayaran
    const pembayaranList = await this.cicilanRepository.getAllPembayaranByPinjamanId(pinjamanId);

    if (pembayaranList.length > 0) {
        throw new Error('Pinjaman masih memiliki catatan pembayaran, tidak dapat dihapus');
    }

    //Hapus catatan transaksi
    await this.transaksiRepository.deleteTransaksiByPinjamanId(pinjamanId);

    //Hapus catatan cicilan
    await this.cicilanRepository.deleteCicilanByPinjamanId(pinjamanId);

    //Hapus pinjaman
    await this.pinjamanRepository.deletePinjaman(pinjamanId);
    }
}