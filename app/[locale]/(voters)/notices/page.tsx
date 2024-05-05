import { PageProps } from "@/lib/types";
import { useFormatter, useLocale, useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";

const NoticesPage = ({ params: { locale } }: PageProps) => {
  unstable_setRequestLocale(locale);

  const t = useTranslations("Notices");
  const format = useFormatter();

  console.log(process.env.BLOCKCHAIN_ADMIN_KEY);

  return (
    <div className="flex justify-center items-center flex-col max-w-3xl w-full mx-auto p-5">
      <h1 className="text-3xl mb-10">{t("title")}</h1>
      <div className="flex flex-col justify-center items-center gap-3">
        <div className="text-left border broder-border p-2 rounded-lg">
          <h1 className="text-xl font-bold">{t("notice1_title")}</h1>
          <h1 className="text-sm my-2 text-muted-foreground">
            {format.dateTime(new Date())}
          </h1>
          <h1 className="">{t("notice1_description")}</h1>
        </div>
        <div className="text-left border broder-border p-2 rounded-lg">
          <h1 className="text-xl font-bold">{t("notice2_title")}</h1>
          <h1 className="text-sm my-2 text-muted-foreground">
            {format.dateTime(new Date())}
          </h1>
          <h1 className="">{t("notice2_description")}</h1>
        </div>
      </div>
    </div>
  );
};

export default NoticesPage;
