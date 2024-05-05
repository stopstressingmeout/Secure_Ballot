import { PageProps } from "@/lib/types";
import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import Image from "next/image";
import React from "react";

const AboutPage = ({ params: { locale } }: PageProps) => {
  unstable_setRequestLocale(locale);

  const t = useTranslations("About");

  return (
    <div className="flex justify-center items-center flex-col max-w-5xl w-full mx-auto p-5 py-10 text-center md:text-left">
      <div className="flex gap-5">
        <div>
          <h1 className="text-3xl mb-5">{t("title")}</h1>
          <h1 className="font-light">
            {t("description")}
          </h1>
        </div>
        <div className="md:flex justify-center items-center hidden">
          <div className="border border-border aspect-square h-64"></div>
        </div>
      </div>
      {/* <div className="mt-10 w-full">
        <h1 className="text-3xl mb-5 ">Our Team</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="flex flex-col items-center">
            <div className="border border-border aspect-square h-52 rounded-full"></div>
            <h1 className="text-xl mt-3">Name</h1>
            <h1 className="text-lg">Role</h1>
          </div>
          <div className="flex flex-col items-center">
            <div className="border border-border aspect-square h-52 rounded-full"></div>
            <h1 className="text-xl mt-3">Name</h1>
            <h1 className="text-lg">Role</h1>
          </div>
          <div className="flex flex-col items-center">
            <div className="border border-border aspect-square h-52 rounded-full"></div>
            <h1 className="text-xl mt-3">Name</h1>
            <h1 className="text-lg">Role</h1>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default AboutPage;
