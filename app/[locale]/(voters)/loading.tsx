import { Loader2 } from "lucide-react";
import React from "react";

const loading = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Loader2 size={50} className="animate-spin" />
    </div>
  );
};

export default loading;