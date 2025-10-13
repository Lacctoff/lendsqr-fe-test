import "../../styles/main.scss";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="dashboard-layout">
      <Header/>
      <Sidebar />
      <main className="dashboard-main">
        {children}
      </main>
    </div>
  );
}
