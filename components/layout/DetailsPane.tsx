// components/layout/DetailsPane.tsx
import {
  RiCloseLine,
  RiFileTextLine,
  RiFileZipLine,
  RiImageLine,
  RiMovieLine,
} from "@remixicon/react";
import StorageChart from "../StorageChart";

export default function DetailsPane() {
  return (
    <aside
      id="details-pane"
      className="w-full bg-card overflow-y-auto p-4 transform translate-x-full fixed inset-y-0 right-0 z-30 lg:w-72 lg:relative lg:translate-x-0 lg:flex-shrink-0"
    >
      <div
        id="details-pane-header"
        className="flex justify-between items-center mb-4"
      >
        <h3 id="pane-title" className="text-lg font-bold text-card-foreground">
          Storage
        </h3>
        <button
          id="close-details-btn"
          className="text-muted-foreground lg:hidden"
        >
          <RiCloseLine size={24} />
        </button>
      </div>
      <div id="storage-overview">
        <div className="relative max-w-[200px] mx-auto">
          <StorageChart />
        </div>
        <div className="space-y-1.5 my-2">
          <h4 className="font-semibold text-foreground text-sm">
            Storage Details
          </h4>
          <div className="flex items-center gap-2.5 p-1.5 text-sm">
            <div className="p-1.5 bg-blue-100 text-blue-600 rounded-md">
              <RiImageLine />
            </div>
            <p className="font-medium text-foreground">Images</p>
            <p className="ml-auto font-medium text-muted-foreground">15.7 GB</p>
          </div>
          <div className="flex items-center gap-2.5 p-1.5 text-sm">
            <div className="p-1.5 bg-red-100 text-red-600 rounded-md">
              <RiMovieLine />
            </div>
            <p className="font-medium text-foreground">Videos</p>
            <p className="ml-auto font-medium text-muted-foreground">20.0 GB</p>
          </div>
          <div className="flex items-center gap-2.5 p-1.5 text-sm">
            <div className="p-1.5 bg-green-100 text-green-600 rounded-md">
              <RiFileTextLine />
            </div>
            <p className="font-medium text-foreground">Documents</p>
            <p className="ml-auto font-medium text-muted-foreground">20.0 GB</p>
          </div>
          <div className="flex items-center gap-2.5 p-1.5 text-sm">
            <div className="p-1.5 bg-yellow-100 text-yellow-600 rounded-md">
              <RiFileZipLine />
            </div>
            <p className="font-medium text-foreground">Other Files</p>
            <p className="ml-auto font-medium text-muted-foreground">50.0 GB</p>
          </div>
        </div>

        {/* <div className="bg-gradient-to-br from-slate-700 to-slate-900 p-4 rounded-xl text-center text-white">
          <div className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-full mx-auto mb-2">
            <RiVipDiamondFill size={24} className="text-primary-foreground" />
          </div>
          <h4 className="text-base font-bold">Go Unlimited</h4>
          <p className="text-xs text-slate-300 mb-3">Get 1TB of storage.</p>
          <button className="w-full bg-white text-slate-800 font-semibold py-2 rounded-lg text-sm hover:bg-slate-200">
            Upgrade
          </button>
        </div> */}
      </div>
    </aside>
  );
}
