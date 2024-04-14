import { useFormatter, useTranslations } from "next-intl";
import React from "react";

const Footer = () => {
  const t = useTranslations("Footer");

  const format = useFormatter();

  return (
    <footer className="w-full border-t border-border">
      <div className="container mx-auto py-6 text-center">
        <p className="text-sm text-text">
          &copy; {format.dateTime(new Date()).split("/")[2]} {t("title")}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
