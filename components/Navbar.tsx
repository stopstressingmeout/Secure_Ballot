"use client";
import { Bell, Languages, Loader2, LogOut, MenuIcon } from "lucide-react";
// import Link from "next/link";

import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getCurrentVoter, logOut } from "@/lib/actions";
import { useRouter } from "next-nprogress-bar";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/navigation";

const paths = [
  {
    path: "/",
    label: "home",
  },
  {
    path: "/about",
    label: "about",
  },
  {
    path: "/vote-count",
    label: "vote_count",
  },
];

const Navbar = () => {
  const t = useTranslations("Navbar");

  const curLocale = useLocale();

  let pathname = usePathname();
  pathname = pathname.replace(/\/(en|bn)(\/|$)/, "/");
  console.log(pathname, curLocale);

  const router = useRouter();
  const [voterPresent, setVoterPresent] = useState(false);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const update = async () => {
      const voter = await getCurrentVoter();
      if (voter) {
        setVoterPresent(true);
      } else {
        setVoterPresent(false);
      }
      setLoading(false);
    };

    update();
  }, [pathname]);
  return (
    <nav className="w-full border-b border-border">
      <Sheet open={open} onOpenChange={setOpen}>
        <div className="container max-w-5xl  flex items-center justify-between">
          <div className="hidden md:flex gap-5">
            {paths.map((path) => {
              return (
                <Link
                  className={`text-lg border-b-2 hover:border-primary transition-all  py-3  ${
                    pathname === path.path
                      ? "text-primary  border-primary"
                      : "text-primary/50 border-transparent"
                  }`}
                  href={path.path}
                  key={path.path}
                >
                  {t(path.label)}
                </Link>
              );
            })}
          </div>

          <div className="hidden items-center md:flex gap-5">
            {curLocale === "en" ? (
              <a
                href={`/bn${pathname}`}
                className="-rotate-45 text-foreground/60 hover:text-foreground"
              >
                <h1 className="rotate-45 font-light text-xl leading-5 ">A</h1>
                <h1 className="rotate-45 font-light text-xl leading-5">অ</h1>
              </a>
            ) : (
              <a
                href={`/en${pathname}`}
                className="-rotate-45 text-foreground/60 hover:text-foreground"
              >
                <h1 className="rotate-45 font-light text-xl leading-5 ">A</h1>
                <h1 className="rotate-45 font-light text-xl leading-5">অ</h1>
              </a>
            )}
            <Link
              href="/notices"
              className="hover:bg-accent p-2 rounded-md text-foreground/60"
            >
              <Bell />
            </Link>
            {loading ? (
              <div className="flex justify-center items-center ">
                <Loader2 className="w-6 h-6 animate-spin" />
              </div>
            ) : voterPresent ? (
              <div className="flex justify-center gap-5">
                <Button variant={"secondary"}>
                  <Link href="/vote">{t("start_voting")}</Link>
                </Button>
                <Button
                  variant={"outline"}
                  onClick={async () => {
                    await logOut();
                    router.push("/");
                  }}
                >
                  <LogOut />
                </Button>
              </div>
            ) : (
              <Button variant={"secondary"}>
                <Link href="/vote/verification">{t("start_voting")}</Link>
              </Button>
            )}
          </div>
          <div className="flex items-center justify-between py-3 md:hidden w-full">
            <SheetTrigger>
              <MenuIcon className="w-8 h-8" />
            </SheetTrigger>
            <div className="flex justify-center items-center gap-5">
              {curLocale === "en" ? (
                <a
                  href={`/bn${pathname}`}
                  className="-rotate-45 text-foreground/60 hover:text-foreground"
                >
                  <h1 className="rotate-45 font-light text-xl leading-5 ">A</h1>
                  <h1 className="rotate-45 font-light text-xl leading-5">অ</h1>
                </a>
              ) : (
                <a
                  href={`/en${pathname}`}
                  className="-rotate-45 text-foreground/60 hover:text-foreground"
                >
                  <h1 className="rotate-45 font-light text-xl leading-5 ">A</h1>
                  <h1 className="rotate-45 font-light text-xl leading-5">অ</h1>
                </a>
              )}
              <Link
                href="/notices"
                className="hover:bg-accent p-2 rounded-md text-foreground/60"
              >
                <Bell />
              </Link>
              {loading ? (
                <div className="flex justify-center items-center ">
                  <Loader2 className="w-6 h-6 animate-spin" />
                </div>
              ) : voterPresent ? (
                <div className="flex justify-center gap-5">
                  <Button variant={"secondary"}>
                    <Link href="/vote">{t("start_voting")}</Link>
                  </Button>
                  <Button
                    variant={"outline"}
                    onClick={async () => {
                      await logOut();
                      router.push("/");
                    }}
                  >
                    <LogOut />
                  </Button>
                </div>
              ) : (
                <Button variant={"secondary"}>
                  <Link href="/vote/verification">{t("start_voting")}</Link>
                </Button>
              )}
            </div>
          </div>
        </div>

        <SheetContent side={"left"}>
          <SheetHeader className="my-10">
            <SheetTitle className="text-5xl text-center">
              {t("title")}
            </SheetTitle>
            <SheetDescription className="xl text-center">
              {t("description")}
            </SheetDescription>
          </SheetHeader>
          <div className="flex mt-20 flex-col justify-center items-center gap-5">
            {paths.map((path) => {
              return (
                <Link
                  onClick={() => setOpen(false)}
                  className={`text-lg text-center  transition-all  py-3 w-full  rounded-xl ${
                    pathname === path.path
                      ? "text-primary bg-accent"
                      : "text-primary/50 hover:bg-accent/30"
                  }`}
                  href={path.path}
                  key={path.path}
                >
                  {t(path.label)}
                </Link>
              );
            })}
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default Navbar;
