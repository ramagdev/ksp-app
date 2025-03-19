import { PhotoRepository } from "../../../core/repositories/PhotoRepository";
import Dexie from "dexie";

export class PhotoIndexedDBRepository implements PhotoRepository {
  private db: Dexie;

  constructor() {
    this.db = new Dexie("KoperasiDB");
    this.db.version(5).stores({
      photos: "nasabahId, photo", // nasabahId sebagai primary key
    });
  }

  async savePhoto(nasabahId: number, photoBlob: Blob): Promise<void> {
    await this.db.table("photos").put({
      nasabahId,
      photo: photoBlob,
    });
    console.log("Foto berhasil disimpan untuk nasabahId:", nasabahId);
  }

  async getPhoto(nasabahId: number): Promise<Blob | null> {
    console.log("Mengambil foto untuk nasabahId:", nasabahId);
    const record = await this.db.table("photos").get(nasabahId);
    console.log("Record:", record);
    return record?.photo || null;
  }

  async deletePhoto(nasabahId: number): Promise<void> {
    await this.db.table("photos").update(nasabahId, { photo: null });
    console.log("Foto dihapus untuk nasabahId:", nasabahId);
  }

  async getPhotoUrl(nasabahId: number): Promise<string | null> {
    console.log("Mengambil URL foto untuk nasabahId:", nasabahId);
    const record = await this.db.table("photos").get(nasabahId);
    console.log("Record:", record);
    if (record?.photo) {
      const newUrl = URL.createObjectURL(record.photo);
      return newUrl;
    }
    return null;
  }
}