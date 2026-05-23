export default function promiseAll(iterable) {
  return new Promise((resolve, reject) => {
    const n = iterable.length;
    if (n === 0) {
      resolve([]);
    }
    let result = new Array(n);
    let count = 0;
    iterable.forEach(async (p, i) => {
      try {
        result[i] = await p;
        count++;
        if (count === n) {
          resolve(result);
          return;
        }
      } catch (err) {
        reject(err);
      }
    });
  });
}
