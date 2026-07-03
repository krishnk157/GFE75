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
