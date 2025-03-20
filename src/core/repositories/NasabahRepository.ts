import { Nasabah } from "../entities/Nasabah";

export interface NasabahRepository {
  getAll(): Promise<Nasabah[]>;
  bulkPut(nasabahs: Nasabah[]): Promise<void>;
  getById(id: number): Promise<Nasabah | undefined>;
  clear(): Promise<void>;
}