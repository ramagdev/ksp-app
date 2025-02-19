import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="app">
      <h1 className="text-2xl font-bold text-center my-4">Aplikasi Koperasi</h1>
      <Outlet /> {/* Ini akan merender komponen yang sesuai dengan route */}
    </div>
  );
}

export default App;