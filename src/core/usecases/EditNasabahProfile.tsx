import { NasabahRepository } from "../../data/repositories/IndexDB/NasabahRepository";
import { NasabahDetailRepository } from "../../data/repositories/IndexDB/NasabahDetailRepository";

export class EditNasabahProfile {
  constructor(
    private nasabahRepo: NasabahRepository,
    private nasabahDetailRepo: NasabahDetailRepository
  ) {}

  async execute(
    nasabahId: number,
    field: string,
    value: any
  ): Promise<{ success: boolean; error: string | null }> {
    try {
      const updates: Record<string, any> = { [field]: value };

      // Update data nasabah
      await this.nasabahRepo.nasabah.update(nasabahId, updates);

      // Update data detail jika field ada di detail
      await this.nasabahDetailRepo.nasabahDetail
        .where("nasabahId")
        .equals(nasabahId)
        .modify(updates);

      return { success: true, error: null };
    } catch (err) {
      return { success: false, error: "Gagal menyimpan perubahan" };
    }
  }
}