export interface NasabahDetail {
    id?: number;
    nasabahId: number; // Foreign key ke tabel nasabah
    tanggalLahir: Date;
    pekerjaanUsaha: string;
    statusPerkawinan: 'belum_menikah' | 'menikah' | 'duda' | 'janda';
    namaPasangan: string | null;
    penjamin: {
      nama: string;
      hubungan: 'anak' | 'orang_tua' | 'saudara';
    };
    foto: File | null;
  }

  import Dexie from "dexie";

export class NasabahDetailRepository extends Dexie {
  nasabahDetail: Dexie.Table<NasabahDetail, number>;

  constructor() {
    super("KoperasiDB");
    this.version(1).stores({
      nasabahDetail: "++id, nasabahId, tanggalLahir, pekerjaanUsaha, statusPerkawinan, pasangan, penjamin, foto " // Index nasabahId untuk query cepat
    });
    this.nasabahDetail = this.table("nasabahDetail");
  }

  // Contoh method untuk mendapatkan detail by nasabahId
  async getByNasabahId(nasabahId: number) {
    return this.nasabahDetail.where('nasabahId').equals(nasabahId).first();
  }
}