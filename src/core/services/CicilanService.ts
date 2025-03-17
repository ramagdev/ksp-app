// src/core/services/CicilanService.ts
import { ProdukPinjamanEntity } from '../entities/Mutasi/ProdukPinjaman';
import { Cicilan } from '../entities/Mutasi/Cicilan';

export class CicilanService {
  static generateCicilan(
    pinjamanId: number,
    jumlahPinjaman: number,
    produkPinjaman: ProdukPinjamanEntity,
    tanggalPinjaman: Date
  ): Cicilan[] {
    const cicilanList: Cicilan[] = [];
    const { banyakCicilan, jarakCicilan, bunga } = produkPinjaman;

    // Hitung jumlah yang harus dibayar per cicilan (pokok + bunga)
    const jumlahHarusDibayar = (jumlahPinjaman / banyakCicilan) * (1 + bunga / 100);

    for (let i = 1; i <= banyakCicilan; i++) {
      const tanggalJatuhTempo = this.calculateDueDate(tanggalPinjaman, jarakCicilan, i);

      cicilanList.push({
        pinjamanId,
        tanggalJatuhTempo,
        jumlahHarusDibayar,
        kurangBayar: jumlahHarusDibayar,
        pembayaran: [],
        status: 'Belum Bayar', // Default status
      });
    }

    return cicilanList;
  }

  private static calculateDueDate(
    startDate: Date,
    interval: 'Harian' | 'Mingguan' | 'Bulanan',
    intervalCount: number
  ): Date {
    const date = new Date(startDate);

    switch (interval) {
      case 'Harian':
        date.setDate(date.getDate() + intervalCount);
        break;
      case 'Mingguan':
        date.setDate(date.getDate() + intervalCount * 7);
        break;
      case 'Bulanan':
        date.setMonth(date.getMonth() + intervalCount);
        break;
      default:
        throw new Error('Jarak cicilan tidak valid');
    }

    return date;
  }
}