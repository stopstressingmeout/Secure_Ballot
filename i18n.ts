import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";

export const locales = ["en", "bn"];

export default getRequestConfig(async ({ locale }) => {
  // const baselocale = new Intl.Locale(locale).baseName;
  if (!locales.includes(locale)) notFound();

  return {
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
