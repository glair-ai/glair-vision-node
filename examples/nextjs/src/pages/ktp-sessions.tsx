import { vision } from "@/util/vision";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Link from "next/link";

export default function KtpSessions({
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
      <form action="/api/ktp-session" method="POST">
        <button
          className="rounded-lg border px-5 py-4 transition-colors border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          type="submit"
        >
          Perform KTP OCR via session
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
      <div className="w-9/12">{children}</div>
    </main>
  );
};

type KTP_CONDITIONS =
  | "is_blurred"
  | "is_bright"
  | "is_copy"
  | "is_cropped"
  | "is_dark"
  | "is_flash"
  | "is_ktp"
  | "is_rotated";

type KTP_FIELDS =
  | "agama"
  | "alamat"
  | "berlakuHingga"
  | "golonganDarah"
  | "jenisKelamin"
  | "kecamatan"
  | "kelurahanDesa"
  | "kewarganegaraan"
  | "kotaKabupaten"
  | "nama"
  | "nik"
  | "pekerjaan"
  | "provinsi"
  | "rtRw"
  | "statusPerkawinan"
  | "tanggalLahir"
  | "tempatLahir";

type Data = {
  status: string;
  expired: number;
  url: string;
  success_url: string;
  cancel_url: string;
  result: {
    condition: {
      [key in KTP_CONDITIONS]: boolean;
    };
    images: {
      photo: string;
      sign: string;
    };
    read: {
      [key in KTP_FIELDS]: {
        confidence: number;
        value: string;
      };
    };
    status: string;
    form?: {
      [key in KTP_FIELDS]: string;
    };
    reason?: string;
  };
};

export const getServerSideProps: GetServerSideProps<{ data: Data }> = async ({
  query,
}) => {
  const sid = query.sid;
  const data: Data = await vision.ocr.ktpSessions
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
