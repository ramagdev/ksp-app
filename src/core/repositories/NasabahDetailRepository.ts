import { NasabahDetail } from "../entities/NasabahDetail";

export interface NasabahDetailRepository {
  getAll(): Promise<NasabahDetail[]>;
}