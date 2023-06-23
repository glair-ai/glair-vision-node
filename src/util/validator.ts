export function isValidURL(val: string) {
  try {
    new URL(val);

    return true;
  } catch (err) {
    return false;
  }
}

export function isDefined(val: unknown) {
  return typeof val !== "undefined";
}

export function isString(val: unknown) {
  return typeof val === "string" || val instanceof String;
}

export function runSchemaValidation(
  obj: Record<string, any>,
  schema: Record<string, (val: any) => string>
) {
  const result = [];

  for (const [key, validatorFn] of Object.entries(schema)) {
    const val = obj[key];

    result.push({
      key,
      message: validatorFn(val),
    });
  }

  return result.filter((res) => !!res.message);
}
