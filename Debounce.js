export default function debounce(func, wait) {
  let timerId;
  return function (...args) {
    if (timerId) {
      clearTimeout(timerId);
    }
    let context = this;
    timerId = setTimeout(() => {
      func.apply(context, args);
    }, wait);
  };
}
