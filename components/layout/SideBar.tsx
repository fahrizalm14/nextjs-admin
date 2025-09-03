// components/layout/Sidebar.tsx
"use client";

import { Role, ROLES_CONFIG } from "@/types/auth";
import { MenuItem } from "@/types/layout";
import {
  RiArrowRightSLine,
  RiHomeLine,
  RiMenuLine,
  RiUploadCloud2Line,
} from "@remixicon/react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Import usePathname
import { useEffect, useState } from "react";

function SidebarItem({
  item,
  collapsed,
}: {
  item: MenuItem;
  collapsed: boolean;
}) {
  const pathname = usePathname(); // Dapatkan pathname saat ini
  const [open, setOpen] = useState(false);

  // Periksa apakah item aktif
  const isActive = item.href === pathname;

  // Jika item memiliki children, render sebagai dropdown
  if (item.children) {
    // Periksa apakah ada child yang aktif
    const hasActiveChild = item.children.some(
      (child) => child.href === pathname
    );
    return (
      <div>
        <button
          onClick={() => setOpen(!open)}
          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md font-semibold transition-colors
          ${
            hasActiveChild || open
              ? "bg-slate-700 text-white"
              : "hover:bg-slate-700 text-slate-300"
          }
          `}
        >
          <div className="flex items-center gap-3">
            {item.icon}
            {!collapsed && (
              <span className="text-sm sidebar-text">{item.label}</span>
            )}
          </div>
          {!collapsed && (
            <RiArrowRightSLine
              className={`transition-transform ${open ? "rotate-90" : ""}`}
            />
          )}
        </button>
        {open && !collapsed && (
          <div className="pl-5">
            {item.children.map((child) => (
              <Link
                key={child.label}
                href={child.href!}
                className={`block px-3 py-2 rounded-md text-sm transition-colors
                ${
                  child.href === pathname
                    ? "bg-slate-700 text-white"
                    : "text-slate-400 hover:bg-slate-700 hover:text-white"
                }`}
              >
                {child.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Jika item adalah link tunggal
  return (
    <Link
      href={item.href!}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors
      ${
        isActive
          ? "bg-slate-700 text-white"
          : "hover:bg-slate-700 text-slate-300"
      }`}
    >
      {item.icon}
      {!collapsed && <span className="text-sm">{item.label}</span>}
    </Link>
  );
}

export default function SideBar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [role, setRole] = useState<Role>("admin");

  const menus = ROLES_CONFIG[role].menus;

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <div>
      {/* Tombol hamburger untuk mobile */}
      <button
        className="absolute top-4 left-4 md:hidden z-50 p-2 rounded-md bg-slate-800 text-white"
        onClick={() => setMobileOpen(true)}
      >
        <RiMenuLine className="text-xl" />
      </button>

      {/* Overlay (mobile) */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-full z-50 md:z-auto bg-slate-800 text-slate-300 flex flex-col border-r border-slate-700 transition-all duration-300
          ${collapsed ? "w-20" : "w-64"} 
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0`}
      >
        {/* Header */}
        <div className="flex items-center gap-3 p-4 shrink-0 h-[65px] border-b border-slate-700">
          <div className="p-1.5 bg-blue-500 rounded-lg">
            <RiUploadCloud2Line className="text-xl text-white" />
          </div>
          {!collapsed && (
            <h1 className="text-lg font-bold text-white">StasiunFile</h1>
          )}
        </div>

        {/* Menu */}
        <nav className="px-3 py-4 space-y-1.5 flex-grow overflow-y-auto">
          {menus.map((item) => (
            <SidebarItem key={item.label} item={item} collapsed={collapsed} />
          ))}
        </nav>

        {/* Dropzone */}
        <div className="p-3 border-t border-slate-700">
          <div className="border-2 border-dashed border-slate-600 rounded-lg p-4 text-center text-slate-400">
            <RiUploadCloud2Line className="text-2xl mx-auto" />
            {!collapsed && (
              <p className="text-xs font-medium mt-1">Drag & Drop to Upload</p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-700">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-slate-700 rounded-md text-slate-300"
          >
            <RiHomeLine />
            {!collapsed && (
              <span className="font-medium text-sm">
                {collapsed ? "Expand" : "Collapse"}
              </span>
            )}
          </button>
        </div>
      </aside>
    </div>
  );
}
