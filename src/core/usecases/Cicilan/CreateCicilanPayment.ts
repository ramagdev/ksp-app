import { CicilanRepository } from "../../repositories/Mutasi/CicilanRepository";
import { TransaksiRepository } from "../../repositories/Mutasi/TransaksiRepository";
import { PinjamanRepository } from "../../repositories/Mutasi/PinjamanRepository";

import { Cicilan } from "../../entities/Mutasi/Cicilan";
import { Transaksi } from "../../entities/Mutasi/Transaksi";
import { Pembayaran } from "../../entities/Mutasi/Pembayaran";

export class CreateCicilanPayment {
    constructor(
        private pinjamanRepository: PinjamanRepository,
        private cicilanRepository: CicilanRepository, 
        private transaksiRepository: TransaksiRepository
    ) {}

    async execute(
        pinjamanId: number,
        jumlah: number,
        tanggalPembayaran: Date,
        keterangan?: string
    ): Promise<void> {
        // Validasi input
        await this.pinjamanRepository.checkPinjamanExists(pinjamanId);
        
        if (jumlah <= 0) {
            throw new Error('Jumlah pembayaran harus lebih besar dari 0');
        }

        if (!tanggalPembayaran || isNaN(tanggalPembayaran.getTime())) {
            throw new Error('Tanggal pembayaran tidak valid');
        }

        // Buat instance entity Transaksi
        const transaksi: Omit<Transaksi, 'id'> = {
            pinjamanId,
            jenisTransaksi: 'Pembayaran Cicilan',
            tanggalTransaksi: tanggalPembayaran,
            jumlahTransaksi: jumlah,
            keterangan
        };

        // Akses database secara pararel
        const [transaksiId, unpaidCicilan] = await Promise.all([
            // Simpan transaksi ke database
            this.transaksiRepository.createTransaksi(transaksi),
            
            // Ambil data cicilan
            this.cicilanRepository.getSortedUnpaidCicilanByPinjamanId(pinjamanId)
        ])
        if (!unpaidCicilan) {
            throw new Error('Cicilan tidak ditemukan');
        }      
        
        // Proses pembayaran cicilan
        const updatedCicilan = this.calculatePayment(unpaidCicilan, jumlah, transaksiId, tanggalPembayaran, keterangan);

        // Update Cicilan Repository
        await Promise.all(
            updatedCicilan.map((cicilan) => {
                if (cicilan.id) {                              
                    return this.cicilanRepository.updateCicilan(cicilan.id, cicilan)
                }
                else {
                    throw new Error('Update Cicilan tidak ditemukan')
                }
            }
        ));
    }

    private calculatePayment(
        unpaidCicilan: Cicilan[], 
        jumlah: number, 
        transaksiId: number,
        tanggalTransaksi: Date,
        keterangan?: string
        
        ): Cicilan[] {
        let remainingAmount = jumlah;
        const updatedCicilan: Cicilan[] = [];

        for (const cicilan of unpaidCicilan) {

            if (remainingAmount <= 0) {
                break;
            }
            if (cicilan.kurangBayar <= 0) {
                continue;
            }

            const jumlahBayar = Math.min(remainingAmount, cicilan.kurangBayar);
            const kurangBayar = cicilan.kurangBayar - jumlahBayar;

            // Create Pembayaran
            const pembayaran: Omit<Pembayaran, 'id'> = {
                transaksiId,
                tanggalBayar: tanggalTransaksi,
                jumlah: jumlahBayar,
                kurangBayar,
                keterangan
            };

            // Update Cicilan
            cicilan.pembayaran.push(pembayaran);
            cicilan.kurangBayar -= jumlahBayar;

            if (cicilan.kurangBayar <= 0) {
                cicilan.tanggalPembayaranLunas = new Date();

                if (
                    cicilan.tanggalJatuhTempo.getTime() + 24 * 60 * 60 * 1000 <
                    cicilan.tanggalPembayaranLunas.getTime()
                ) {
                    cicilan.status = 'Terlambat';
                } else {
                    cicilan.status = 'Dibayar';
                }
            }


            updatedCicilan.push(cicilan);

            remainingAmount -= jumlahBayar;
        }

        return updatedCicilan;
    }
}
export default CreateCicilanPayment