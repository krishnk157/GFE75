export default function flatten(value) {
  let res = [];
  if (value.length <= 0) return res;
  value.forEach((val) => {
    if (Array.isArray(val)) {
      res.push(...flatten(val));
    } else {
      res.push(val);
    }
  });
  return res;
}
