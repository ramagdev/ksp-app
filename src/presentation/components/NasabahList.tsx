import { Nasabah } from "../../data/repositories/NasabahRepository";

interface NasabahListProps {
  nasabahList: Nasabah[];
  isLoading?: boolean;
  error?: string | null;
}

export default function NasabahList({ nasabahList, isLoading, error }: NasabahListProps) {
  if (isLoading) {
    return <div className="text-center py-4">Memuat data...</div>;
  }

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  return (
    <div className="nasabah-list">
      <ul className="space-y-2">
        {nasabahList.map((nasabah) => (
          <li key={nasabah.id} className="p-4 border rounded-lg shadow-sm">
            <div className="font-semibold">{nasabah.nama}</div>
            <div className="text-sm text-gray-600">Telepon: {nasabah.telepon}</div>
            <div className="text-sm text-gray-600">NIK: {nasabah.nik}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}