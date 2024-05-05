import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import "../globals.css";

export const metadata: Metadata = {
  title: "Secure Ballot",
  description:
    "A blockchain based voting system that ensures secure and transparent elections",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className="flex flex-col items-center min-h-screen w-full dark p-2">
        <Toaster />
        <h1 className="text-4xl my-5">Admin Panel</h1>

        {children}
      </body>
    </html>
  );
}
