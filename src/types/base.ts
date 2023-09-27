export type OCRRead<T> = {
  status: string;
  reason?: string;
  read?: T;
};
