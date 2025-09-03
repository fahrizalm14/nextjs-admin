// app/page.tsx
"use client";

import FileCard from "@/components/FileCard";
import ThemeToggle from "@/components/ThemeToggle";
import {
  RiFileExcel2Line,
  RiFilePpt2Line,
  RiFileTextLine,
  RiFolderOpenLine,
  RiFolderZipLine,
  RiImageLine,
  RiMovieLine,
  RiSearchLine,
  RiUploadCloudLine,
} from "@remixicon/react";
import { useEffect, useState } from "react";

// Data contoh untuk file
const sampleFiles = [
  {
    id: 1,
    name: "project-plan.pdf",
    type: "PDF Document",
    size: "2.4 MB",
    lastModified: "2 days ago",
    icon: <RiFileTextLine size={24} />,
  },
  {
    id: 2,
    name: "vacation-photo.jpg",
    type: "JPEG Image",
    size: "4.2 MB",
    lastModified: "1 week ago",
    icon: <RiImageLine size={24} />,
  },
  {
    id: 3,
    name: "meeting-recording.mp4",
    type: "MP4 Video",
    size: "15.7 MB",
    lastModified: "3 days ago",
    icon: <RiMovieLine size={24} />,
  },
  {
    id: 4,
    name: "budget-spreadsheet.xlsx",
    type: "Excel Spreadsheet",
    size: "1.1 MB",
    lastModified: "Yesterday",
    icon: <RiFileExcel2Line size={24} />,
  },
  {
    id: 5,
    name: "presentation.pptx",
    type: "PowerPoint Presentation",
    size: "8.3 MB",
    lastModified: "5 days ago",
    icon: <RiFilePpt2Line size={24} />,
  },
  {
    id: 6,
    name: "code-library.zip",
    type: "ZIP Archive",
    size: "12.5 MB",
    lastModified: "2 weeks ago",
    icon: <RiFolderZipLine size={24} />,
  },
];

export default function Home() {
  const [files, setFiles] = useState(sampleFiles);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredFiles, setFilteredFiles] = useState(sampleFiles);

  useEffect(() => {
    const results = files.filter(
      (file) =>
        file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        file.type.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredFiles(results);
  }, [searchTerm, files]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <RiFolderOpenLine size={24} className="text-primary" />
            <h1 className="text-xl font-bold">File Manager</h1>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl text-foreground font-bold mb-2">My Files</h2>
          <p className="text-muted-foreground">
            Manage your files easily with our app
          </p>
        </div>

        {/* Search and Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <RiSearchLine
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
              size={20}
            />
            <input
              type="text"
              placeholder="Search files..."
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
            <RiUploadCloudLine size={18} />
            <span>Upload</span>
          </button>
        </div>

        {/* File Grid */}
        {filteredFiles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredFiles.map((file) => (
              <FileCard
                key={file.id}
                name={file.name}
                type={file.type}
                size={file.size}
                lastModified={file.lastModified}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-foreground">
            <RiFolderOpenLine
              size={48}
              className="mx-auto text-muted-foreground mb-4"
            />
            <h3 className="text-lg font-medium mb-2">No files found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or upload new files
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-8">
        <div className="container mx-auto px-4 py-4 text-center text-muted-foreground">
          <p>File Manager App &copy; {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
}
