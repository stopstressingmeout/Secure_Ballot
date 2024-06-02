"use client";
import { Toaster } from "@/components/ui/toaster";
import "../globals.css";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookies = document.cookie;
  const isAdmin = cookies.includes("admin-auth");

  const logoutAdmin = () => {
    document.cookie = "admin-auth=; path=/; max-age=0; ";
    window.location.href = "/admin/login";
  };
  return (
    <html>
      <body className="flex flex-col items-center min-h-screen w-full dark p-2">
        <Toaster />
        <div className="flex gap-3 justify-center items-center">
          <h1 className="text-4xl my-5">Admin Panel</h1>
          {isAdmin && (
            <Button variant={"outline"} onClick={logoutAdmin} size={"icon"}>
              <LogOut className="" />
            </Button>
          )}
        </div>

        {children}
      </body>
    </html>
  );
}
