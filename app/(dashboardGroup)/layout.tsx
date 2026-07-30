import { Navbar } from "@/components/shared/navbar";
import getMe from "@/service/getMe";

const HomeLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const user = await getMe();
  return (
    <div className="min-h-full flex flex-col">
      <Navbar user={user}></Navbar>
      {children}

      {/* Footer */}
    </div>
  );
};

export default HomeLayout;
