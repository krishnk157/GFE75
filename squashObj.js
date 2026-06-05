export default function squashObject(obj) {
  const res = {};
  function helper(obj, prevKey) {
    for (let key in obj) {
      const val = obj[key];

      const currKey = key ? (prevKey ? prevKey + "." + key : key) : prevKey;
      if (typeof val === "object" && val !== null) {
        helper(val, currKey);
      } else {
        res[currKey] = val;
      }
    }
  }
  helper(obj, "");

  return res;
}
