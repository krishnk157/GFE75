export default function deepClone(value) {
  if (Array.isArray(value)) {
    return value.map((val) => deepClone(val)); // iterate through array items (can, be primitive,objs,nulls, arrays)
  } else if (typeof value === "object" && value !== null) {
    let res = { ...value }; // if value is object, shallow copy
    for (let key in res) {
      if (Object.hasOwn(res, key)) {
        let objValue = res[key];
        if (typeof objValue === "object") {
          res[key] = deepClone(objValue);
        }
      }
    }
    return res;
  } else {
    return value; // if value is primitive or null
  }
}
