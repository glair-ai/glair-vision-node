import { describe, expect, test } from "vitest";

<<<<<<< HEAD
import { isDefined, isValidURL, runSchemaValidation } from "./validator";
=======
import { isDefined, isValidURL } from "./validator";
>>>>>>> 0aef7fa (feat: add npwp session code)

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
<<<<<<< HEAD

describe("runSchemaValidation", () => {
  test("should return validation errors", () => {
    const schema = {
      foo: (val: any) => (val === "bar" ? "" : "not good"),
    };

    const obj = {
      foo: "baz",
    };

    const result = runSchemaValidation(obj, schema);

    expect(result).toStrictEqual([
      {
        key: "foo",
        message: "not good",
      },
    ]);
  });

  test("should return empty errors", () => {
    const schema = {
      foo: (val: any) => (val === "bar" ? "" : "not good"),
    };

    const obj = {
      foo: "bar",
    };

    const result = runSchemaValidation(obj, schema);

    expect(result).toStrictEqual([]);
  });
});
=======
>>>>>>> 0aef7fa (feat: add npwp session code)
