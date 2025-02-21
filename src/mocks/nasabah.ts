export interface Nasabah {
  id: number;
  nama: string;
  telepon: string;
  nik: string;
  alamat: string;
}

export const nasabahList: Nasabah[] = [
  { 
    id: 1, 
    nama: "John Doe", 
    telepon: "081234567890", 
    nik: "1234567890123456",
    alamat: "Jl. Sudirman No. 123, Jakarta Pusat" 
  },
  { 
    id: 2, 
    nama: "Jane Smith", 
    telepon: "081234567891", 
    nik: "1234567890123457",
    alamat: "Jl. Asia Afrika No. 45, Bandung" 
  },
  { 
    id: 3, 
    nama: "Alice Johnson", 
    telepon: "081234567892", 
    nik: "1234567890123458",
    alamat: "Jl. Pemuda No. 67, Surabaya" 
  },
  { 
    id: 4, 
    nama: "Bob Brown", 
    telepon: "081234567893", 
    nik: "1234567890123459",
    alamat: "Jl. Gajah Mada No. 89, Medan" 
  },
  { 
    id: 5, 
    nama: "Charlie Davis", 
    telepon: "081234567894", 
    nik: "1234567890123460",
    alamat: "Jl. Malioboro No. 12, Yogyakarta" 
  },
  { 
    id: 6, 
    nama: "Eva Wilson", 
    telepon: "081234567895", 
    nik: "1234567890123461",
    alamat: "Jl. Teuku Umar No. 34, Denpasar" 
  },
  { 
    id: 7, 
    nama: "Frank Miller", 
    telepon: "081234567896", 
    nik: "1234567890123462",
    alamat: "Jl. Diponegoro No. 56, Semarang" 
  },
  { 
    id: 8, 
    nama: "Grace Lee", 
    telepon: "081234567897", 
    nik: "1234567890123463",
    alamat: "Jl. Ahmad Yani No. 78, Makassar" 
  },
  { 
    id: 9, 
    nama: "Henry Garcia", 
    telepon: "081234567898", 
    nik: "1234567890123464",
    alamat: "Jl. Sisingamangaraja No. 90, Palembang" 
  },
  { 
    id: 10, 
    nama: "Ivy Martinez", 
    telepon: "081234567899", 
    nik: "1234567890123465",
    alamat: "Jl. Panglima Sudirman No. 11, Malang" 
  },
];