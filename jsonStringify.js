export default function jsonStringify(value) {
  //Arrays
  if (Array.isArray(value)) {
    return `[${value.map((item) => jsonStringify(item)).join(",")}]`;
  }

  //Objects

  if (typeof value === "object" && value !== null) {
    const objEntries = Object.entries(value).map(
      ([key, value]) => `"${key}":${jsonStringify(value)}`
    );
    return `{${objEntries.join(",")}}`;
  }

  //String
  if (typeof value === "string") {
    return `"${value}"`;
  }

  // All other types
  return String(value);
}
