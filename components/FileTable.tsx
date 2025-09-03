// components/FileTable.tsx
"use client";

import {
  RiCheckboxBlankLine,
  RiCheckboxLine,
  RiDeleteBinLine,
  RiDownloadLine,
  RiFileCopyLine,
  RiFilePdf2Line,
  RiFileTextLine,
  RiFolder2Line,
  RiFolderTransferLine,
  RiLayoutGridFill,
  RiListRadio,
  RiSearch2Line,
  RiShareForwardLine,
  RiSortAsc,
  RiSortDesc,
} from "@remixicon/react";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import FileSelectedActionButton from "./FileSelectedActionButton";

// Tipe untuk data file
interface FileItem {
  name: string;
  owner: string;
  modified: string;
  size: string;
  type: "Folder" | "PDF" | "File";
  thumbnail: string | null;
}

const fileData: FileItem[] = [
  {
    name: "Q3 Finances",
    owner: "You",
    modified: "2025-08-06",
    size: "--",
    type: "Folder",
    thumbnail: null,
  },
  {
    name: "Annual-Report-2024.pdf",
    owner: "Sarah",
    modified: "2025-08-05",
    size: "4.2 MB",
    type: "PDF",
    thumbnail: "/images/annual-report.png",
  },
  {
    name: "Project_A_Proposal.pdf",
    owner: "You",
    modified: "2025-08-08",
    size: "1.1 MB",
    type: "PDF",
    thumbnail: "/images/proposal.png",
  },
  {
    name: "Presentation-Slides",
    owner: "John",
    modified: "2025-08-01",
    size: "--",
    type: "Folder",
    thumbnail: null,
  },
  {
    name: "Family-Photos-2025.zip",
    owner: "You",
    modified: "2025-08-10",
    size: "250.5 MB",
    type: "File",
    thumbnail: "/images/photos.jpg",
  },
];

const parseSize = (sizeStr: string): number => {
  if (sizeStr === "--") return 0;
  const [value, unit] = sizeStr.split(" ");
  const numericValue = parseFloat(value);
  if (unit === "KB") return numericValue;
  if (unit === "MB") return numericValue * 1024;
  if (unit === "GB") return numericValue * 1024 * 1024;
  return 0;
};

const getFileIcon = (type: FileItem["type"]) => {
  switch (type) {
    case "Folder":
      return <RiFolder2Line />;
    case "PDF":
      return <RiFilePdf2Line />;
    default:
      return <RiFileTextLine />;
  }
};

interface ContextMenuState {
  x: number;
  y: number;
  fileIndex: number;
}

export default function FileTable() {
  const [contextMenu, setContextMenu] = useState<ContextMenuState | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<Set<number>>(new Set());
  const [activeFileIndex, setActiveFileIndex] = useState<number | null>(null); // New state for 'active' file
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("modified");
  const [sortDirection, setSortDirection] = useState("desc");
  const [viewMode, setViewMode] = useState("list");

  const longPressTimer = useRef<NodeJS.Timeout | null>(null);
  const isLongPress = useRef<boolean>(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      // Check if the click is outside the context menu
      if (
        contextMenu &&
        (event.target as HTMLElement).closest(".action-menu") === null
      ) {
        setContextMenu(null);
      }

      // Clear active state unless the click was on a checkbox
      if (!(event.target as HTMLElement).closest(".checkbox-input")) {
        setActiveFileIndex(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [contextMenu]);

  const filteredAndSortedData = useMemo(() => {
    const filtered = fileData.filter((file) =>
      file.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sorted = filtered.sort((a, b) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let aValue: any, bValue: any;

      if (sortBy === "name" || sortBy === "owner") {
        aValue = a[sortBy].toLowerCase();
        bValue = b[sortBy].toLowerCase();
      } else if (sortBy === "modified") {
        aValue = new Date(a.modified);
        bValue = new Date(b.modified);
      } else if (sortBy === "size") {
        aValue = parseSize(a.size);
        bValue = parseSize(b.size);
      }

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [searchTerm, sortBy, sortDirection]);

  const handleContextMenu = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      fileIndex: index,
    });
  };

  const handleTouchStart = (e: React.TouchEvent, index: number) => {
    isLongPress.current = false;
    longPressTimer.current = setTimeout(() => {
      isLongPress.current = true;
      setContextMenu({
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
        fileIndex: index,
      });
      // Optionally, set the item as active on long press as well
      setActiveFileIndex(index);
    }, 500);
  };

  const handleTouchEnd = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }
  };

  const handleCheckboxChange = (index: number) => {
    setSelectedFiles((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(index)) {
        newSelected.delete(index);
      } else {
        newSelected.add(index);
      }
      return newSelected;
    });
    setContextMenu(null);
  };

  const handleFileClick = (index: number) => {
    // Only update the active state if it's not a long press
    if (!isLongPress.current) {
      setActiveFileIndex(index);
      setContextMenu(null);
    }
  };

  const handleSelectAll = () => {
    if (selectedFiles.size === filteredAndSortedData.length) {
      setSelectedFiles(new Set());
    } else {
      const allIndexes = new Set(
        filteredAndSortedData.map((_, index) => index)
      );
      setSelectedFiles(allIndexes);
    }
  };

  const isSelected = (index: number) => selectedFiles.has(index);

  return (
    <section>
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-2">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search files..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm rounded-lg shadow-sm bg-card text-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
          />
          <RiSearch2Line
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            size={16}
          />
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="py-1 px-3 pr-8 text-sm rounded-lg shadow-sm bg-card text-foreground appearance-none focus:outline-none cursor-pointer"
            >
              <option value="modified">Modified</option>
              <option value="name">Name</option>
              <option value="size">Size</option>
            </select>
            <div className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
              <RiSortAsc size={16} />
            </div>
          </div>
          <button
            onClick={() =>
              setSortDirection(sortDirection === "asc" ? "desc" : "asc")
            }
            className="p-1 rounded-lg shadow-sm bg-card text-foreground hover:bg-muted cursor-pointer"
          >
            {sortDirection === "asc" ? (
              <RiSortAsc size={16} />
            ) : (
              <RiSortDesc size={16} />
            )}
          </button>
          <div className="bg-card rounded-lg p-0.5 shadow-sm flex">
            <button
              onClick={() => setViewMode("list")}
              className={`p-1 rounded-md cursor-pointer ${
                viewMode === "list" ? "bg-muted" : "text-muted-foreground"
              }`}
            >
              <RiListRadio size={16} />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1 rounded-md cursor-pointer ${
                viewMode === "grid" ? "bg-muted" : "text-muted-foreground"
              }`}
            >
              <RiLayoutGridFill size={16} />
            </button>
          </div>
        </div>
      </div>
      <div className="bg-card rounded-xl py-5 shadow-sm">
        {selectedFiles.size > 0 && (
          <div className="flex justify-between items-center px-4 mb-4">
            <span className="text-sm font-medium text-foreground">
              {selectedFiles.size} selected
            </span>
            <div className="relative">
              <FileSelectedActionButton
                onAction={() => {}}
                selectedFilesCount={0}
              />
            </div>
          </div>
        )}

        {viewMode === "list" ? (
          <div className="w-full">
            <div className="hidden md:grid grid-cols-13 gap-4 px-4 py-2 text-xs font-semibold text-muted-foreground bg-muted/50">
              <div className="col-span-1 flex items-center">
                <button
                  onClick={handleSelectAll}
                  className="p-1 cursor-pointer"
                >
                  {selectedFiles.size === filteredAndSortedData.length &&
                  filteredAndSortedData.length > 0 ? (
                    <RiCheckboxLine size={16} />
                  ) : (
                    <RiCheckboxBlankLine size={16} />
                  )}
                </button>
              </div>
              <div className="col-span-4">Name</div>
              <div className="col-span-2">Owner</div>
              <div className="col-span-2">Modified</div>
              <div className="col-span-2">Size</div>
              <div className="col-span-2"></div>
            </div>
            <div className="file-list">
              {filteredAndSortedData.map((file, index) => (
                <div
                  key={index}
                  onContextMenu={(e) => handleContextMenu(e, index)}
                  onTouchStart={(e) => handleTouchStart(e, index)}
                  onTouchEnd={handleTouchEnd}
                  onClick={() => handleFileClick(index)}
                  className={`flex md:grid md:grid-cols-13 gap-4 items-center py-3 cursor-pointer text-sm
                    ${
                      isSelected(index)
                        ? "bg-primary/5 pl-3"
                        : "px-4 hover:bg-muted/50"
                    }
                    ${
                      activeFileIndex === index
                        ? "bg-muted/50 border-l-4 border-primary"
                        : ""
                    }
                  `}
                >
                  <div className="col-span-1 flex items-center">
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="checkbox-input"
                    >
                      <input
                        type="checkbox"
                        checked={isSelected(index)}
                        onChange={() => handleCheckboxChange(index)}
                        className="form-checkbox text-primary rounded-sm cursor-pointer"
                      />
                    </div>
                  </div>
                  <div className="flex-grow md:col-span-4 flex items-center gap-2.5">
                    <span
                      className={`text-lg ${
                        file.type === "Folder" ? "text-sky-500" : "text-red-500"
                      }`}
                    >
                      {getFileIcon(file.type)}
                    </span>
                    <span className="file-name text-foreground truncate font-medium">
                      {file.name}
                    </span>
                  </div>
                  <div className="hidden md:block md:col-span-2 text-xs text-muted-foreground">
                    {file.owner}
                  </div>
                  <div className="hidden md:block md:col-span-2 text-xs text-muted-foreground">
                    {file.modified}
                  </div>
                  <div className="hidden md:block md:col-span-2 text-xs text-muted-foreground">
                    {file.size}
                  </div>
                  <div className="flex-shrink-0 md:col-span-2 text-right relative"></div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
            {filteredAndSortedData.map((file, index) => (
              <div
                key={index}
                onContextMenu={(e) => handleContextMenu(e, index)}
                onTouchStart={(e) => handleTouchStart(e, index)}
                onTouchEnd={handleTouchEnd}
                onClick={() => handleFileClick(index)}
                className={`group relative rounded-xl shadow-sm overflow-hidden flex flex-col cursor-pointer border transition-transform duration-200 ease-in-out hover:scale-105
                  ${
                    isSelected(index)
                      ? "ring-2 ring-primary bg-primary/5 border-primary"
                      : "bg-card hover:bg-muted/50 border-primary/10"
                  }
                  ${activeFileIndex === index ? "ring-2 ring-blue-500" : ""}
                `}
              >
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute top-2 right-2 z-10 p-1 bg-card rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <button
                    onClick={() => handleCheckboxChange(index)}
                    className="cursor-pointer checkbox-input"
                  >
                    {isSelected(index) ? (
                      <RiCheckboxLine size={16} className="text-primary" />
                    ) : (
                      <RiCheckboxBlankLine
                        size={16}
                        className="text-muted-foreground"
                      />
                    )}
                  </button>
                </div>
                {file.thumbnail ? (
                  <div className="w-full h-36 md:h-48 overflow-hidden">
                    <Image
                      src={file.thumbnail}
                      alt={file.name}
                      width={160}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-full h-36 md:h-48 flex items-center justify-center">
                    <span className="text-6xl text-sky-500/50">
                      {getFileIcon(file.type)}
                    </span>
                  </div>
                )}
                <div className="p-4 flex-1 flex flex-col">
                  <div className="w-full flex justify-between items-center mb-2">
                    <span className="text-2xl text-foreground">
                      {getFileIcon(file.type)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-foreground truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{file.size}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {contextMenu && (
        <div
          style={{ top: contextMenu.y, left: contextMenu.x }}
          className="action-menu fixed w-36 bg-card rounded-md shadow-lg py-1 z-50 text-left"
          onClick={(e) => e.stopPropagation()}
        >
          <a
            href="#"
            className="flex items-center gap-2 px-3 py-1.5 text-xs text-foreground hover:bg-muted"
            onClick={(e) => {
              e.preventDefault();
              console.log(
                "Download",
                filteredAndSortedData[contextMenu.fileIndex].name
              );
              setContextMenu(null);
            }}
          >
            <RiDownloadLine size={16} /> Download
          </a>
          <a
            href="#"
            className="flex items-center gap-2 px-3 py-1.5 text-xs text-foreground hover:bg-muted"
            onClick={(e) => {
              e.preventDefault();
              console.log(
                "Copy",
                filteredAndSortedData[contextMenu.fileIndex].name
              );
              setContextMenu(null);
            }}
          >
            <RiFileCopyLine size={16} /> Copy
          </a>
          <a
            href="#"
            className="flex items-center gap-2 px-3 py-1.5 text-xs text-foreground hover:bg-muted"
            onClick={(e) => {
              e.preventDefault();
              console.log(
                "Move",
                filteredAndSortedData[contextMenu.fileIndex].name
              );
              setContextMenu(null);
            }}
          >
            <RiFolderTransferLine size={16} /> Move
          </a>
          <a
            href="#"
            className="flex items-center gap-2 px-3 py-1.5 text-xs text-foreground hover:bg-muted"
            onClick={(e) => {
              e.preventDefault();
              console.log(
                "Share",
                filteredAndSortedData[contextMenu.fileIndex].name
              );
              setContextMenu(null);
            }}
          >
            <RiShareForwardLine size={16} /> Share
          </a>
          <div className="h-[1px] my-1 bg-muted"></div>
          <a
            href="#"
            className="flex items-center gap-2 px-3 py-1.5 text-xs text-destructive hover:bg-destructive/10"
            onClick={(e) => {
              e.preventDefault();
              console.log(
                "Delete",
                filteredAndSortedData[contextMenu.fileIndex].name
              );
              setContextMenu(null);
            }}
          >
            <RiDeleteBinLine size={16} /> Delete
          </a>
        </div>
      )}
    </section>
  );
}
