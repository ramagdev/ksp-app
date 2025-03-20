// src/core/usecases/Customer/GetPhotoUrl.ts
import { PhotoRepository } from "../../repositories/PhotoRepository";

export class GetPhotoUrl {
  constructor(private photoRepository: PhotoRepository) {}

  async execute(customerId: number): Promise<string | null> {
    try {
      const url = await this.photoRepository.getPhotoUrl(customerId);
      return url;
    } catch (error: Error | any) {
      throw new Error(`Gagal mendapatkan foto: ${error.message}`);
    }
  }
}