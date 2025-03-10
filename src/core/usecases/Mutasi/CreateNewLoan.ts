// src/core/usecases/Mutasi/CreateNewLoan.ts
import { PinjamanRepository } from '../../repositories/Mutasi/PinjamanRepository';
import { TransaksiRepository } from '../../repositories/Mutasi/TransaksiRepository';
import { CicilanRepository } from '../../repositories/Mutasi/CicilanRepository';
import { ProdukPinjamanRepository } from '../../repositories/Mutasi/ProdukPinjamanRepository';

import { Pinjaman } from '../../entities/Mutasi/Pinjaman';
import { Transaksi } from '../../entities/Mutasi/Transaksi';
import { CicilanService } from '../../services/CicilanService';

export class CreateNewLoan {
  constructor(
    private pinjamanRepository: PinjamanRepository,
    private transaksiRepository: TransaksiRepository,
    private cicilanRepository: CicilanRepository,
    private produkPinjamanRepository: ProdukPinjamanRepository
  ) {}

  async execute(
    nasabahId: number,
    produkPinjamanId: number,
    jumlahPinjaman: number,
    tanggalPinjaman: Date,
    keterangan?: string
  ): Promise<number> {
    // Validasi input
    if (jumlahPinjaman <= 0) {
      throw new Error('Jumlah pinjaman harus lebih besar dari 0');
    }

    if (!tanggalPinjaman || isNaN(tanggalPinjaman.getTime())) {
      throw new Error('Tanggal pinjaman tidak valid');
    }

    // Ambil data produk pinjaman
    const produkPinjaman = await this.produkPinjamanRepository.getProdukPinjamanById(produkPinjamanId);
    if (!produkPinjaman) {
      throw new Error('Produk pinjaman tidak ditemukan');
    }

    // Buat instance entity Pinjaman
    const pinjaman: Omit<Pinjaman, 'id'> = {
      nasabahId,
      produkPinjamanId,
      jumlahPinjaman,
      tanggalPinjaman,
      status: 'Aktif',
      keterangan,
    };

    // Simpan pinjaman ke repository
    const pinjamanId = await this.pinjamanRepository.createPinjaman(pinjaman);

    // Buat instance entity Transaksi
    const transaksi: Omit<Transaksi, 'id'> = {
      tanggalTransaksi: tanggalPinjaman,
      jenisTransaksi: 'Pinjaman',
      pinjamanId,
      jumlahTransaksi: jumlahPinjaman,
      keterangan,
    };

    // Simpan transaksi ke repository
    await this.transaksiRepository.createTransaksi(transaksi);

    // Generate cicilan berdasarkan produk pinjaman
    const cicilanList = CicilanService.generateCicilan(
      pinjamanId,
      jumlahPinjaman,
      produkPinjaman,
      tanggalPinjaman
    );

    // Simpan cicilan ke repository
    await this.cicilanRepository.createCicilanBatch(cicilanList);

    return pinjamanId;
  }
}