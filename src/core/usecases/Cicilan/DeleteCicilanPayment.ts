import { CicilanRepository } from "../../repositories/Mutasi/CicilanRepository";

export class DeleteCicilanPayment {
    constructor(
        private cicilanRepository: CicilanRepository,
    ) {}

    async execute(
        cicilanId: number,
        transaksiId: number
    ): Promise<void> {

        //Validasi input
        await this.cicilanRepository.checkCicilanExists(cicilanId);
        await this.cicilanRepository.checkPembayaranExists(cicilanId, transaksiId);

        //Hapus perhitungan lunas
        
        
        //Hapus catatan pembayaran
        await this.cicilanRepository.deletePembayaran(cicilanId, transaksiId);
    
    }
}