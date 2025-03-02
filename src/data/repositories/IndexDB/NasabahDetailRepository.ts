import Dexie from "dexie";
import { NasabahDetail } from "../../../core/entities/NasabahDetail";
import { nasabahDetailList } from "../../../mocks/nasabahdetail";

export class NasabahDetailRepository extends Dexie {
  nasabahDetail: Dexie.Table<NasabahDetail, number>;

  constructor() {
    super("KoperasiDB");
    this.version(1).stores({
      nasabahDetail:
        "++id, nasabahId, tanggalLahir, pekerjaanUsaha, statusPerkawinan, namaPasangan, namaPenjamin, hubunganPenjamin, teleponPenjamin, foto",
    });
    this.nasabahDetail = this.table("nasabahDetail");
    this.initData();
  }

  private async initData() {
      const storedNasabahList = await this.nasabahDetail.toArray();
      const storedNasabahMap = new Map(storedNasabahList.map(n => [n.id, n]));
  
      for (const nasabah of nasabahDetailList) {
        if (!storedNasabahMap.has(nasabah.id)) {
          await this.nasabahDetail.add(nasabah);
        } else {
          const storedNasabah = storedNasabahMap.get(nasabah.id);
          if (storedNasabah && JSON.stringify(storedNasabah) !== JSON.stringify(nasabah)) {
            await this.nasabahDetail.put(nasabah);
          }
        }
      }
    }

  // Method untuk mendapatkan detail by nasabahId
  async getByNasabahId(nasabahId: number) {
    return this.nasabahDetail.where("nasabahId").equals(nasabahId).first();
  }

  // Method untuk membuat entri baru jika tidak ada
  async createIfNotExists(nasabahId: number, initialData: Partial<NasabahDetail>) {
    const existingDetail = await this.getByNasabahId(nasabahId);
    if (!existingDetail) {
      const newDetail: NasabahDetail = {
        nasabahId: nasabahId,
        tanggalLahir: new Date(),
        pekerjaanUsaha: "",
        statusPerkawinan: "Belum Menikah",
        namaPasangan: "",
        namaPenjamin: "",
        hubunganPenjamin: "Saudara",
        teleponPenjamin: "",
        foto: null,
        ...initialData,
      };
      await this.nasabahDetail.add(newDetail);
    }
  }
}