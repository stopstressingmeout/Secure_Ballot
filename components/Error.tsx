import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

const Error = () => {
  return (
    <div className="w-full h-full flex justify-center items-center flex-col">
      <h1 className="text-3xl text-center">Something went wrong</h1>
      <Button>
        <Link href="/">Go back to home</Link>
      </Button>
    </div>
  );
};

export default Error;
