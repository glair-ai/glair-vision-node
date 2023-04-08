interface GlairWebcamElmt
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, any> {
  width?: number;
  height?: number;
  facingMode?: "user" | "environment";
  mirrored?: boolean;
  screenshot?: () => Promise<string>;
}

export declare global {
  namespace JSX {
    interface IntrinsicElements {
      // Inspired from https://stackoverflow.com/a/62934334 and https://stackoverflow.com/a/55424778
      "glair-webcam": GlairWebcamElmt;
    }
  }
}
