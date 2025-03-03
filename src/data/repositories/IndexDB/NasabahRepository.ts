import Dexie from "dexie";
import { Nasabah } from "../../../core/entities/Nasabah";
import { NasabahRepository } from "../../../core/repositories/NasabahRepository";
import { nasabahList } from "../../../mocks/nasabah";

export class NasabahIndexedDBRepository extends Dexie implements NasabahRepository {
  nasabah: Dexie.Table<Nasabah, number>;

  constructor() {
    super("KoperasiDB");
    this.version(1).stores({
      nasabah: "++id, nama, telepon, alamat",
    });
    this.nasabah = this.table("nasabah");
    // this.validateData();
    this.initData();

  }

  async getAll(): Promise<Nasabah[]> {
    return await this.nasabah.toArray();
  }

  // private async validateData() {
  //   const nasabahList = await this.nasabah.toArray();
  //   for (const nasabah of nasabahList) {
  //     if ((nasabah.id)&&(!nasabah.nama || !nasabah.telepon || !nasabah.nik || !nasabah.alamat)) {
  //       await this.nasabah.delete(nasabah.id);
  //     }
  //   }
  // }

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
