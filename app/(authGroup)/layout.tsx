import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { Navbar } from "@/components/shared/navbar";
import { Toaster } from "sonner";
import getMe from "@/service/getMe"; 
import { Footer } from "../(publicGroup)/_components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getMe(); 

  return (
    <html
      lang="en"
      className={cn("h-full antialiased", "font-sans", inter.variable)}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Navbar user={user} />

        <div className="flex-1">{children}</div>

        <Footer />

        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}