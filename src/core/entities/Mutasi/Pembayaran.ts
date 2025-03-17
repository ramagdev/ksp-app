export interface Pembayaran {
    id?: number
    transaksiId: number
    tanggalBayar: Date
    jumlah: number
    kurangBayar: number
    keterangan?: string
}