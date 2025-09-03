"use client";

import { RiCloseFill } from "@remixicon/react";
import { AnimatePresence, motion } from "framer-motion";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";

type ToastType = "success" | "error" | "warning" | "info";
type ToastPosition = "top-right" | "top-left" | "bottom-right" | "bottom-left";

interface Toast {
  id: number;
  message: string;
  type: ToastType;
  duration: number;
  position: ToastPosition;
}

interface ToastContextProps {
  toast: (
    message: string,
    type?: ToastType,
    position?: ToastPosition,
    duration?: number
  ) => void;
}

const ToastContext = createContext<ToastContextProps | null>(null);

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside ToastProvider");
  return ctx;
};

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = (
    message: string,
    type: ToastType = "info",
    position: ToastPosition = "top-right",
    duration = 4000
  ) => {
    const id = Date.now() + Math.floor(Math.random() * 1000); // unik
    setToasts((prev) => [...prev, { id, message, type, duration, position }]);
    setTimeout(() => removeToast(id), duration);
  };

  const colorMap: Record<ToastType, string> = {
    success: "green-500",
    error: "red-500",
    warning: "yellow-500",
    info: "blue-500",
  };

  const getPositionClass = (pos: ToastPosition) => {
    switch (pos) {
      case "top-left":
        return "top-4 left-4";
      case "top-right":
        return "top-4 right-4";
      case "bottom-left":
        return "bottom-4 left-4";
      case "bottom-right":
        return "bottom-4 right-4";
      default:
        return "top-4 right-4";
    }
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {(
        [
          "top-right",
          "top-left",
          "bottom-right",
          "bottom-left",
        ] as ToastPosition[]
      ).map((pos) => (
        <div
          key={pos}
          className={`fixed z-[9999] space-y-2 w-80 ${getPositionClass(
            pos
          )} pointer-events-auto`}
        >
          <AnimatePresence>
            {toasts
              .filter((t) => t.position === pos)
              .map((t) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ duration: 0.25 }}
                  className={`
                    px-4 py-3 rounded-lg shadow-lg flex items-center justify-between
                    border-l-4 text-${colorMap[t.type]} bg-white
                  `}
                  style={{ borderColor: `rgb(var(--tw-${colorMap[t.type]}))` }}
                >
                  <span className="flex-1 pr-3">{t.message}</span>
                  <button
                    onClick={() => removeToast(t.id)}
                    className="p-1 rounded hover:bg-black/10 transition"
                  >
                    <RiCloseFill size={16} />
                  </button>
                </motion.div>
              ))}
          </AnimatePresence>
        </div>
      ))}
    </ToastContext.Provider>
  );
};
