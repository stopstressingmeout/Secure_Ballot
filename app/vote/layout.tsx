import CustomizedSteppers from "@/components/Stepper";

export default function VoteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container p-10">
      <section className="mb-10">
        <CustomizedSteppers />
      </section>

      {children}
    </div>
  );
}
