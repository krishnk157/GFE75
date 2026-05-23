Function.prototype.myCall = function (thisArg, ...argArray) {
  const context = thisArg || globalThis;
  const key = Symbol();
  context[key] = this; // this refers to the current function
  const res = context[key](...argArray);
  delete context[key];
  return res;
};
