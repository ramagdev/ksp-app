// core/usecases/RestoreNasabahFromExcel.ts
import { utils, read } from 'xlsx';
import { Nasabah } from '../../entities/Nasabah';
import { NasabahRepository } from '../../repositories/NasabahRepository';

export class RestoreNasabahFromExcel {
  constructor(private repository: NasabahRepository) {}

  async execute(file: File): Promise<void> {
    const data = await this.readExcelFile(file);
    const validatedData = this.validateData(data);
    const uniqueData = await this.filterExistingData(validatedData);

    if (uniqueData.length > 0) {
      await this.repository.bulkPut(uniqueData);
      console.log(`Berhasil memulihkan ${uniqueData.length} data Nasabah baru`);
    } else {
      console.log('Tidak ada data baru untuk dipulihkan');
    }
  }

  private async readExcelFile(file: File): Promise<unknown[]> {
    const arrayBuffer = await file.arrayBuffer();
    const workbook = read(arrayBuffer, { type: 'array' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    return utils.sheet_to_json(worksheet);
  }

  private validateData(data: unknown[]): Nasabah[] {
    const requiredFields: (keyof Omit<Nasabah, 'id'>)[] = [
      'noKta',
      'nama',
      'telepon',
      'nik',
      'alamat',
      'kodeMarketing',
    ];

    const transformToString = (value: unknown): string => {
      const str = String(value || ''); // Konversi ke string, fallback ke kosong
      return str; // Tidak menghapus non-angka untuk noKta dan nik, kecuali diperlukan
    };

    const transformPhoneNumber = (phone: unknown): string => {
      const phoneStr = String(phone || '');
      return phoneStr.replace(/\D/g, ''); // Hanya untuk telepon, hapus non-angka
    };

    return data
      .filter((row) => {
        if (row === null || typeof row !== 'object') {
          console.warn('Baris bukan objek:', row);
          return false;
        }

        const rowTyped = row as Record<string, unknown>;

        const missingFields = requiredFields.filter(
          (field) =>
            !(field in rowTyped) ||
            rowTyped[field] === null ||
            rowTyped[field] === undefined ||
            String(rowTyped[field]).trim() === ''
        );

        if (missingFields.length > 0) {
          console.warn(`Baris tidak valid di Nasabah - Field hilang/kosong: ${missingFields.join(', ')}`, row);
          return false;
        }

        return true;
      })
      .map((row) => {
        const rowTyped = row as Partial<Nasabah> & Record<keyof Omit<Nasabah, 'id'>, unknown>;
        return {
          id: rowTyped['id'] !== undefined && rowTyped['id'] !== null ? Number(rowTyped['id']) : undefined,
          noKta: transformToString(rowTyped['noKta']),
          nama: String(rowTyped['nama']),
          telepon: transformPhoneNumber(rowTyped['telepon']),
          nik: transformToString(rowTyped['nik']),
          alamat: String(rowTyped['alamat']),
          kodeMarketing: String(rowTyped['kodeMarketing']),
        };
      });
  }

  private async filterExistingData(data: Nasabah[]): Promise<Nasabah[]> {
    const uniqueData: Nasabah[] = [];
    for (const row of data) {
      if (row.id === undefined) {
        uniqueData.push(row);
        continue;
      }

      if (typeof row.id !== 'number') {
        console.warn(`ID tidak valid pada baris:`, row);
        continue;
      }

      const existing = await this.repository.getById(row.id);
      if (!existing) {
        uniqueData.push(row);
      } else {
        console.log(`Data Nasabah dengan id ${row.id} sudah ada, dilewati`);
      }
    }
    return uniqueData;
  }
}