export default function memoize(func) {
  const res = new Map();
  return function (arg) {
    if (!res.has(arg)) {
      res.set(arg, func.call(this, arg));
    }
    return res.get(arg);
  };
}
