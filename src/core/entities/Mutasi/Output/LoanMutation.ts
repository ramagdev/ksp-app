import LoanMutationRow from "./LoanMutationRow";

export default interface LoanMutation {
  pinjamanId: number;
  pinjamanPokok: number;
  bunga: number;
  pinjamanBerbunga: number;
  saldoUtang: number;
  tanggalPinjaman: Date;
  statusPinjaman: 'Aktif' | 'Lunas' | 'Macet' | 'Gagal';
  keterangan?: string;
  cicilan: {
    cicilanId: number;
    nomorCicilan: number;
    tanggalJatuhTempo: Date;
    jumlahHarusDibayar: number;
    rows: LoanMutationRow[];
    tanggalPembayaranLunas: Date | null;
    lcDays: number;
    statusCicilan: 'Belum Bayar' | 'Dibayar' | 'Macet' | 'Terlambat';
  }[];
}