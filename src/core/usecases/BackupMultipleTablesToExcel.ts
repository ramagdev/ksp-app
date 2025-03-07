import { write, utils } from 'xlsx';

export class BackupMultipleTablesToExcel {
  constructor(private repositories: Record<string, any>) {}

  async execute(): Promise<Record<string, Blob>> {
    const backups: Record<string, Blob> = {};

    for (const [tableName, repository] of Object.entries(this.repositories)) {
      const data = await repository.getAll();
      const blob = this.convertToExcel(data, tableName);
      backups[tableName] = blob;
    }

    return backups;
  }

  private convertToExcel(data: any[], tableName: string): Blob {
    // Buat worksheet dari data
    const worksheet = utils.json_to_sheet(data);

    // Buat workbook dan tambahkan worksheet
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, tableName);

    // Generate file Excel dalam bentuk binary string
    const excelBuffer = write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });

    // Konversi binary string ke Blob
    const blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });

    return blob;
  }
}