// src/core/usecases/Mutasi/GetLoanMutations.ts
import { PinjamanRepository } from '../../repositories/Mutasi/PinjamanRepository';
import { CicilanRepository } from '../../repositories/Mutasi/CicilanRepository';
import { TransaksiRepository } from '../../repositories/Mutasi/TransaksiRepository';
import { ProdukPinjamanRepository } from '../../repositories/Mutasi/ProdukPinjamanRepository';
import LoanMutation from '../../entities/Mutasi/LoanMutation';

export class GetLoanMutations {
  constructor(
    private pinjamanRepository: PinjamanRepository,
    private cicilanRepository: CicilanRepository,
    private transaksiRepository: TransaksiRepository,
    private produkPinjamanRepository: ProdukPinjamanRepository
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
    const cicilanList = await this.cicilanRepository.getCicilanByPinjamanId(pinjamanId);

    // Ambil daftar transaksi pembayaran untuk pinjaman ini
    const transaksiPembayaran = await this.transaksiRepository.getTransaksiByPinjamanId(pinjamanId);

    // Urutkan cicilan berdasarkan tanggal jatuh tempo
    const sortedCicilan = [...cicilanList].sort(
      (a, b) => new Date(a.tanggalJatuhTempo).getTime() - new Date(b.tanggalJatuhTempo).getTime()
    );

    // Hitung total pembayaran dari transaksi
    let remainingPayment = transaksiPembayaran.reduce((sum, t) => sum + t.jumlahTransaksi, 0);
    const tanggalBayarList = transaksiPembayaran.map(t => t.tanggalTransaksi);

    // Alokasi pembayaran ke cicilan
    const enrichedCicilan = sortedCicilan.map((cicilan, index) => {
      const pembayaran = Math.min(remainingPayment, cicilan.jumlahHarusDibayar);
      remainingPayment -= pembayaran;
      const kurangBayar = cicilan.jumlahHarusDibayar - pembayaran;

      const isPaid = pembayaran >= cicilan.jumlahHarusDibayar;
      const isOverdue = !isPaid && currentDate > cicilan.tanggalJatuhTempo;
      const isLate =
        isPaid && tanggalBayarList.some(t => t > cicilan.tanggalJatuhTempo);
      const diffTime = currentDate.getTime() - cicilan.tanggalJatuhTempo.getTime();
      const lcDays = isPaid || diffTime <= 0 ? 0 : Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      // Tentukan status dengan tipe eksplisit
      const status: 'Belum Bayar' | 'Dibayar' | 'Macet' | 'Terlambat' = isPaid
        ? isLate
          ? 'Terlambat'
          : 'Dibayar'
        : isOverdue
        ? 'Macet'
        : 'Belum Bayar';

      return {
        nomor: index + 1,
        tanggalJatuhTempo: cicilan.tanggalJatuhTempo,
        jumlahHarusDibayar: cicilan.jumlahHarusDibayar,
        tanggalBayar: pembayaran > 0 ? [...tanggalBayarList] : [],
        lcDays,
        pembayaran,
        kurangBayar: kurangBayar < 0 ? 0 : kurangBayar,
        status,
        keterangan: cicilan.keterangan,
      };
    });

    // Kembalikan data mutasi untuk pinjaman ini
    return {
      pinjamanId: pinjaman.id,
      nasabahId: pinjaman.nasabahId,
      produkPinjamanNama: produkPinjaman.namaProduk, // Pastikan field ini sesuai
      jumlahPinjaman: pinjaman.jumlahPinjaman,
      tanggalPinjaman: pinjaman.tanggalPinjaman,
      statusPinjaman: pinjaman.status,
      cicilan: enrichedCicilan,
    };
  }
}