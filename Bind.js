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
