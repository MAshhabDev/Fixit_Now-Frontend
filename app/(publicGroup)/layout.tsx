import { Navbar } from "@/components/shared/navbar";

const HomeLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="min-h-full flex flex-col">
      <Navbar></Navbar>
      {children}

      {/* Footer */}
    </div>
  );
};

export default HomeLayout;
