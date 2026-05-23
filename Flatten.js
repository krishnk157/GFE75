export default function throttle(func, wait) {
  let timer;
  return function (...args) {
    if (timer) return;
    func.apply(this, args);
    timer = setTimeout(() => {
      clearTimeout(timer);
      timer = null;
    }, wait);
  };
}
