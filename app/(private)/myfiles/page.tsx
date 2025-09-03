"use client";

import FileTable from "@/components/FileTable";
import NewButton from "@/components/NewButton";
import NewItemModal from "@/components/NewItemModal";
import { useState } from "react";

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <main className="flex-1 p-4 overflow-y-auto bg-background text-foreground">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">My Files</h2>
          <NewButton />
        </div>
        <FileTable />
      </main>
      <NewItemModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default Page;
