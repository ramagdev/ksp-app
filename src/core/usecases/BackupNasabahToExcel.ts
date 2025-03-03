import { Nasabah } from "../entities/Nasabah";
import { NasabahRepository } from "../repositories/NasabahRepository";
import * as XLSX from "xlsx";

export class BackupNasabahToExcel {
  constructor(private nasabahRepository: NasabahRepository) {}

  async execute(): Promise<Blob> {
    const data = await this.nasabahRepository.getAll();
    return this.convertToExcel(data);
  }

  private convertToExcel(data: Nasabah[]): Blob {
    // Buat worksheet dari data
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Buat workbook dan tambahkan worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Nasabah");

    // Generate file Excel dalam bentuk binary string
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    // Konversi binary string ke Blob
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    return blob;
  }
}