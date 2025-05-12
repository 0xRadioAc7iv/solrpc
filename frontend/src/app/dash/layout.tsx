import { Sidebar } from "../../components/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-[30%]">
        <Sidebar />
      </div>
      <main className="w-[152%] overflow-y-auto bg-[#050816] ">
        {children}
      </main>
    </div>
  );
}
