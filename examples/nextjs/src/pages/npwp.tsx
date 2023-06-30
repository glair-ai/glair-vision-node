import { GlairWebcamElmt } from "@/components/types";
import { useRef, useState } from "react";
import "@glair/web-components/lib/webcam";
import Link from "next/link";

export default function PassiveLiveness() {
  const webcam = useRef<GlairWebcamElmt>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleClick = async () => {
    if (!webcam.current || !webcam.current.screenshot) return;

    setLoading(true);
    const base64Sshot = await webcam.current.screenshot();
    const fetchSshot = await fetch(base64Sshot);
    const blob = await fetchSshot.blob();

    const formData = new FormData();
    formData.append("image", blob);

    const resp = await fetch("api/npwp", {
      method: "POST",
      body: formData,
    });

    setResult(await resp.json());
    setLoading(false);
  };

  if (result)
    return (
      <Container>
        <pre>{JSON.stringify(result, null, 2)}</pre>
      </Container>
    );

  return (
    <Container>
      <div className="mx-auto w-[300px]">
        <div className="h-[300px] text-gray-700">
          <glair-webcam
            ref={webcam}
            width={300}
            height={300}
            mirrored
          ></glair-webcam>
        </div>
        <div className="flex flex-col items-center bg-gray-700 p-3 text-center text-white">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              <p className="mb-3 text-lg font-bold">Take photo</p>
              <button
                className="h-[50px] w-[50px] cursor-pointer rounded-[50%] border-2 border-white bg-red-500"
                onClick={handleClick}
              ></button>
              <p className="mt-3">
                Make sure your NPWP is clearly visible on the marked area
              </p>
            </>
          )}
        </div>
      </div>
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
