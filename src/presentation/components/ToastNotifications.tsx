import React, { useEffect, useState } from "react";

interface ToastProps {
  message: string;
  duration?: number;
  onClose: () => void;
}

const ToastNotifications: React.FC<ToastProps> = ({ message, duration = 3000, onClose }) => {
  const [visible, setVisible] = useState(true);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsClosing(true); // Mulai animasi fade-out
      setTimeout(() => {
        onClose();
      }, 300); // Sesuaikan dengan durasi animasi fade-out
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!visible) return null;

  return (
    <div className={`fixed bottom-4 right-4 ${isClosing ? "animate-fade-out" : "animate-fade-in"}`}>
      <div className="bg-gray-700 text-white px-4 py-3 rounded-lg shadow-md flex items-center space-x-3 max-w-md relative overflow-hidden border-l-3 border-green-500">
        {/* Gutter Line Hijau dengan Efek Zigzag */}
        <div
          className="absolute left-0 top-0 bottom-0 w-2 bg-green-500"
          style={{
            clipPath: "polygon(0 0, 100% 5%, 100% 10%, 0 15%, 0 20%, 100% 25%, 100% 30%, 0 35%, 0 40%, 100% 45%, 100% 50%, 0 55%, 0 60%, 100% 65%, 100% 70%, 0 75%, 0 80%, 100% 85%, 100% 90%, 0 95%, 0 100%)",
          }}
        ></div>

        {/* Pesan Toast */}
        <p className="text-sm font-medium pl-4">{message}</p>

        {/* Tombol Tutup (Opsional) */}
        <button
          onClick={() => {
            setIsClosing(true); // Mulai animasi fade-out
            setTimeout(() => {
              setVisible(false); // Sembunyikan toast setelah animasi selesai
              onClose();
            }, 300); // Sesuaikan dengan durasi animasi fade-out
          }}
          className="text-blue-500 hover:text-blue-400 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ToastNotifications;