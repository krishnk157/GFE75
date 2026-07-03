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

function debounce2(func, wait) {
  let timerId;
  let lastArgs;
  let lastContext;
  function debounced(...args) {
    lastArgs = args;
    lastContext = this;
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      timerId = null;
      func.apply(lastContext, lastArgs);
    }, wait);
  }

  debounced.cancel = function () {
    if (timerId) {
      clearTimeout(timerId);
      timerId = null;
    }
  };

  debounced.flush = function () {
    if (timerId) {
      clearTimeout(timerId);
      timerId = null;
      func.apply(lastContext, lastArgs);
    }
  };

  return debounced;
}
