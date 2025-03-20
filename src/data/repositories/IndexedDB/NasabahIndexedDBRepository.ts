import Dexie from "dexie";
import { Nasabah } from "../../../core/entities/Nasabah";
import { NasabahRepository } from "../../../core/repositories/NasabahRepository";
import { nasabahList } from "../../../mocks/nasabah";

export class NasabahIndexedDBRepository extends Dexie implements NasabahRepository {
  nasabah: Dexie.Table<Nasabah, number>;

  constructor() {
    super("KoperasiDB");
    this.version(5).stores({
      nasabah: "++id, noKta, nama, telepon, nik, alamat, kodeMarketing",
    });
    this.nasabah = this.table("nasabah");
    // this.validateData(); // Komentar ini dipertahankan
    this.initData();
  }

  async getAll(): Promise<Nasabah[]> {
    return await this.nasabah.toArray();
  }

  // Metode baru: bulkPut
  async bulkPut(items: Nasabah[]): Promise<void> {
    await this.nasabah.bulkPut(items);
  }

  // Metode baru: getById
  async getById(id: number): Promise<Nasabah | undefined> {
    return await this.nasabah.get(id);
  }

  // Metode baru: clear
  async clear(): Promise<void> {
    await this.nasabah.clear();
  }

  // private async validateData() {
  //   const nasabahList = await this.nasabah.toArray();
  //   for (const nasabah of nasabahList) {
  //     if ((nasabah.id) && (!nasabah.nama || !nasabah.telepon || !nasabah.nik || !nasabah.alamat)) {
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

  // Perbaikan getNasabahById (jika ingin digunakan)
  // async getNasabahById(id: number): Promise<Nasabah | undefined> {
  //   return await this.nasabah.get(id); // Langsung gunakan get, bukan toArray
  // }
}