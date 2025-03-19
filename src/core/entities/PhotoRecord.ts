interface PhotoRecord {
  nasabahId: number; // Primary key
  photo?: Blob; // Langsung simpan Blob
}

export default PhotoRecord;