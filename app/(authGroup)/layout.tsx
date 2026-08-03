import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { Navbar } from "@/components/shared/navbar";
import { Toaster } from "sonner"; // 🟢 টোস্ট নোটিফিকেশন ইমপোর্ট
import getMe from "@/service/getMe"; // 🟢 ইউজার ডাটা ইমপোর্ট
import { Footer } from "../(publicGroup)/_components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getMe(); // 🟢 লগইন থাকা ইউজারের টোকেন ও তথ্য ফেচ

  return (
    <html
      lang="en"
      className={cn("h-full antialiased", "font-sans", inter.variable)}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {/* 🟢 1. Global Navigation Bar With User Account State */}
        <Navbar user={user} />

        {/* 🟢 2. Page Content */}
        <div className="flex-1">{children}</div>

        {/* 🟢 3. Global Footer */}
        <Footer />

        {/* 🟢 4. Global Toast Notifications Handler */}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}