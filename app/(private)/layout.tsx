// app/(private)/layout.tsx
import DetailsPane from "@/components/layout/DetailsPane";
import Sidebar from "@/components/layout/SideBar";
import TopBar from "@/components/layout/TopBar";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`flex h-screen overflow-hidden`}>
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        {children}
      </div>
      <DetailsPane />
    </div>
  );
}
