export type KTP = {
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

type KTP_CONDITIONS =
  | "is_blurred"
  | "is_bright"
  | "is_copy"
  | "is_cropped"
  | "is_dark"
  | "is_flash"
  | "is_ktp"
  | "is_rotated";
