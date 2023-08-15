import { describe, expect, test, vi } from "vitest";

import fs from "fs";

import { Ocr } from "./ocr";
import { Config } from "./config";
import { FileNotFoundError } from "../error/file-not-found";

describe("Ocr", () => {
  describe("ktp", () => {
    test("should throw FileNotFoundError when file is not found", async () => {
      vi.spyOn(fs, "existsSync").mockImplementation(() => false);

      const cfg = new Config();
      const ocr = new Ocr(cfg);

      await expect(ocr.ktp({ image: "not_found" })).rejects.toThrow(
        FileNotFoundError
      );
    });
  });
});
