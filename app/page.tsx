import Link from "next/link";

export default function Home() {
  return (
    <div className="divide-border divide-y">
      <div className="py-12 lg:py-24">
        <div className="container px-4 text-center sm:px-6 lg:px-8">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold tracking-tighter  sm:text-7xl md:leading-[3.5rem] ">
              Secure Ballot
            </h1>
            <p className="mx-auto max-w-lg text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed ">
              A blockchain based voting system that ensures secure and
              transparent elections.
            </p>
          </div>
        </div>
      </div>

      <div className="">
        <div className=" container grid gap-4 px-4 py-8 text-center md:grid-cols-3 md:gap-10 md:px-6 lg:gap-12 lg:py-12 lg:px-8">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl/none">
              10,000,000
            </h2>
            <p className="text-muted-foreground">Registered Voters</p>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl/none">
              5,000,000
            </h2>
            <p className="text-muted-foreground">Votes Cast</p>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl/none">
              5
            </h2>
            <p className="text-muted-foreground">Political Parties</p>
          </div>
        </div>
      </div>

      <div className=" py-12 md:py-16 ">
        <div className="flex flex-col gap-4 md:gap-8 lg:gap-12 container">
          <div className="mx-auto grid max-w-3xl items-start gap-4 px-4 sm:gap-8 md:px-6 lg:grid-cols-2">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                How to Vote
              </h2>
              <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed dark:text-gray-400">
                Voting in the decentralized system is easy and secure. Follow
                the steps below to cast your vote.
              </p>
            </div>
            <div className="space-y-4">
              <ol className="list-decimal list-inside space-y-2">
                <li className="font-semibold">Access the Voting Portal</li>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna,
                  at egestas amet, aliquam.
                </p>
                <li className="font-semibold">Verify Your Identity</li>
                <p>
                  Consectetur adipiscing elit. Urna, at egestas amet, aliquam.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna,
                  at egestas amet, aliquam.
                </p>
                <li className="font-semibold">Cast Your Vote</li>
                <p>
                  Ipsum dolor sit amet, consectetur adipiscing elit. Urna, at
                  egestas amet, aliquam.
                </p>
              </ol>
            </div>
          </div>
          <div className="mx-auto grid max-w-3xl items-start gap-4 px-4 sm:gap-8 md:px-6 lg:grid-cols-2">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed dark:text-gray-400">
                Have questions about the voting process? Check out our FAQs
                below.
              </p>
            </div>
            <div className="space-y-4">
              <details className="space-y-2">
                <summary className="font-semibold cursor-pointer">
                  How do I access the voting portal?
                </summary>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna,
                  at egestas amet, aliquam.
                </p>
              </details>
              <details className="space-y-2">
                <summary className="font-semibold cursor-pointer">
                  Can I change my vote after submitting?
                </summary>
                <p>
                  Consectetur adipiscing elit. Urna, at egestas amet, aliquam.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna,
                  at egestas amet, aliquam.
                </p>
              </details>
              <details className="space-y-2">
                <summary className="font-semibold cursor-pointer">
                  How is my identity verified in the decentralized system?
                </summary>
                <p>
                  Ipsum dolor sit amet, consectetur adipiscing elit. Urna, at
                  egestas amet, aliquam.
                </p>
              </details>
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
