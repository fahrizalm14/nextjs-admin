// components/NewItemModal.tsx
"use client";

import {
    RiCloseLine,
    RiFolderAddLine,
    RiUploadCloud2Line,
} from "@remixicon/react";
import Link from "next/link";
import { useEffect } from "react";

interface NewItemModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NewItemModal = ({ isOpen, onClose }: NewItemModalProps) => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-foreground/5 backdrop-blur-sm animate-[fadeIn_0.3s_forwards]"
        aria-hidden="true"
      ></div>
      <div className="relative bg-card rounded-xl shadow-xl w-full max-w-md p-4 transition-all duration-300 scale-100 animate-[scaleIn_0.3s_forwards]">
        <div className="flex items-start justify-between">
          <h2 className="text-base font-bold text-foreground">Create New</h2>
          <button
            type="button"
            className="text-muted-foreground hover:text-foreground"
            onClick={onClose}
          >
            <RiCloseLine size={24} />
          </button>
        </div>
        <div className="mt-4 space-y-1.5">
          <Link
            href="#"
            className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-muted"
            onClick={onClose}
          >
            <div className="bg-blue-100 text-blue-600 p-1.5 rounded-lg">
              <RiFolderAddLine size={24} />
            </div>
            <p className="font-semibold text-foreground text-sm">New Folder</p>
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-muted"
            onClick={onClose}
          >
            <div className="bg-green-100 text-green-600 p-1.5 rounded-lg">
              <RiUploadCloud2Line size={24} />
            </div>
            <p className="font-semibold text-foreground text-sm">Upload File</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewItemModal;
