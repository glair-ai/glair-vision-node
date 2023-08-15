import { describe, expect, test } from "vitest";
import {
  validateSessionCreateParam,
  validateSessionRetrieveParam,
} from "./session";

describe("validateSessionCreateParam", () => {
  test("should return invalid success URL param", () => {
    const param = {
      success_url: "not_an_url",
    };

    const result = validateSessionCreateParam(param);

    expect(result).toStrictEqual([
      {
        key: "success_url",
        message: "Success URL must be a valid URL",
      },
    ]);
  });

  test("should return invalid cancel param", () => {
    const param = {
      success_url: "http://www.google.com",
      cancel_url: "not_an_url",
    };

    const result = validateSessionCreateParam(param);

    expect(result).toStrictEqual([
      {
        key: "cancel_url",
        message: "Cancel URL must be a valid URL",
      },
    ]);
  });

  test("should return empty validation errors", () => {
    const param = {
      success_url: "http://www.google.com",
    };

    const result = validateSessionCreateParam(param);

    expect(result).toStrictEqual([]);
  });
});

describe("validateSessionRetrieveParam", () => {
  test("should return empty validation errors", () => {
    const param = {
      sid: "1234",
    };

    const result = validateSessionRetrieveParam(param);

    expect(result).toStrictEqual([]);
  });
});
