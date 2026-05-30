export default function classNames(...args) {
  let res = "";
  for (let a of args) {
    // Ignore falsey values
    if (!a) continue;
    else if (Array.isArray(a)) {
      res += classNames(...a) + " "; // recursive call for all items, if its an array
    } else if (typeof a === "object" && a !== null) {
      for (let key in a) {
        if (Object.hasOwn(a, key) && a[key]) {
          res += key + " "; //if object, check if it's a truthy value
        }
      }
    } else {
      res += a + " "; // if primitive just add to result
    }
  }
  return res.trim();
}
