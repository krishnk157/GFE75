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
