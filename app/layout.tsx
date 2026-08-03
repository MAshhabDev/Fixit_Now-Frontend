import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full antialiased", inter.variable)}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans antialiased">
        {/* 🟢 ১. মেইন কনটেন্ট */}
        <div className="flex-1">{children}</div>

        {/* 🟢 ২. গ্লোবাল টোস্ট হ্যান্ডলার */}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}