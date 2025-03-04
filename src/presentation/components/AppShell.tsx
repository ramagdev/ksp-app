import React, { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import BackupMultipleTablesButton from "./BackupMultipleTablesButton";

export const AppShell: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Untuk dropdown mobile
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Untuk sidebar desktop

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header dengan Tombol Toggle untuk Mobile */}
      <header className="bg-gray-800 text-white p-4 flex justify-between items-center md:hidden">
        <h1 className="text-xl font-bold">KSP MAS</h1>
        <button
          onClick={toggleMenu}
          className="p-2 rounded-md hover:bg-gray-700 focus:outline-none"
        >
          {isMenuOpen ? (
            <XMarkIcon className="w-6 h-6" />
          ) : (
            <Bars3Icon className="w-6 h-6" />
          )}
        </button>
      </header>

      {/* Kontainer untuk Sidebar dan Konten */}
      <div className="flex flex-1">
        {/* Dropdown Menu untuk Mobile */}
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } md:hidden bg-gray-800 text-white absolute top-16 left-0 w-full z-10`}
        >
          <nav>
            <ul className="space-y-2 p-4">
              <li>
                <NavLink
                  to="/home"
                  className={({ isActive }) =>
                    `flex items-center p-2 rounded-md hover:bg-gray-700 ${
                      isActive ? "bg-gray-700" : ""
                    }`
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  <span className="ml-3">Daftar Nasabah</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/tambah-nasabah"
                  className={({ isActive }) =>
                    `flex items-center p-2 rounded-md hover:bg-gray-700 ${
                      isActive ? "bg-gray-700" : ""
                    }`
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                    />
                  </svg>
                  <span className="ml-3">Tambah Nasabah</span>
                </NavLink>
              </li>
              <li>
                <BackupMultipleTablesButton
                  isSidebarOpen={isSidebarOpen}
                  isMenuOpen={isMenuOpen}
                />
              </li>
            </ul>
          </nav>
        </div>

        {/* Sidebar untuk Desktop */}
        <div
          className={`hidden md:flex ${
            isSidebarOpen ? "md:w-64" : "md:w-16"
          } bg-gray-800 text-white flex-col min-h-screen transition-all duration-300 ease-in-out`}
        >
          <div className="p-4 flex justify-between items-center">
            {isSidebarOpen && <h1 className="text-xl font-bold">KSP Makmur Adil Sejahtera</h1>}
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-md hover:bg-gray-700 focus:outline-none"
            >
              {isSidebarOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <div className="group">
                  <span className="ml-5 absolute -translate-y-4 text-black opacity-0 group-hover:opacity-100 bg-white text-sm px-2 py-1 rounded">Menu</span>
                  <Bars3Icon className="w-6 h-6" />
                </div>
              )}
            </button>
          </div>
          <nav className="flex-1">
            <ul className="space-y-2 p-2">
              <li>
                <NavLink
                  to="/home"
                  className={({ isActive }) =>
                    `flex items-center p-2 rounded-md hover:bg-gray-700 ${
                      isActive ? "bg-gray-700" : ""
                    }`
                  }
                >
                  <div className="group">
                    <span className="ml-5 absolute -translate-y-4 text-black opacity-0 group-hover:opacity-100 bg-white text-sm px-2 py-1 rounded">Daftar Nasabah</span>
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                  </div>
                  {isSidebarOpen && <span className="ml-3">Daftar Nasabah</span>}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/tambah-nasabah"
                  className={({ isActive }) =>
                    `flex items-center p-2 rounded-md hover:bg-gray-700 ${
                      isActive ? "bg-gray-700" : ""
                    }`
                  }
                >
                  <div className="group">
                    <span className="ml-5 absolute -translate-y-4 text-black opacity-0 group-hover:opacity-100 bg-white text-sm px-2 py-1 rounded">Tambah Nasabah</span>
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                      />
                    </svg>
                  </div>
                  {isSidebarOpen && <span className="ml-3">Tambah Nasabah</span>}
                </NavLink>
              </li>
              <li>
                <BackupMultipleTablesButton
                  isSidebarOpen={isSidebarOpen}
                  isMenuOpen={isMenuOpen}
                 />
              </li>
            </ul>
          </nav>
        </div>

        {/* Konten Utama */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <main className="flex-1 overflow-y-auto p-6 bg-purple-200">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};