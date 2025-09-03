// components/NewButton.tsx
"use client";

import { RiAddLine, RiFileUploadLine, RiFolderAddLine } from "@remixicon/react";
import { useEffect, useRef, useState } from "react";

const NewButton = () => {
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

  return (
    <div className="relative">
      {/* Tombol "New" utama */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="flex items-center gap-1.5 bg-primary text-primary-foreground font-semibold py-1.5 px-3.5 rounded-lg hover:bg-primary/90 shadow-sm text-sm"
      >
        <RiAddLine size={16} />
        <span>New</span>
      </button>

      {/* Dropdown Menu */}
      <div
        ref={menuRef}
        className={`
          absolute right-0 mt-2 w-64 bg-card p-2 rounded-xl shadow-lg z-10
          transform transition-all duration-200 ease-in-out
          ${
            isMenuOpen
              ? "scale-100 opacity-100 visible"
              : "scale-95 opacity-0 invisible"
          }
        `}
      >
        <div className="space-y-1">
          <div className="flex items-center gap-2 p-2 rounded-lg cursor-pointer hover:bg-muted transition-colors">
            <RiFolderAddLine size={20} className="text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">
              New Folder
            </span>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-lg cursor-pointer hover:bg-muted transition-colors">
            <RiFileUploadLine size={20} className="text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">
              File Upload
            </span>
          </div>
          {/* <div className="flex items-center gap-2 p-2 rounded-lg cursor-pointer hover:bg-muted transition-colors">
            <RiFolderUploadLine size={20} className="text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">
              Folder Upload
            </span>
          </div> */}
        </div>
        {/* <div className="border-t border-border mt-2 pt-2">
          <div className="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-muted transition-colors">
            <div className="flex-1">
              <p className="text-sm font-semibold text-muted-foreground">
                Generate images
              </p>
              <p className="text-xs text-muted-foreground">
                Create image using text prompts
              </p>
            </div>
            <img src="/image_cb03df.png" alt="AI Icon" className="w-10 h-10" />
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default NewButton;
