import { PageProps } from "@/lib/types";
import { unstable_setRequestLocale } from "next-intl/server";
import React from "react";

const VotingSuccessPage = ({ params: { locale } }: PageProps) => {
  unstable_setRequestLocale(locale);
  return <div>Voting has been successful</div>;
};

export default VotingSuccessPage;
