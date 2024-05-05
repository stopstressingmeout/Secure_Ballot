import UserForm from "@/components/UserForm";
import { PageProps } from "@/lib/types";
import { unstable_setRequestLocale } from "next-intl/server";

export default function VerificationPage({ params: { locale } }: PageProps) {
  unstable_setRequestLocale(locale);
  return (
    <div className="flex flex-col justify-center">
      <UserForm />
    </div>
  );
}
