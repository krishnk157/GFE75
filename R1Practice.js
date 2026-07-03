//Call
Function.prototype.myCall = function (thisArg, ...argArray) {
  if (typeof this !== "function") {
    throw new TypeError(this + " is not callable");
  }
  const context = thisArg == null ? globalThis : Object(thisArg);
  const key = Symbol();
  context[key] = this; // this refers to the current function
  const res = context[key](...argArray);
  delete context[key];
  return res;
};

//Apply
Function.prototype.myApply = function (thisArg, argArray = []) {
  if (typeof this !== "function") {
    throw new TypeError(this + " is not callable");
  }
  const context = thisArg == null ? globalThis : Object(thisArg);
  const key = Symbol();
  context[key] = this;
  const res = context[key](...argArray);
  delete context[key];
  return res;
};

// Bind
Function.prototype.myBind = function (thisArg, ...presetArgs) {
  const originalFn = this;

  function boundFn(...laterArgs) {
    // Called with `new`
    const isConstructorCall = this instanceof boundFn;

    // Use the newly created object if called with new,
    // otherwise use the bound context.
    const context = isConstructorCall
      ? this
      : thisArg == null
      ? globalThis
      : Object(thisArg);

    const key = Symbol();

    context[key] = originalFn;

    const result = context[key](...presetArgs, ...laterArgs);

    delete context[key];

    return result;
  }

  // Preserve prototype chain
  if (originalFn.prototype) {
    boundFn.prototype = Object.create(originalFn.prototype);
  }

  return boundFn;
};

//curry
export default function curry(func) {
  return function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args);
    }
    return curried.bind(this, ...args);
  };
}

// debounce
function debounce(func, wait) {
  let timer;
  return function (...args) {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    let context = this;
    timer = setTimeout(() => {
      func.apply(context, args);
    }, wait);
  };
}

// throttle
function throttle(func, wait) {
  let timer;
  return function (...args) {
    if (timer) return;

    func.apply(this, args);

    timer = setTimeout(() => {
      timer = null;
    }, wait);
  };
}

// throttle leading + trailing

function throttle(func, wait) {
  let timer = null;
  let lastArgs = null;
  let lastThis = null;

  function invoke() {
    if (lastArgs) {
      func.apply(lastThis, lastArgs);

      lastArgs = null;
      lastThis = null;

      timer = setTimeout(invoke, wait);
    } else {
      timer = null;
    }
  }

  return function (...args) {
    if (!timer) {
      func.apply(this, args);

      timer = setTimeout(invoke, wait);
    } else {
      lastArgs = args;
      lastThis = this;
    }
  };
}

// Promise All
function promiseAll(iterable) {
  return new Promise((resolve, reject) => {
    let completed = 0;
    const n = iterable.length;
    const res = new Array(n);

    if (n === 0) {
      resolve(res);
      return;
    }

    iterable.forEach(async (p, i) => {
      try {
        res[i] = await p;
        completed++;
        if (completed === n) {
          resolve(res);
          return;
        }
      } catch (e) {
        reject(e);
      }
    });
  });
}

// Promise Any
function promiseAny(iterable) {
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
        errors[i] = err;
        rejectCount++;
        if (rejectCount === n) {
          reject(new AggregateError(errors));
        }
      }
    });
  });
}

// Promise All Settled
function promiseAllSettled(iterable) {
  return new Promise((resolve, reject) => {
    const result = new Array(iterable.length);

    if (iterable.length === 0) {
      resolve(result);
      return;
    }

    let count = 0;
    iterable.forEach(async (p, i) => {
      try {
        let val = await p;
        result[i] = {
          status: "fulfilled",
          value: val,
        };
      } catch (err) {
        result[i] = {
          status: "rejected",
          reason: err,
        };
      } finally {
        count++;
        if (count === iterable.length) {
          resolve(result);
        }
      }
    });
  });
}

// Promise Race
function promiseRace(iterable) {
  return new Promise((resolve, reject) => {
    const n = iterable.length;
    if (n === 0) {
      return;
    }

    iterable.forEach(async (p) => {
      try {
        let res = await p;
        resolve(res);
      } catch (err) {
        reject(err);
      }
    });
  });
}

// Promise
class MyPromise {
  constructor(executor) {
    this.state = "pending";
    this.value = undefined;
    this.reason = undefined;

    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
      if (this.state !== "pending") return;

      this.state = "fulfilled";
      this.value = value;

      this.onFulfilledCallbacks.forEach((cb) => cb());
    };

    const reject = (reason) => {
      if (this.state !== "pending") return;

      this.state = "rejected";
      this.reason = reason;

      this.onRejectedCallbacks.forEach((cb) => cb());
    };

    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      const handleFulfilled = () => {
        try {
          if (!onFulfilled) {
            resolve(this.value);
            return;
          }

          const result = onFulfilled(this.value);

          resolve(result);
        } catch (err) {
          reject(err);
        }
      };

      const handleRejected = () => {
        try {
          if (!onRejected) {
            reject(this.reason);
            return;
          }

          const result = onRejected(this.reason);

          resolve(result);
        } catch (err) {
          reject(err);
        }
      };

      if (this.state === "fulfilled") {
        handleFulfilled();
      } else if (this.state === "rejected") {
        handleRejected();
      } else {
        this.onFulfilledCallbacks.push(handleFulfilled);
        this.onRejectedCallbacks.push(handleRejected);
      }
    });
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }
}

// Map
Array.prototype.myMap = function (callbackFn, thisArg) {
  const len = this.length;
  const res = Array(len);
  for (let index = 0; index < len; index++) {
    if (Object.hasOwn(this, index)) {
      res[index] = callbackFn.call(thisArg, this[index], index, this);
    }
  }
  return res;
};

// Filter
Array.prototype.myFilter = function (callbackFn, thisArg) {
  const len = this.length;
  const result = [];
  for (let i = 0; i < len; i++) {
    const value = this[i];
    if (Object.hasOwn(this, i) && callbackFn.call(thisArg, value, i, this)) {
      result.push(value);
    }
  }
  return result;
};

// Reduce
Array.prototype.myReduce = function (callbackFn, initialValue) {
  let hasInitialValue = initialValue !== undefined;
  let arr = this;
  if (!hasInitialValue && arr.length === 0)
    throw "no initial value provided and array is empty";

  let res = hasInitialValue ? initialValue : arr[0];

  for (let i = hasInitialValue ? 0 : 1; i < arr.length; i++) {
    if (Object.hasOwn(arr, i)) {
      res = callbackFn(res, arr[i], i, arr);
    }
  }
  return res;
};

// Flatten
function flatten(value) {
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

// Flatten depth
function flattenDeeper(arr, depth = Infinity) {
  const result = [];
  for (const item of arr) {
    if (Array.isArray(item) && depth > 0) {
      result.push(...flatten(item, depth - 1));
    } else {
      result.push(item);
    }
  }
  return result;
}

// Flatten by stack
function flatten(arr) {
  const stack = [...arr];
  const result = [];

  while (stack.length) {
    const current = stack.pop();

    if (Array.isArray(current)) {
      stack.push(...current);
    } else {
      result.push(current);
    }
  }

  return result.reverse();
}

// Pipe
function pipe(...fns) {
  return (...args) => {
    return fns.reduce((acc, fn, index) => {
      return index === 0 ? fn(...acc) : fn(acc);
    }, args);
  };
}

// Deep Clone
function deepClone(value) {
  if (Array.isArray(value)) {
    return value.map((val) => deepClone(val));
  } else if (typeof value === "object" && value !== null) {
    let res = { ...value };
    for (let key in res) {
      if (Object.hasOwn(res, key)) {
        let val = res[key];
        if (typeof val === "object") {
          res[key] = deepClone(val);
        }
      }
    }
    return res;
  } else {
    return value;
  }
}

// Deep Equal
function deepEqual(a, b) {
  // handling primitives //better than === for NaN values
  if (Object.is(a, b)) {
    return true;
  }
  if (
    typeof a !== "object" ||
    typeof b !== "object" ||
    a === null ||
    b === null
  ) {
    return false;
  }

  if (Array.isArray(a) !== Array.isArray(b)) {
    return false;
  }

  const keysA = Object.keys(a);
  if (keysA.length !== Object.keys(b).length) {
    return false;
  }

  for (let key of keysA) {
    if (!deepEqual(a[key], b[key])) {
      return false;
    }
  }
  return true;
}

// Deep Omit
function deepOmit(val, keys) {
  if (keys.length === 0) return val;

  if (typeof val !== "object") {
    return val;
  } else {
    let newObj = Array.isArray(val) ? [] : {};
    for (let key in val) {
      if (!keys.includes(key)) {
        newObj[key] = deepOmit(val[key], keys);
      }
    }
    return newObj;
  }
}

// Event Emitter
class EventEmitter {
  constructor() {
    this._events = {};
  }

  on(eventName, listener) {
    if (!this._events[eventName]) {
      this._events[eventName] = [];
    }
    this._events[eventName].push(listener);
    return this;
  }

  off(eventName, listener) {
    const listeners = this._events[eventName];
    if (!listeners) return this;

    const index = listeners.findIndex((li) => li === listener);
    if (index != -1) {
      listeners.splice(index, 1);
    }
    return this;
  }

  emit(eventName, ...args) {
    const listeners = this._events[eventName];
    if (!listeners?.length) return false;

    listeners.forEach((listener) => listener(...args));
    return true;
  }

  once(event, listener) {
    const wrapper = (...args) => {
      listener(...args);
      this.off(event, wrapper);
    };
    this.on(event, wrapper);
  }
}

// Squash
function squashObject(obj) {
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

// Unsquash
function unsquashObject(obj) {
  const result = {};

  for (const key in obj) {
    const parts = key.split(".").filter(Boolean);
    if (parts.length === 0) {
      continue;
    }

    let current = result;

    for (let i = 0; i < parts.length - 1; i++) {
      const part = parts[i];

      if (!(part in current)) {
        current[part] = /^\d+$/.test(parts[i + 1]) ? [] : {};
      }

      current = current[part];
    }

    current[parts[parts.length - 1]] = obj[key];
  }

  return result;
}
