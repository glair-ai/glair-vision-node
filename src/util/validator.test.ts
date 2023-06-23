import { describe, expect, test } from "vitest";

import { isDefined, isValidURL } from "./validator";

describe("isValidURL", () => {
  test("should return false", () => {
    const input = "not_an_url";

    expect(isValidURL(input)).toBe(false);
  });

  test("should return true", () => {
    const input = "https://www.google.com";

    expect(isValidURL(input)).toBe(true);
  });
});

describe("isDefined", () => {
  test("should return false", () => {
    const input = undefined;

    expect(isDefined(input)).toBe(false);
  });

  test("should return true", () => {
    const input = "";

    expect(isDefined(input)).toBe(true);
  });
});

describe("isString", () => {
  test("should return false", () => {
    const input = undefined;

    expect(isDefined(input)).toBe(false);
  });

  test("should return truefor string literal", () => {
    const input = "test_string";

    expect(isDefined(input)).toBe(true);
  });

  test("should return true for string object", () => {
    const input = new String("test_string");

    expect(isDefined(input)).toBe(true);
  });
});
