export default interface LoanMutationRow {
    transaksiId: number;
    tanggalBayar: Date;
    jumlah: number;  
    kurangBayar: number;
    keterangan?: string;  
}
