export default function promisify(func) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      //preserve this
      func.call(this, ...args, (err, res) => {
        err ? reject(err) : resolve(res);
      });
    });
  };
}
