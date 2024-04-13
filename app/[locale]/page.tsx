import { useFormatter, useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("Home");
  const format = useFormatter();

  return (
    <div className="divide-border divide-y">
      <div className="py-12 lg:py-24">
        <div className="container px-4 text-center sm:px-6 lg:px-8">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold tracking-tighter  sm:text-7xl md:leading-[3.5rem] ">
              {t("title")}
            </h1>
            <p className="mx-auto max-w-lg text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed ">
              {t("description")}
            </p>
          </div>
        </div>
      </div>

      <div className="">
        <div className=" container grid gap-5 px-4 py-8 text-center md:grid-cols-3 md:gap-10 md:px-6 lg:gap-12 lg:py-12 lg:px-8">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl/none">
              {/* 10,000,000 */}
              {format.number(10000000)}
            </h2>
            <p className="text-muted-foreground"> {t("registered_voters")} </p>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl/none">
              {/* 5,000,000 */}
              {format.number(5000000)}
            </h2>
            <p className="text-muted-foreground">{t("votes_cast")}</p>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl/none">
              {/* 5 */}
              {format.number(5)}
            </h2>
            <p className="text-muted-foreground">{t("political_parties")}</p>
          </div>
        </div>
      </div>

      <div className=" py-12 md:py-16 ">
        <div className="flex flex-col gap-5 md:gap-8 lg:gap-12 container">
          <div className="mx-auto grid max-w-3xl items-start gap-5 px-4 sm:gap-8 md:px-6 lg:grid-cols-2">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                {t("how_title")}
              </h2>
              <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed dark:text-gray-400">
                {t("how_description")}
              </p>
            </div>
            <div className="space-y-4">
              <div className="list-decimal list-inside space-y-2">
                {[1, 2, 3].map((i) => (
                  <>
                    <h1 className="font-semibold">{t(`step${i}_title`)}</h1>
                    <p>{t(`step${i}_description`)}</p>
                  </>
                ))}
              </div>
            </div>
          </div>
          <div className="mx-auto grid max-w-3xl items-start gap-5 px-4 sm:gap-8 md:px-6 lg:grid-cols-2 w-full">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                {t("FAQ_title")}
              </h2>
              <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed dark:text-gray-400">
                {t("FAQ_description")}
              </p>
            </div>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <details key={i} className="space-y-2">
                  <summary className="font-semibold cursor-pointer">
                    {t(`faq${i}_title`)}
                  </summary>
                  <p>{t(`faq${i}_description`)}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MenuIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}
