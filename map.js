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
