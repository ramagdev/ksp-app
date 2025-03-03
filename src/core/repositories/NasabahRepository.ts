import { Nasabah } from "../entities/Nasabah";

export interface NasabahRepository {
  getAll(): Promise<Nasabah[]>;
}