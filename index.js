const Util = require("./util.js");

class EventEmitter {
  constructor() {
    this.events = {};
    this.util = new Util(this);
    return this;
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
    this.emit("newListener", this.util.simbolify(event), func);
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push({once: false, func: func});
    return this;
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
    this.emit("newListener", this.util.symbolify(event), func);
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push({once: true, func: func});
    return this;
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
    this.emit("newListener", this.util.symbolify(event), func);
    if (!this.events[event]) this.events[event] = [];
    this.events[event].unshift({once: false, func: func});
    return this;
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
    this.emit("newListener", this.util.symbolify(event), func);
    if (!this.events[event]) this.events[event] = [];
    this.events[event].unshift({once: true, func: func});
    return this;
  }
  emit(event, ...args) {
    if (!this.util.isValid(event)) throw new TypeError("event must be a string or symbol");
    event = typeof event === "symbol" ? this.util.resolveSymbol(event) : event;
    if (!this.events[event] || !this.events[event].length) return;
    let doError = event === "error";
    const ev = this.events[event];
    if ((!ev || !ev.length) && doError) {
      let err;
      if (args[0]) err = args[0];
      if (err instanceof Error) {
        try{
          const { kExpandStackSymbol } = require("internal/util");
          const capture = {};
          Error.captureStackTrace(capture, this.emit);
          Object.defineProperty(err, kExpandStackSymbol, {
            value: this.util.enhanceStackTrace.bind(null, err, capture),
            configurable: true
          });
        }catch(e) {}
        throw err; // Unhandled 'error' event
      }
      const error = new Error(err || "Unhandled 'error' event");
      error.context = err;
      throw error; // Unhandled 'error' event
    }
    if (!ev || !ev.length) return false;
    for (var obj of ev) {
      if (obj.once) {
        this.events[event].splice(ev.indexOf(obj), 1);
        obj.func(...args);
        this.emit("removeListener", this.util.symbolify(event), obj.func);
        continue;
      }
      obj.func(...args);
    }
    return true;
  }
  removeListener(event, func) {
    if (!this.util.isValid(event)) throw new TypeError("event must be a string or symbol");
    event = typeof event === "symbol" ? this.util.resolveSymbol(event) : event;
    if (!this.events[event] || !this.events[event].length) return;
    const filter = obj => obj.func === func;
    if (this.events[event].findIndex(filter) < 0) return;
    this.events[event].splice(this.events[event].findIndex(filter), 1);
    this.emit("removeListener", this.util.symbolify(event), func);
    return this;
  }
  removeAllListeners(event) {
    if (!event) {
      this.events = {};
    } else {
      if (!this.util.isValid(event)) throw new TypeError("event must be a string or symbol");
      event = typeof event === "symbol" ? this.util.resolveSymbol(event) : event;
      this.events[event] = [];
    }
    return this;
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
  setMaxListeners(num) {
    if (isNaN(num)) {
      const e = new TypeError("The num argument must be a number");
      e.name = "TypeError [ERR_INVALID_ARG_TYPE]";
      throw e; // Not a number
    }
    num = parseInt(num);
    if (num < 0 || num > 2**53) {
      const e = new RangError("The num argument is out of range");
      throw e; // Too big or negative number
    }
    this.maxlisteners = num;
    return this;
  }
  getMaxListeners() {
    return this.maxlisteners || this.constructor.defaultMaxListeners;
  }
  eventNames() {
    return Object.keys(this.events).map(d=>this.util.symbolify(d));
  }
  static get defaultMaxListeners() {
    return Util.defaultMaxListeners;
  }
  static set defaultMaxListeners(num) {
    if (isNaN(num)) || num < 0 || num > 2**53) {
      const e = new RangeError("The \"defaultMaxListeners\" argument is out of range");
      e.name = "TypeError [ERR_OUT_OF_RANGE]";
      throw e; // Not a number or too small
    }
    Util.defaultMaxListeners = parseInt(num);
  }
}

module.exports = EventEmitter;
