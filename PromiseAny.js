export default function promiseAny(iterable) {
  return new Promise((resolve, reject) => {
    const n = iterable.length;
    if (n === 0) {
      reject(new AggregateError([]));
      return;
    }
    let rejectCount = 0;
    const errors = new Array(n);
    iterable.forEach(async (p, i) => {
      try {
        let res = await p;
        resolve(res);
        return;
      } catch (err) {
        rejectCount++;
        errors[i] = err;
        if (rejectCount === n) {
          reject(new AggregateError(errors));
        }
      }
    });
  });
}
