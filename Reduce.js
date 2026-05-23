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
