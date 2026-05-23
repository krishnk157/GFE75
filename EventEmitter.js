export default class EventEmitter {
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
    if (index !== -1) {
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
}
