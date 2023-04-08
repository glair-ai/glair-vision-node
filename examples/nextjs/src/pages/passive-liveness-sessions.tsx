import { vision } from "@/util/vision";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import React, { useState } from "react";

export default function PassiveLivenessSessions({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [message, setMessage] = useState();

  console.log({ data });

  if (data.status === "PENDING") {
    return <Container>Pending</Container>;
  }

  if (data.status === "FINISHED") {
    return (
      <Container>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </Container>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <Link href="/">Back</Link>
      </div>

      <form action="/api/pl-session" method="POST">
        <button
          className="rounded-lg border px-5 py-4 transition-colors border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          type="submit"
        >
          Perform Passive Liveness via session
        </button>
      </form>
    </main>
  );
}

type Props = {
  children?: React.ReactNode;
};

const Container: React.FC<Props> = ({ children }) => {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <Link href="/">Back</Link>
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
