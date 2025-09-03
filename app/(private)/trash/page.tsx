// app/trash/page.tsx
"use client";

import {
  RiDeleteBinLine,
  RiFilePdf2Line,
  RiFolderFill,
  RiMore2Fill,
} from "@remixicon/react";

// Data dummy untuk file yang ada di tempat sampah
const trashFileData = [
  {
    name: "Old-Project-Report.pdf",
    owner: "You",
    modified: "Jul 15, 2025",
    size: "1.2 MB",
    type: "PDF",
    icon: <RiFilePdf2Line />,
  },
  {
    name: "Vacation-Photos",
    owner: "You",
    modified: "Jul 10, 2025",
    size: "--",
    type: "Folder",
    icon: <RiFolderFill />,
  },
];

const Page = () => {
  // Hitung jumlah file dan total ukuran secara dinamis
  const fileCount = trashFileData.length;
  const totalSize = trashFileData.reduce((sum, file) => {
    if (file.size !== "--") {
      return sum + parseFloat(file.size.split(" ")[0]);
    }
    return sum;
  }, 0);

  return (
    <>
      <main className="flex-1 p-4 overflow-y-auto bg-background text-foreground">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Trash</h2>
          <button className="flex items-center gap-1.5 bg-destructive text-destructive-foreground font-semibold py-1.5 px-3.5 rounded-lg hover:bg-destructive/90 shadow-sm text-sm">
            <RiDeleteBinLine />
            <span>
              Kosongkan ({fileCount} file | {totalSize.toFixed(1)} GB)
            </span>
          </button>
        </div>

        {/* Konten tabel file */}
        <div className="bg-card rounded-xl border border-border">
          <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-2 text-xs font-semibold text-muted-foreground border-b border-border">
            <div className="col-span-5">Name</div>
            <div className="col-span-2">Owner</div>
            <div className="col-span-2">Modified</div>
            <div className="col-span-2">Size</div>
            <div className="col-span-1"></div>
          </div>

          {trashFileData.length > 0 ? (
            <div className="file-list">
              {trashFileData.map((file, index) => (
                <div
                  key={index}
                  className="interactive-item flex md:grid md:grid-cols-12 gap-4 items-center px-4 py-3 hover:bg-muted cursor-pointer text-sm"
                >
                  <div className="flex-grow md:col-span-5 flex items-center gap-2.5">
                    <span className="text-lg text-destructive">
                      {file.icon}
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
                  <div className="flex-shrink-0 md:col-span-1 text-right relative">
                    <button className="action-btn text-muted-foreground hover:text-foreground p-1 rounded-full hover:bg-muted">
                      <RiMore2Fill />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-muted-foreground">
              <p>Tempat sampah Anda kosong.</p>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Page;
