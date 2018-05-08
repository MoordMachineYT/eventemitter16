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
    if (!this.util.isString(event)) {
      const temp = event;
      event = this.util.resolveSymbol(event);
      if (temp === event) throw new Error("event must be a string or symbol");
    }
    event = event.valueOf();
    if (typeof func !== "function") throw new Error("callback must be a function");
    this.emit("newListener", event, func);
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push({once: false, func: func});
  }
  once(event, func) {
    if (!this.util.isString(event)) {
      const temp = event;
      event = this.util.resolveSymbol(event);
      if (temp === event) throw new Error("event must be a string or symbol");
    }
    event = event.valueOf();
    if (typeof func !== "function") throw new Error("callback must be a function");
    this.emit("newListener", event, func);
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push({once: true, func: func});
  }
  prependListener(event, func) {
    if (!this.util.isString(event)) {
      const temp = event;
      event = this.util.resolveSymbol(event);
      if (temp === event) throw new Error("event must be a string or symbol");
    }
    event = event.valueOf();
    if (typeof func !== "function") throw new Error("callback must be a function");
    this.emit("newListener", event, func):
    if (!this.events[event]) this.events[event] = [];
    this.events[event].unshift({once: false, func: func});
  }
  prependOnceListener(event, func) {
    if (!this.util.isString(event)) {
      const temp = event;
      event = this.util.resolveSymbol(event);
      if (temp === event) throw new Error("event must be a string or symbol");
    }
    event = event.valueOf();
    if (typeof func !== "function") throw new Error("callback must be a function");
    this.emit("newListener", event, func):
    if (!this.events[event]) this.events[event] = [];
    this.events[event].unshift({once: true, func: func});
  }
  emit(event, ...args) {
    if (!this.util.isString(event)) {
      const temp = event;
      event = this.util.resolveSymbol(event);
      if (temp === event) throw new Error("event must be a string or symbol");
    }
    event = event.valueOf();
    if (!event.includes) event = this.util.resolveSymbol(event);
    if (!this.events[event] || !this.events[event].length) return;
    const ev = this.events[event];
    for (var obj of ev) {
      obj.func(...args);
      if (obj.once) {
        this.events[event].splice(ev.indexOf(obj), 1);
        this.emit("removeListener", event, obj.func);
      }
    }
  }
  removeListener(event, func) {
    if (!this.util.isString(event)) {
      const temp = event;
      event = this.util.resolveSymbol(event);
      if (temp === event) throw new Error("event must be a string or symbol");
    }
    event = event.valueOf();
    if (!this.events[event] || !this.events[event].length) return;
    const filter = obj => obj.func === func;
    if (this.events[event].findIndex(filter) < 0) return;
    this.events[event].splice(this.events[event].findIndex(filter), 1);
  }
  removeAllListeners(event) {
    if (!event) {
      this.events = {};
    } else {
      if (!this.util.isString(event)) {
        const temp = event;
        event = this.util.resolveSymbol(event);
        if (temp === event) throw new Error("event must be a string or symbol");
      }
      event = event.valueOf();
      this.events[event] = [];
    }
  }
}

module.exports = EventEmitter;
