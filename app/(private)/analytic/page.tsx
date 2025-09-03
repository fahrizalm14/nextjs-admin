"use client";

import ActivityLog from "@/components/ActivityLog";
import DashboardCard from "@/components/DashboardCard";
import NewItemModal from "@/components/NewItemModal";
import RecentFiles from "@/components/RecentFiles";
import StorageUsage from "@/components/StorageUsage";
import { useToast } from "@/hooks/provider/ToastProvider";
import { useFetch } from "@/hooks/useFetch";
import {
  RiDatabase2Line,
  RiFileTextLine,
  RiFolder2Line,
  RiShareLine,
} from "@remixicon/react";
import { useEffect, useRef, useState } from "react";

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { call, error, errorCode, loading, data } = useFetch();
  const { toast } = useToast();
  const didFetch = useRef(false);

  useEffect(() => {
    if (didFetch.current) return;
    didFetch.current = true;

    const fetch = async () => {
      const res = await call({ url: "/api/analytic", method: "GET" }, true);
      if (res) toast(res.message, "success");
    };
    fetch();
  }, [call, toast]);

  // lalu UI-nya bisa pantau error/loading/data
  useEffect(() => {
    if (error) {
      toast(`Error ${errorCode}: ${error}`, "error");
    }
  }, [error]);

  return (
    <>
      <main className="flex-1 p-4 overflow-y-auto bg-background text-foreground">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Dashboard</h2>
          {/* <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1.5 bg-primary text-white font-semibold py-1.5 px-3.5 rounded-lg hover:bg-primary/50 shadow-sm text-sm"
          >
            <i className="ri-add-line"></i>
            <span>New</span>
          </button> */}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <DashboardCard
            title="Storage Used"
            value="49.0 GB"
            icon={<RiDatabase2Line />}
            iconBgColor="bg-blue-100"
            iconColor="text-blue-600"
            progressWidth="32%"
          />
          <DashboardCard
            title="Total Files"
            value="1,248"
            icon={<RiFileTextLine />}
            iconBgColor="bg-green-100"
            iconColor="text-green-600"
          />
          <DashboardCard
            title="Shared Files"
            value="87"
            icon={<RiShareLine />}
            iconBgColor="bg-purple-100"
            iconColor="text-purple-600"
          />
          <DashboardCard
            title="Folders"
            value="26"
            icon={<RiFolder2Line />}
            iconBgColor="bg-yellow-100"
            iconColor="text-yellow-600"
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <StorageUsage />
          <RecentFiles />
        </div>
        <div className="grid grid-cols-1 gap-4">
          <ActivityLog />
        </div>
      </main>
      <NewItemModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default Page;
