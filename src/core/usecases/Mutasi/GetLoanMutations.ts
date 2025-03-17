// src/core/usecases/Mutasi/GetLoanMutations.ts
import { PinjamanRepository } from '../../repositories/Mutasi/PinjamanRepository';
import { CicilanRepository } from '../../repositories/Mutasi/CicilanRepository';
import { ProdukPinjamanRepository } from '../../repositories/Mutasi/ProdukPinjamanRepository';

import LoanMutation from '../../entities/Mutasi/Output/LoanMutation';
import LoanMutationRow from '../../entities/Mutasi/Output/LoanMutationRow';
import { Pembayaran } from '../../entities/Mutasi/Pembayaran';

export class GetLoanMutations {
  constructor(
    private pinjamanRepository: PinjamanRepository,
    private cicilanRepository: CicilanRepository,
    private produkPinjamanRepository: ProdukPinjamanRepository,
  ) {}

  async execute(pinjamanId: number): Promise<LoanMutation> {
    const currentDate = new Date();

    // Ambil data pinjaman berdasarkan pinjamanId
    const pinjaman = await this.pinjamanRepository.getPinjamanById(pinjamanId);
    if (!pinjaman || pinjaman.id === undefined) {
      throw new Error('Pinjaman tidak ditemukan');
    }

    // Ambil data produk pinjaman
    const produkPinjaman = await this.produkPinjamanRepository.getProdukPinjamanById(pinjaman.produkPinjamanId);
    if (!produkPinjaman) {
      throw new Error('Produk pinjaman tidak ditemukan');
    }

    // Ambil daftar cicilan untuk pinjaman ini
    const cicilanList = await this.cicilanRepository.getAllCicilanByPinjamanId(pinjamanId);

    const sortedCicilan = [...cicilanList].sort(
      (a, b) => new Date(a.tanggalJatuhTempo).getTime() - new Date(b.tanggalJatuhTempo).getTime()
    );

    const jumlahPinjaman = pinjaman.jumlahPinjaman;
    const pinjamanBerbunga = jumlahPinjaman * (1 + produkPinjaman.bunga/100);

    // Pemisahan transaksi dalam cicilan
    const enrichedCicilan = sortedCicilan.map( (cicilan, index) => {
      const cicilanId = cicilan.id ?? null;
      if (!cicilanId) {
        throw new Error('Cicilan tidak ditemukan');
      }
      const nomorCicilan = index + 1;

      //Mengisi rows
      const rows = this.getLoanMutationRows(cicilan.pembayaran);

      const tanggalPembayaranLunas = cicilan.tanggalPembayaranLunas ?? null;

      const tanggalJatuhTempo = new Date(cicilan.tanggalJatuhTempo);

      const lcDay = (tanggalPembayaranLunas)
        ? Math.ceil(( tanggalPembayaranLunas.getTime() - tanggalJatuhTempo.getTime()) / (1000 * 60 * 60 * 24))
        : Math.ceil(( currentDate.getTime() - tanggalJatuhTempo.getTime()) / (1000 * 60 * 60 * 24));

      const lcDays = lcDay > 0 ? lcDay : 0;

      const statusCicilan = cicilan.status === 'Belum Bayar'
        ? lcDays > 0 ? 'Macet' : 'Belum Bayar'
        : cicilan.status as 'Belum Bayar' | 'Dibayar' | 'Macet' | 'Terlambat';

      return {
        cicilanId,
        nomorCicilan,
        tanggalJatuhTempo: cicilan.tanggalJatuhTempo,
        jumlahHarusDibayar: cicilan.jumlahHarusDibayar,
        rows,
        tanggalPembayaranLunas,
        lcDays,
        statusCicilan
      };
    });

    return {
      pinjamanId: pinjaman.id,
      pinjamanPokok: jumlahPinjaman,
      bunga: produkPinjaman.bunga,
      pinjamanBerbunga,
      tanggalPinjaman: pinjaman.tanggalPinjaman,
      statusPinjaman: pinjaman.status,
      keterangan: pinjaman.keterangan,
      cicilan: enrichedCicilan
    };
  }

  private getLoanMutationRows(pembayaranList: Pembayaran[] | undefined): LoanMutationRow[] {
    if (!pembayaranList) {
      return [];
    }
    const rows: LoanMutationRow[] = [];

    const sortedPembayaran = [...pembayaranList].sort(
      (a, b) => new Date(a.tanggalBayar).getTime() - new Date(b.tanggalBayar).getTime()
    )
    sortedPembayaran.map((pembayaran) => {
      const row: LoanMutationRow = {
        transaksiId: pembayaran.transaksiId,
        tanggalBayar: pembayaran.tanggalBayar,
        jumlah: pembayaran.jumlah,
        kurangBayar: pembayaran.kurangBayar,
        keterangan: pembayaran.keterangan
      }
      rows.push(row)
    })
    return rows 
  }
}