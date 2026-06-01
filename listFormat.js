const SEPARATOR = ", ";
const OTHERS_LABEL = "other";
const OTHERS_SEPARATOR = " and ";

export default function listFormat(itemsParam, options) {
  // remove falsey values
  let items = itemsParam.filter((item) => !!item);

  if (!items || items.length === 0) return "";

  // if only one item is there
  if (items.length === 1) {
    return items[0];
  }

  //sort
  if (options?.sorted) {
    items.sort();
  }

  //remove duplicates
  if (options?.unique) {
    items = Array.from(new Set(items));
  }

  //Length is specified and valid
  if (options?.length && options.length > 0 && options.length < items.length) {
    const firstPart = items.slice(0, options.length).join(SEPARATOR);
    const remainingCount = items.length - options.length;
    const secondPart = `${remainingCount} ${
      OTHERS_LABEL + (remainingCount > 1 ? "s" : "")
    }`;
    return [firstPart, secondPart].join(OTHERS_SEPARATOR);
  }

  //Length not specified
  const firstPart = items.slice(0, items.length - 1).join(SEPARATOR);
  const secondPart = items[items.length - 1];
  return [firstPart, secondPart].join(OTHERS_SEPARATOR);
}
