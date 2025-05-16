"use client";

import { useStatsStore } from "@/lib/store";
import { Sidebar } from "../../components/sidebar";
import { useEffect, useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [serverURLText, setServerURLText] = useState("");
  const { serverURL, setServerURL, fetchAll } = useStatsStore();

  useEffect(() => {
    if (!serverURL) return;

    const interval = setInterval(() => {
      fetchAll();
    }, 2000);

    fetchAll();

    return () => clearInterval(interval);
  }, [serverURL, fetchAll]);

  if (serverURL !== "") {
    return (
      <div className="flex h-screen overflow-hidden">
        <div className="w-[30%]">
          <Sidebar />
        </div>
        <main className="w-[152%] overflow-y-auto bg-[#050816]">
          {children}
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 bg-[#050816] text-white">
      <input
        type="text"
        className="p-2 rounded bg-[#1a1a2e] text-white w-1/2"
        placeholder="Enter Server URL"
        value={serverURLText}
        onChange={(e) => setServerURLText(e.target.value)}
      />
      <button
        onClick={() => setServerURL(serverURLText)}
        className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-500 transition"
      >
        Submit
      </button>
    </div>
  );
}
