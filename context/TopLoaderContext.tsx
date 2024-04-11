"use client";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

const TopLoaderContext = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <ProgressBar
        height="4px"
        color="#784af4"
        delay={500}
        options={{ showSpinner: false }}
      />
    </>
  );
};

export default TopLoaderContext;