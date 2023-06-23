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
