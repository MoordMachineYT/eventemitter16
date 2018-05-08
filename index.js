class EventEmitter {
  constructor() {
    this.events = {};
  }
  on(event, func) {
    if (typeof func !== "function") throw new Error("callback must be a function");
    this.emit("newListener", event, func);
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push({once: false, func: func});
  }
  once(event, func) {
    if (typeof func !== "function") throw new Error("callback must be a function");
    this.emit("newListener", event, func);
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push({once: true, func: func});
  }
  prependListener(event, func) {
    if (typeof func !== "function") throw new Error("callback must be a function");
    this.emit("newListener", event, func):
    if (!this.events[event]) this.events[event] = [];
    this.events[event].unshift({once: false, func: func});
  }
  prependOnceListener(event, func) {
    if (typeof func !== "function") throw new Error("callback must be a function");
    this.emit("newListener", event, func):
    if (!this.events[event]) this.events[event] = [];
    this.events[event].unshift({once: true, func: func});
  }
  emit(event, ...args) {
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
}

module.exports = EventEmitter;
