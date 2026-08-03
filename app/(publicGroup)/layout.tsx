const HomeLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="min-h-full flex flex-col">
      {children}
    </div>
  );
};

export default HomeLayout;