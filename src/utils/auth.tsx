import { createContext, useContext, useState, ReactNode } from "react";

// Definisikan tipe untuk konteks autentikasi
interface AuthContextType {
  isAuthenticated: boolean;
  unlock: (username: string, password: string) => boolean;
  lock: () => void;
}

// Buat konteks dengan tipe yang tepat
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Data statis dalam bentuk Base64
const OBFUSCATED_CREDENTIALS = [
  { username: "YWRtaW4=", password: "cGFzc3dvcmQxMjM=" }, // admin:password123
  { username: "dXNlcjE=", password: "c2VjcmV0NDU2" },     // user1:secret456
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const unlock = (username: string, password: string) => {
    // Dekode Base64 saat runtime untuk membandingkan
    const isValid = OBFUSCATED_CREDENTIALS.some((cred) => {
      const decodedUsername = atob(cred.username);
      const decodedPassword = atob(cred.password);
      return decodedUsername === username && decodedPassword === password;
    });

    if (isValid) setIsAuthenticated(true);
    return isValid;
  };

  const lock = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, unlock, lock }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};