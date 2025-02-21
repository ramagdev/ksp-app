import { Nasabah } from "../../data/repositories/NasabahRepository";

interface NasabahListProps {
  nasabahList: Nasabah[];
  isLoading?: boolean;
  error?: string | null;
}

export default function NasabahList({ nasabahList, isLoading, error }: NasabahListProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-lg border border-red-200 text-red-600">
        <p className="font-semibold">Error:</p>
        <p>{error}</p>
      </div>
    );
  }
  return (
    <div className="nasabah-list bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nama
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Telepon
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                NIK
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Alamat
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {nasabahList.map((nasabah) => (
              <tr key={nasabah.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {nasabah.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {nasabah.nama}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {nasabah.telepon}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {nasabah.nik}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {nasabah.alamat}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {nasabahList.length === 0 && (
        <div className="p-6 text-center text-gray-500">
          Tidak ada data nasabah.
        </div>
      )}
    </div>
  );
}