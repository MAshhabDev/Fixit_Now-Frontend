import { Navbar } from "@/components/shared/navbar";
import { SidebarProvider } from "@/components/ui/sidebar"; // 👈 ১. SidebarProvider ইমপোর্ট করা হলো
import DashboardSidebar from "./_components/DashboardSidebar";
import getMe from "@/service/getMe";

const DashboardLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const user = await getMe();
  const userRole = user?.data?.profile?.role || "CUSTOMER";

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar userRole={userRole} />

        <div className="flex-1 flex flex-col">
          <Navbar user={user} />
          <main className="flex-1 p-6 bg-background">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;