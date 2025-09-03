// components/FileSelectedActionButton.tsx
"use client";

import {
  RiDeleteBinLine,
  RiDownloadLine,
  RiFileCopyLine,
  RiFolderTransferLine,
  RiMore2Fill,
  RiPencilLine,
  RiShareForwardLine,
} from "@remixicon/react";
import { useEffect, useRef, useState } from "react";

interface FileSelectedActionButtonProps {
  selectedFilesCount: number;
  onAction: (
    action: "download" | "rename" | "copy" | "move" | "share" | "delete"
  ) => void;
}

const FileSelectedActionButton: React.FC<FileSelectedActionButtonProps> = ({
  selectedFilesCount,
  onAction,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fungsi untuk menangani klik di luar menu
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    // Tambahkan event listener saat menu terbuka
    document.addEventListener("mousedown", handleClickOutside);

    // Hapus event listener saat komponen di-unmount atau menu tertutup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  const handleActionClick = (
    action: "download" | "rename" | "copy" | "move" | "share" | "delete"
  ) => {
    onAction(action);
    setIsMenuOpen(false);
  };

  return (
    <div className="relative">
      {/* Tombol "Actions" utama */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="flex items-center gap-1.5 bg-primary text-primary-foreground font-semibold py-1.5 px-3.5 rounded-lg hover:bg-primary/90 shadow-sm text-sm"
      >
        <span>Actions</span>
        {selectedFilesCount > 0 && (
          <span className="ml-1 text-xs font-medium">
            ({selectedFilesCount})
          </span>
        )}
        <RiMore2Fill size={16} />
      </button>

      {/* Dropdown Menu */}
      <div
        ref={menuRef}
        className={`
          absolute right-0 mt-2 w-48 bg-card p-2 rounded-xl shadow-lg z-10
          transform transition-all duration-200 ease-in-out
          ${
            isMenuOpen
              ? "scale-100 opacity-100 visible"
              : "scale-95 opacity-0 invisible"
          }
        `}
      >
        <div className="space-y-1">
          <div
            onClick={() => handleActionClick("download")}
            className="flex items-center gap-2 p-2 rounded-lg cursor-pointer hover:bg-muted transition-colors"
          >
            <RiDownloadLine size={16} className="text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">
              Download
            </span>
          </div>
          <div
            onClick={() => handleActionClick("rename")}
            className="flex items-center gap-2 p-2 rounded-lg cursor-pointer hover:bg-muted transition-colors"
          >
            <RiPencilLine size={16} className="text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">
              Rename
            </span>
          </div>
          <div
            onClick={() => handleActionClick("copy")}
            className="flex items-center gap-2 p-2 rounded-lg cursor-pointer hover:bg-muted transition-colors"
          >
            <RiFileCopyLine size={16} className="text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">
              Copy
            </span>
          </div>
          <div
            onClick={() => handleActionClick("move")}
            className="flex items-center gap-2 p-2 rounded-lg cursor-pointer hover:bg-muted transition-colors"
          >
            <RiFolderTransferLine size={16} className="text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">
              Move
            </span>
          </div>
          <div
            onClick={() => handleActionClick("share")}
            className="flex items-center gap-2 p-2 rounded-lg cursor-pointer hover:bg-muted transition-colors"
          >
            <RiShareForwardLine size={16} className="text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">
              Share
            </span>
          </div>
        </div>
        <div className="border-t border-border mt-2 pt-2">
          <div
            onClick={() => handleActionClick("delete")}
            className="flex items-center gap-2 p-2 rounded-lg cursor-pointer hover:bg-destructive/10 transition-colors"
          >
            <RiDeleteBinLine size={16} className="text-destructive" />
            <span className="text-sm font-medium text-destructive">Delete</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileSelectedActionButton;
