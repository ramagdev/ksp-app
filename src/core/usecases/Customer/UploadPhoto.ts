// src/core/usecases/Customer/UploadPhoto.ts
import { PhotoRepository } from "../../repositories/PhotoRepository";

export class UploadPhoto {
  constructor(private photoRepository: PhotoRepository) {}

  async execute(
    nasabahId: number,
    file: File,
    options?: { maxWidth?: number; maxHeight?: number }
  ): Promise<string | null> {
    try {
      // Optimasi gambar
      const processedBlob = await this.processImage(file, options);
      console.log("Foto di-upload di use case:", processedBlob);

      // Simpan ke repository menggunakan nasabahId
      await this.photoRepository.savePhoto(nasabahId, processedBlob);

      // Dapatkan URL untuk preview
      const photoUrl = await this.photoRepository.getPhotoUrl(nasabahId);
      console.log("Foto URL di-upload di use case:", photoUrl);
      
      if (!photoUrl) {
        throw new Error("Gagal mendapatkan URL foto setelah upload");
      }

      return photoUrl;
    } catch (error: any) {
      console.error("Error saat mengupload foto:", error);
      throw new Error(`Gagal mengupload foto: ${error.message || "Unknown error"}`);
    }
  }

  private async processImage(
    file: File,
    options?: { maxWidth?: number; maxHeight?: number }
  ): Promise<Blob> {
    if (!options?.maxWidth && !options?.maxHeight) {
      return file;
    }
    
    return await this.resizeImage(
      file,
      options.maxWidth || 800,
      options.maxHeight || 600
    );
  }

  private async resizeImage(
    file: File,
    maxWidth: number,
    maxHeight: number
  ): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const img = document.createElement("img");

      // Membaca file sebagai Data URL
      const reader = new FileReader();
      reader.onload = (e) => {
        img.src = e.target?.result as string;
      };
      reader.onerror = () => reject(new Error("Gagal membaca file gambar"));
      reader.readAsDataURL(file);

      // Menunggu gambar dimuat
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d")!;
        
        // Hitung rasio resize
        const ratio = Math.min(maxWidth / img.width, maxHeight / img.height);
        canvas.width = img.width * ratio;
        canvas.height = img.height * ratio;

        // Gambar ulang ke canvas
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Konversi ke Blob
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error("Gagal mengkonversi canvas ke Blob"));
            }
          },
          "image/jpeg",
          0.8 // Kualitas kompresi
        );
      };
      img.onerror = () => reject(new Error("Gagal memuat gambar"));
    });
  }
}