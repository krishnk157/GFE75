export function isArray(value) {
  return Array.isArray(value);
}

export function isArrayAlt(value) {
  // For null and undefined.
  if (value == null) {
    return false;
  }

  return value.constructor === Array;
}

export function isFunction(value) {
  return typeof value === "function";
}

export function isObject(value) {
  return (
    (typeof value === "object" || typeof value === "function") && value !== null
  );
}

export function isPlainObject(value) {
  // For null and undefined.
  if (value == null) {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  return prototype === null || prototype === Object.prototype;
}
