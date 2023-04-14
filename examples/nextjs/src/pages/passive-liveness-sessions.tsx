import { vision } from "@/util/vision";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Link from "next/link";

export default function PassiveLivenessSessions({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (data.status === "FINISHED" || data.status == "PENDING") {
    return (
      <Container>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </Container>
    );
  }

  return (
    <Container>
      <form action="/api/pl-session" method="POST">
        <button
          className="rounded-lg border px-5 py-4 transition-colors border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          type="submit"
        >
          Perform Passive Liveness via session
        </button>
      </form>
    </Container>
  );
}

type Props = {
  children?: React.ReactNode;
};

const Container: React.FC<Props> = ({ children }) => {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <Link
          href="/"
          className="rounded-lg border p-3 transition-colors border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          Back
        </Link>
      </div>
      {children}
    </main>
  );
};

type Data = {
  status: string;
  expired: number;
  url: string;
  success_url: string;
  cancel_url: string;
  result: {
    status: string;
    result: {
      spoof_percentage: number;
      spoof_status: string;
    };
  };
};

export const getServerSideProps: GetServerSideProps<{ data: Data }> = async ({
  query,
}) => {
  const sid = query.sid;
  const data: Data = await vision.faceBio.passiveLivenessSessions
    .retrieve({
      sid: sid as string,
    })
    .catch((err) => console.error(err));

  return {
    props: {
      data: data ?? {},
    },
  };
};
