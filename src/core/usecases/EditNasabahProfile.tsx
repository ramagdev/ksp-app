import { NasabahIndexedDBRepository as NasabahRepository } from "../../data/repositories/IndexDB/NasabahRepository";
import { NasabahDetailIndexedDBRepository as NasabahDetailRepository } from "../../data/repositories/IndexDB/NasabahDetailRepository";
import { NasabahDetail } from "../../core/entities/NasabahDetail";

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
  
      // Perbarui data nasabah jika field ada di nasabah
      console.log(this.nasabahRepo.nasabah.schema.idxByName);
      if (field in this.nasabahRepo.nasabah.schema.idxByName) {
        await this.nasabahRepo.nasabah.update(nasabahId, updates);
      }
  
      // Perbarui data detail jika field ada di detail
      if (field in this.nasabahDetailRepo.nasabahDetail.schema.idxByName) {

        const existingDetail = await this.nasabahDetailRepo.nasabahDetail
          .where("nasabahId")
          .equals(nasabahId)
          .first();
  
        if (existingDetail) {
          // Jika ada, perbarui entri yang sudah ada
          await this.nasabahDetailRepo.nasabahDetail
            .where("nasabahId")
            .equals(nasabahId)
            .modify(updates);
        } else {
          // Jika tidak ada, buat entri baru
          const newDetail: NasabahDetail = {
            nasabahId: nasabahId,
            tanggalLahir: new Date(),
            pekerjaanUsaha: "",
            statusPerkawinan: "Belum Menikah",
            namaPasangan: "",
            namaPenjamin: "",
            hubunganPenjamin: "Saudara",
            teleponPenjamin: "",
            foto: null,
            ...updates, // Tambahkan field yang diubah
          };
          await this.nasabahDetailRepo.nasabahDetail.add(newDetail);
        }
      }
  
      return { success: true, error: null };
    } catch (err) {
      console.error("Error saat menyimpan perubahan:", err);
      return { success: false, error: "Gagal menyimpan perubahan" };
    }
  }
}