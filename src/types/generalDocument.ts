export type GeneralDocument = {
  read: {
    all_texts: {
      value: string;
      polygon: number[][];
    }[];
  };
  status: string;
  reason?: string;
};
