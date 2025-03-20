// AppShell.tsx
import React, { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import BackupMultipleTablesButton from "./BackupMultipleTablesButton";

interface NavItemProps {
  to: string;
  label: string;
  icon: React.ReactNode;
  isSidebarOpen: boolean;
  isMenuOpen: boolean;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ to, label, icon, isSidebarOpen, isMenuOpen, onClick }) => (
  <li>
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center p-2 rounded-md hover:bg-gray-700 ${isActive ? "bg-gray-700" : ""}`
      }
      onClick={onClick}
    >
      <div className="group relative">
        <span
          className={`absolute -translate-y-4 left-8 text-black opacity-0 group-hover:opacity-100 bg-white text-sm px-2 py-1 rounded transition-opacity ${
            isSidebarOpen ? "hidden" : ""
          }`}
        >
          {label}
        </span>
        {icon}
      </div>
      {(isSidebarOpen || isMenuOpen) && <span className="ml-3">{label}</span>}
    </NavLink>
  </li>
);

export const AppShell: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Dropdown mobile
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar desktop

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const navItems = [
    {
      to: "/home",
      label: "Daftar Nasabah",
      icon: (
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
      ),
    },
    {
      to: "/tambah-nasabah",
      label: "Tambah Nasabah",
      icon: (
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
      ),
    },
    {
      to: "/produk-pinjaman",
      label: "Kelola Produk Pinjaman",
      icon: (
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
            strokeWidth={1.5}
            d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
          />
        </svg>
      ),
    },
    {
      to: "/restore",
      label: "Restore Data",
      icon: (
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
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header Mobile */}
      <header className="bg-gray-800 text-white p-4 flex justify-between items-center md:hidden">
        <h1 className="text-xl font-bold">KSP MAS</h1>
        <button
          onClick={toggleMenu}
          className="p-2 rounded-md hover:bg-gray-700 focus:outline-none"
        >
          {isMenuOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
        </button>
      </header>

      {/* Kontainer Utama */}
      <div className="flex flex-1">
        {/* Dropdown Mobile */}
        <nav
          className={`${
            isMenuOpen ? "block" : "hidden"
          } md:hidden bg-gray-800 text-white absolute top-16 left-0 w-full z-10`}
        >
          <ul className="space-y-2 p-4">
            {navItems.map((item) => (
              <NavItem
                key={item.to}
                {...item}
                isSidebarOpen={isSidebarOpen}
                isMenuOpen={isMenuOpen}
                onClick={() => setIsMenuOpen(false)}
              />
            ))}
            <li>
              <BackupMultipleTablesButton isSidebarOpen={isSidebarOpen} isMenuOpen={isMenuOpen} />
            </li>
          </ul>
        </nav>

        {/* Sidebar Desktop */}
        <aside
          className={`hidden md:flex ${
            isSidebarOpen ? "md:w-64" : "md:w-16"
          } bg-gray-800 text-white flex-col min-h-screen transition-all duration-300 ease-in-out`}
        >
          <div className="p-4 flex justify-between items-center">
            {isSidebarOpen && (
              <h1 className="text-xl font-bold">KSP Makmur Adil Sejahtera</h1>
            )}
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-md hover:bg-gray-700 focus:outline-none"
            >
              {isSidebarOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <div className="group relative">
                  <span className="absolute -translate-y-4 left-8 text-black opacity-0 group-hover:opacity-100 bg-white text-sm px-2 py-1 rounded">
                    Menu
                  </span>
                  <Bars3Icon className="w-6 h-6" />
                </div>
              )}
            </button>
          </div>
          <nav className="flex-1">
            <ul className="space-y-2 p-2">
              {navItems.map((item) => (
                <NavItem
                  key={item.to}
                  {...item}
                  isSidebarOpen={isSidebarOpen}
                  isMenuOpen={isMenuOpen}
                />
              ))}
              <li>
                <BackupMultipleTablesButton
                  isSidebarOpen={isSidebarOpen}
                  isMenuOpen={isMenuOpen}
                />
              </li>
            </ul>
          </nav>
        </aside>

        {/* Konten Utama */}
        <main className="flex-1 overflow-y-auto p-6 bg-purple-200">
          <Outlet />
        </main>
      </div>
    </div>
  );
};