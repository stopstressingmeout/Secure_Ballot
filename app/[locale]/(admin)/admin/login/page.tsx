"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";

const AdminLoginPage = () => {
  const authCookie = document.cookie;

  if (authCookie.includes("admin-auth")) {
    window.location.href = "/admin";
    return;
  }

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAdminLogin = () => {
    setLoading(true);
    if (!username || !password) {
      alert("Username and password are required");
      setLoading(false);
      return;
    }

    if (username !== "admin" || password !== "admin") {
      alert("Invalid username or password");
      setLoading(false);
      return;
    }

    document.cookie = "admin-auth=true; path=/; max-age=360000; ";
    window.location.href = "/admin";

    setLoading(false);
  };

  return (
    <div className="w-full flex flex-col justify-center items-center my-10 gap-5">
      <div className="grid w-full max-w-md items-center gap-1.5">
        <Label htmlFor="username">Username</Label>
        <Input
          type="text"
          id="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="grid w-full max-w-md items-center gap-1.5">
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Button
        className="w-full max-w-md"
        disabled={loading}
        onClick={handleAdminLogin}
      >
        Login
      </Button>
    </div>
  );
};

export default AdminLoginPage;
