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

  async getAll(): Promise<{ nasabahId: number; photo: Blob }[]> {
    return await this.db.table("photos").toArray();
  }
  
  async savePhoto(nasabahId: number, photoBlob: Blob): Promise<void> {
    await this.db.table("photos").put({
      nasabahId,
      photo: photoBlob,
    });
  }

  async getPhoto(nasabahId: number): Promise<Blob | null> {
    const record = await this.db.table("photos").get(nasabahId);
    return record?.photo || null;
  }

  async deletePhoto(nasabahId: number): Promise<void> {
    await this.db.table("photos").update(nasabahId, { photo: null });
  }

  async getPhotoUrl(nasabahId: number): Promise<string | null> {
    const record = await this.db.table("photos").get(nasabahId);
    if (record?.photo) {
      const newUrl = URL.createObjectURL(record.photo);
      return newUrl;
    }
    return null;
  }
}