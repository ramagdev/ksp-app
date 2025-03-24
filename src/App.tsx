import { Outlet } from 'react-router-dom';
import logo from './assets/logo-kspmas.png';
import logoKoperasi from './assets/logo-koperasi.gif';
import aktaPendirian from './assets/akta-pendirian.pdf';
import nibKsp from './assets/nib-ksp.pdf';
import pengesahan from './assets/pengesahan-kemenkumham.pdf';
import npwp from './assets/npwp.pdf';
import LoginForm from './presentation/components/forms/Login';

function App() {
  return (
    <div className="app">
      <div className="grid grid-cols-3 grid-rows-[min-content,1fr,min-content] gap-4 min-h-screen bg-white shadow rounded-lg px-6 py-8">
        {/* Header dengan Logo */}
        <img 
          src={logoKoperasi} 
          alt="Logo Koperasi Indonesia" 
          className="my-15 h-24 w-24 row-start-1 col-start-1 justify-self-end self-start" 
        />
        <h1 className="mt-20 mb-35 text-2xl font-bold text-center row-start-1 col-start-2 self-start">
          KOPERASI SIMPAN PINJAM<p>MAKMUR ADIL SEJAHTERA</p>
        </h1>
        <img 
          src={logo} 
          alt="Logo KSP MAS" 
          className="my-15 h-24 w-24 row-start-1 col-start-3 justify-self-start self-start" 
        />

        {/* Form Login */}
        <div className="mb-15 col-span-3 row-start-2 flex items-center justify-center">
          <div className="w-full max-w-md bg-gray-50 p-8 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">Masuk ke Aplikasi</h2>
            <LoginForm />
          </div>
        </div>

        {/* Section Dokumen Legalitas */}
        <div className="col-span-3 row-start-3 px-6 py-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 border-b-2 border-gray-200 pb-2">
              Dokumen Legalitas Usaha
            </h2>
            <div className="space-y-4">
              <a 
                href={aktaPendirian} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 text-gray-700 hover:text-gray-900 transition-colors duration-200"
              >
                <span className="font-medium">Akta Pendirian Koperasi</span>
                <p className="text-sm text-gray-500">Dokumen resmi pendirian Koperasi Simpan Pinjam Makmur Adil Sejahtera</p>
              </a>
              
              <a 
                href={nibKsp}
                target="_blank" 
                rel="noopener noreferrer"
                className="block px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 text-gray-700 hover:text-gray-900 transition-colors duration-200"
              >
                <span className="font-medium">Nomor Induk Berusaha</span>
                <p className="text-sm text-gray-500">Izin operasional resmi dari instansi terkait</p>
              </a>
              
              <a 
                href={pengesahan}
                target="_blank" 
                rel="noopener noreferrer"
                className="block px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 text-gray-700 hover:text-gray-900 transition-colors duration-200"
              >
                <span className="font-medium">SK Pengesahan</span>
                <p className="text-sm text-gray-500">SK Pengesahan oleh Ditjen AHU</p>
              </a>

              <a 
                href={npwp}
                target="_blank" 
                rel="noopener noreferrer"
                className="block px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 text-gray-700 hover:text-gray-900 transition-colors duration-200"
              >
                <span className="font-medium">NPWP</span>
                <p className="text-sm text-gray-500">NPWP KSP Makmur Adil Sejahtera</p>
              </a>

            </div>
          </div>
        </div>
      </div>
      
      <Outlet /> {/* Ini akan merender komponen yang sesuai dengan route */}
    </div>
  );
}

export default App;