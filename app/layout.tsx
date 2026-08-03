import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "./(publicGroup)/_components/Footer";
import { Toaster } from "sonner";
import getMe from "@/service/getMe";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getMe();

  return (
    <html lang="en" className={cn("h-full antialiased", inter.variable)}>
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans antialiased">
        {/* Global Navbar */}
        <Navbar user={user} />

        {/* Page Content */}
        <div className="flex-1">{children}</div>

        {/* Global Footer */}
        <Footer />

        {/* Global Toast Handler */}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
