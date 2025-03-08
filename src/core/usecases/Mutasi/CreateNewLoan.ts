// src/core/usecases/Mutasi/CreateNewLoan.ts
import { PinjamanRepository } from '../../repositories/Mutasi/PinjamanRepository';
import { Pinjaman } from '../../entities/Mutasi/Pinjaman';
import { Transaksi } from '../../entities/Mutasi/Transaksi';

export class CreateNewLoan {
  constructor(private pinjamanRepository: PinjamanRepository) {}

  async execute(
    nasabahId: number,
    produkPinjamanId: number,
    jumlahPinjaman: number,
    tanggalPinjaman: Date,
    keterangan?: string // Tambahkan parameter opsional untuk keterangan
  ): Promise<number> {
    // Buat instance entity Pinjaman
    const pinjaman: Omit<Pinjaman, 'id'> = {
      nasabahId,
      produkPinjamanId,
      jumlahPinjaman,
      tanggalPinjaman,
      status: 'Aktif',
      keterangan, // Sertakan keterangan jika ada
    };

    // Simpan pinjaman ke repository
    const pinjamanId = await this.pinjamanRepository.createPinjaman(pinjaman);

    // Buat instance entity Transaksi
    const transaksi: Omit<Transaksi, 'id'> = {
      tanggalTransaksi: tanggalPinjaman,
      jenisTransaksi: 'Pinjaman',
      pinjamanId,
      jumlahTransaksi: jumlahPinjaman,
      keterangan, // Sertakan keterangan jika ada
    };

    // Simpan transaksi ke repository
    await this.pinjamanRepository.createTransaksi(transaksi);

    return pinjamanId;
  }
}