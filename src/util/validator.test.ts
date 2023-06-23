import { describe, expect, test } from "vitest";

<<<<<<< HEAD
<<<<<<< HEAD
import { isDefined, isValidURL, runSchemaValidation } from "./validator";
=======
import { isDefined, isValidURL } from "./validator";
>>>>>>> 0aef7fa (feat: add npwp session code)
=======
import { isDefined, isValidURL, runSchemaValidation } from "./validator";
>>>>>>> 28dbfc3 (feat: add ocr npwp api)

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
<<<<<<< HEAD
=======
>>>>>>> 28dbfc3 (feat: add ocr npwp api)

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
<<<<<<< HEAD
=======
>>>>>>> 0aef7fa (feat: add npwp session code)
=======
>>>>>>> 28dbfc3 (feat: add ocr npwp api)
