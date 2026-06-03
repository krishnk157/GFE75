export default function deepOmit(val, keys) {
  if (keys.length === 0) return val;

  if (typeof val !== "object") {
    return val;
  } else {
    let newObj = Array.isArray(val) ? [] : {};
    for (let key in val) {
      if (!keys.includes(key)) {
        newObj[key] = deepOmit(val[key], keys);
      }
    }
    return newObj;
  }
}
