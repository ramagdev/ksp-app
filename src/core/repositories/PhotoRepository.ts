export interface PhotoRepository {
  savePhoto(nasabahId: number, photoBlob: Blob): Promise<void>;
  getPhoto(nasabahId: number): Promise<Blob | null>;
  deletePhoto(nasabahId: number): Promise<void>;
  getPhotoUrl(nasabahId: number): Promise<string | null>;
}