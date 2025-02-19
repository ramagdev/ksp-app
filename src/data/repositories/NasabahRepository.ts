import Dexie from "dexie";
import { nasabahList } from "../../mocks/nasabah";

export interface Nasabah {
  id?: number;
  nama: string;
  telepon: string;
  nik: string;
}

export class NasabahRepository extends Dexie {
  nasabah: Dexie.Table<Nasabah, number>;

  constructor() {
    super("KoperasiDB");
    this.version(1).stores({
      nasabah: "++id, nama, telepon, nik",
    });
    this.nasabah = this.table("nasabah");

    this.initData();
  }

  private async initData() {
    const count = await this.nasabah.count();
    if (count === 0) {
      await this.nasabah.bulkAdd(nasabahList);
    }
  }
}