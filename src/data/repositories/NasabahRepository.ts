import Dexie from "dexie";
import { nasabahList } from "../../mocks/nasabah";

export interface Nasabah {
  id?: number;
  nama: string;
  telepon: string;
  nik: string;
  alamat: string;
}

export class NasabahRepository extends Dexie {
  nasabah: Dexie.Table<Nasabah, number>;

  constructor() {
    super("KoperasiDB");
    this.version(1).stores({
      nasabah: "++id, nama, telepon, alamat",
    });
    this.nasabah = this.table("nasabah");

    this.initData();
  }

  private async initData() {
    const storedNasabahList = await this.nasabah.toArray();
    const storedNasabahMap = new Map(storedNasabahList.map(n => [n.id, n]));

    for (const nasabah of nasabahList) {
      if (!storedNasabahMap.has(nasabah.id)) {
        await this.nasabah.add(nasabah);
      } else {
        const storedNasabah = storedNasabahMap.get(nasabah.id);
        if (storedNasabah && JSON.stringify(storedNasabah) !== JSON.stringify(nasabah)) {
          await this.nasabah.put(nasabah);
        }
      }
    }
  }

  // async getNasabahById(id: number): Promise<Nasabah | undefined> {
  //   const nasabah = this.nasabah.toArray();
  //   console.log("sampai sini", nasabah);
  //   return nasabah;
  // }



}
