"use client";

import { useToast } from "@/hooks/provider/ToastProvider";
import { useUser } from "@/hooks/provider/UserProvider";
import { useFetch } from "@/hooks/useFetch";
import { RiLogoutBoxRLine, RiUserLine } from "@remixicon/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ThemeToggle from "../ThemeToggle";

const TopBar = () => {
  const router = useRouter();
  const { removeLogin } = useUser();

  const { call, loading, error, errorCode } = useFetch();
  const { toast } = useToast();
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Set mounted → avoid hydration mismatch
  useEffect(() => setMounted(true), []);

  // Close menu when click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    const res = await call({
      url: "/api/logout",
      method: "POST",
    });

    if (res) {
      toast(res.message || "Logout successful", "success");

      removeLogin(); // hapus state + cookie + localStorage
      router.push("/login");
    } else {
      toast("Invalid email or password", "error");
    }
  };

  if (!mounted) {
    // Placeholder saat hydration mismatch
    return (
      <header className="flex items-center justify-between gap-4 p-4 h-[65px] bg-card">
        <div className="flex items-center gap-3">
          <div className="w-full md:w-80 h-9 rounded-lg bg-muted"></div>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-6 h-6 bg-muted rounded"></div>
          <div className="w-8 h-8 bg-muted rounded-full"></div>
        </div>
      </header>
    );
  }

  return (
    <header className="flex items-center justify-between gap-4 p-4 h-[65px] bg-card text-card-foreground">
      <div className="flex items-center gap-3">{/* Optional search bar */}</div>

      <div className="flex items-center gap-4">
        <ThemeToggle />

        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-2 p-1 rounded-lg transition-colors cursor-pointer"
            aria-label="User menu"
          >
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <Image
                src="https://i.pravatar.cc/150?u=bony"
                alt="Profile"
                width={32}
                height={32}
                className="object-cover"
              />
            </div>
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-card rounded-md shadow-xl py-1.5 z-20 origin-top-right">
              <MenuItem
                label="My Profile"
                icon={<RiUserLine size={16} />}
                onClick={() => setMenuOpen(false)}
              />
              <div className="my-1"></div>
              <MenuItem
                label="Logout"
                icon={<RiLogoutBoxRLine size={16} />}
                destructive
                onClick={handleLogout}
              />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

// Reusable menu item
interface MenuItemProps {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  destructive?: boolean;
}

const MenuItem = ({
  label,
  icon,
  onClick,
  destructive = false,
}: MenuItemProps) => (
  <a
    href="#"
    onClick={(e) => {
      e.preventDefault();
      onClick();
    }}
    className={`flex items-center gap-3 px-3.5 py-2 text-sm ${
      destructive
        ? "text-destructive hover:bg-destructive/10"
        : "text-card-foreground hover:bg-muted"
    } rounded transition-colors`}
  >
    {icon}
    <span>{label}</span>
  </a>
);

export default TopBar;
