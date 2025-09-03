// /hooks/useUser.tsx
"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export interface IUserInfo {
  id: string;
  email: string;
  name: string | null;
  createdAt: Date;
  updatedAt: Date;
  isVerified: boolean;
  role: string;
}

interface IUserContext {
  user: IUserInfo | null;
  saveLogin: (user: IUserInfo, token?: string) => void;
  removeLogin: () => void;
  getUserData: () => IUserInfo | null;
}

const UserContext = createContext<IUserContext | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUserInfo | null>(null);

  useEffect(() => {
    // Load user dari localStorage saat mount
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error("Error parsing stored user:", err);
        localStorage.removeItem("user");
      }
    }
  }, []);

  const saveLogin = (userData: IUserInfo, refreshToken?: string) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    if (refreshToken) {
      localStorage.setItem("token", refreshToken);
    }
  };

  const removeLogin = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const getUserData = () => {
    return user;
  };

  return (
    <UserContext.Provider value={{ user, saveLogin, removeLogin, getUserData }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook untuk akses context
export const useUser = (): IUserContext => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
