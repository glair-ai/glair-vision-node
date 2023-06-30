export type NPWP = {
  read: {
    [key in NPWP_FIELDS]: {
      confidence: number;
      value: string;
    };
  };
  status: string;
  reason?: string;
};

type NPWP_FIELDS = "noNpwp" | "nik" | "nama" | "alamat";
