import React, { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import BackupMultipleTablesButton from "./BackupMultipleTablesButton";
import { useAuth } from "../../utils/auth";
import { useNavigate } from "react-router-dom";

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { lock } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleLogout = () => {
    lock();
    navigate("/");
  };

  const navItems = [
    {
      to: "/app/home",
      label: "Daftar Nasabah",
      icon: (
        <svg
          className="w-6 h-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2" // Diperbaiki dari stroke-width
          strokeLinecap="round" // Diperbaiki dari stroke-linecap
          strokeLinejoin="round" // Diperbaiki dari stroke-linejoin
        >
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <line x1="9" y1="3" x2="9" y2="21" />
          <line x1="15" y1="3" x2="15" y2="21" />
          <line x1="3" y1="9" x2="21" y2="9" />
          <line x1="3" y1="15" x2="21" y2="15" />
          <circle cx="6" cy="18" r="2" />
          <path d="M4 20a2 2 0 0 1 4 0v1H4v-1z" />
        </svg>
      ),
    },
    {
      to: "/app/tambah-nasabah",
      label: "Tambah Nasabah",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      to: "/app/produk-pinjaman",
      label: "Kelola Produk Pinjaman",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      to: "/app/restore",
      label: "Restore Data",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            <li>
              <button
                onClick={handleLogout}
                className="flex items-center p-2 rounded-md hover:bg-gray-700 w-full text-left"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                {(isSidebarOpen || isMenuOpen) && <span className="ml-3">Logout</span>}
              </button>
            </li>
          </ul>
        </nav>

        {/* Sidebar Desktop */}
        <aside
          className={`hidden md:flex ${
            isSidebarOpen ? "md:w-64" : "md:w-16"
          } bg-gray-800 text-white flex-col min-h-screen transition-all duration-300`}
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
              <li>
                <button
                  onClick={handleLogout}
                  className="flex items-center p-2 rounded-md hover:bg-gray-700 w-full text-left"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  {isSidebarOpen && <span className="ml-3">Logout</span>}
                </button>
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