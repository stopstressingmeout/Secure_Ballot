import type { Metadata } from "next";
import { Inter, Tiro_Bangla } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";

import Footer from "@/components/Footer";
import HolyLoader from "holy-loader";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";

const inter = Inter({ subsets: ["latin"] });
const tiro = Tiro_Bangla({ weight: "400", subsets: ["bengali"] });

export const metadata: Metadata = {
  title: "Secure Ballot",
  description:
    "A blockchain based voting system that ensures secure and transparent elections",
};

const locales = ["en", "bn"];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // console.log("Locale: ", locale);
  unstable_setRequestLocale(locale);

  const language = locale === "bn" ? tiro.className : inter.className;

  const messages = useMessages();

  return (
    <html lang={locale}>
      <body
        className={
          language + ` flex flex-col items-center min-h-screen w-full dark`
        }
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <>
            <Navbar />
            <HolyLoader showSpinner={false} />
            <main className="flex-1 w-full mx-auto">{children}</main>

            <Toaster />
            <Footer />
          </>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
