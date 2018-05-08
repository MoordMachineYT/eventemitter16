const Util = require("./util.js");

class EventEmitter {
  constructor() {
    this.events = {};
    this.util = new Util(this);
  }
  addListener(event, func) {
    return this.on(event, func);
  }
  on(event, func) {
    if (!this.util.isValid(event)) throw new TypeError("event must be a string or symbol");
    event = typeof event === "symbol" ? this.util.resolveSymbol(event) : event;
    if (typeof func !== "function") throw new TypeError("callback must be a function");
    if (this.listenerCount(event) + 1 > (this.getMaxListeners() || this.constructor.defaultMaxListeners)) {
      const ev = this.util.symbolify(event);
      const warn = {
        name: "MaxListenersExceededWarning",
        value: `Possible EventEmitter memory leak detected. ${this.listenerCount(event)} ${ev} listeners added. Use emitter.setMaxListeners() to increase limit`
      };
      Error.captureStackTrace(warn);
      process.emit("warn", warn);
    }
    this.emit("newListener", event, func);
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push({once: false, func: func});
  }
  once(event, func) {
    if (!this.util.isValid(event)) throw new TypeError("event must be a string or symbol");
    event = typeof event === "symbol" ? this.util.resolveSymbol(event) : event;
    if (typeof func !== "function") throw new TypeError("callback must be a function");
    if (this.listenerCount(event) + 1 > (this.getMaxListeners() || this.constructor.defaultMaxListeners)) {
      const ev = this.util.symbolify(event);
      const warn = {
        name: "MaxListenersExceededWarning",
        value: `Possible EventEmitter memory leak detected. ${this.listenerCount(event)} ${ev} listeners added. Use emitter.setMaxListeners() to increase limit`
      };
      Error.captureStackTrace(warn);
      process.emit("warn", warn);
    }
    this.emit("newListener", event, func);
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push({once: true, func: func});
  }
  prependListener(event, func) {
    if (!this.util.isValid(event)) throw new TypeError("event must be a string or symbol");
    event = typeof event === "symbol" ? this.util.resolveSymbol(event) : event;
    if (typeof func !== "function") throw new TypeError("callback must be a function");
    if (this.listenerCount(event) + 1 > (this.getMaxListeners() || this.constructor.defaultMaxListeners)) {
      const ev = this.util.symbolify(event);
      const warn = {
        name: "MaxListenersExceededWarning",
        value: `Possible EventEmitter memory leak detected. ${this.listenerCount(event)} ${ev} listeners added. Use emitter.setMaxListeners() to increase limit`
      };
      Error.captureStackTrace(warn);
      process.emit("warn", warn);
    }
    this.emit("newListener", event, func):
    if (!this.events[event]) this.events[event] = [];
    this.events[event].unshift({once: false, func: func});
  }
  prependOnceListener(event, func) {
    if (!this.util.isValid(event)) throw new TypeError("event must be a string or symbol");
    event = typeof event === "symbol" ? this.util.resolveSymbol(event) : event;
    if (typeof func !== "function") throw new TypeError("callback must be a function");
    if (this.listenerCount(event) + 1 > (this.getMaxListeners() || this.constructor.defaultMaxListeners)) {
      const ev = this.util.symbolify(event);
      const warn = {
        name: "MaxListenersExceededWarning",
        value: `Possible EventEmitter memory leak detected. ${this.listenerCount(event)} ${ev} listeners added. Use emitter.setMaxListeners() to increase limit`
      };
      Error.captureStackTrace(warn);
      process.emit("warn", warn);
    }
    this.emit("newListener", event, func):
    if (!this.events[event]) this.events[event] = [];
    this.events[event].unshift({once: true, func: func});
  }
  emit(event, ...args) {
    if (!this.util.isValid(event)) throw new TypeError("event must be a string or symbol");
    event = typeof event === "symbol" ? this.util.resolveSymbol(event) : event;
    if (!this.events[event] || !this.events[event].length) return;
    const ev = this.events[event];
    for (var obj of ev) {
      if (obj.once) {
        this.events[event].splice(ev.indexOf(obj), 1);
        this.emit("removeListener", this.util.symbolify(event), obj.func);
      }
      obj.func(...args);
    }
  }
  removeListener(event, func) {
    if (!this.util.isValid(event)) throw new TypeError("event must be a string or symbol");
    event = typeof event === "symbol" ? this.util.resolveSymbol(event) : event;
    if (!this.events[event] || !this.events[event].length) return;
    const filter = obj => obj.func === func;
    if (this.events[event].findIndex(filter) < 0) return;
    this.events[event].splice(this.events[event].findIndex(filter), 1);
    this.emit("removeListener", event, func);
  }
  removeAllListeners(event) {
    if (!event) {
      this.events = {};
    } else {
      if (!this.util.isValid(event)) throw new TypeError("event must be a string or symbol");
      event = typeof event === "symbol" ? this.util.resolveSymbol(event) : event;
      this.events[event] = [];
    }
  }
  listenerCount(event) {
    if (!event) {
      const keys = Object.keys(this.events);
      var count = 0;
      for (var i of keys) {
        count += this.events[i].length;
      }
      return count;
    }
    if (!this.util.isValid(event)) throw new TypeError("event must be a string or symbol");
    event = typeof event === "symbol" ? this.util.resolveSymbol(event) : event;
    if (!this.events[event]) return 0;
    return this.events[event].length;
  }
  listeners(event) {
    if (!this.util.isValid(event)) throw new TypeError("event must be a string or symbol");
    event = typeof event === "symbol" ? this.util.resolveSymbol(event) : event;
    if (!this.events[event]) return [];
    return this.events[event].map(obj => obj.func);
  }
  
  static get defaultMaxListeners() {
    return Util.defaultMaxListeners;
  }
  static set defaultMaxListeners(num) {
    if ((typeof num !== "number" && !(num instanceof Number)) || num < 0 || num > 2**53) {
      const e = new RangeError("The \"defaultMaxListeners\" argument is out of range");
      e.name = "TypeError [ERR_OUT_OF_RANGE]";
      throw e; // Not a number or too small
    }
    Util.defaultMaxListeners = num;
}

module.exports = EventEmitter;
