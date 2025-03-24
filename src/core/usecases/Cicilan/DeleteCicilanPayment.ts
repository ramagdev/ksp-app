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

        //Cari tahu pinjamanId
        const cicilan = await this.cicilanRepository.getCicilanById(cicilanId);
        const pinjamanId = cicilan.pinjamanId;

        //Cari list cicilan yang menerima pembayaran
        const cicilanList = await this.cicilanRepository.getAllCicilanByTransaksiId(pinjamanId, transaksiId);
        
        //Hapus catatan pembayaran
        cicilanList.forEach(async (cicilan) => {
            const cicilanId = cicilan.id;
            if (!cicilanId) {
                throw new Error('Cicilan not found');
            }
            await this.cicilanRepository.deletePembayaran(cicilanId, transaksiId);  
        });
    
    }
}