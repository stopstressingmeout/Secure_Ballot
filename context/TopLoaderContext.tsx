"use client";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

const TopLoaderContext = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <ProgressBar
        height="4px"
        color="#fffd00"
        options={{ showSpinner: true }}
      />
    </>
  );
};

export default TopLoaderContext;
