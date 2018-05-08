class Util {
  constructor(emitter) {
    this.emitter = emitter;
  }
  resolveSymbol(sym) {
    const symbol = Symbol.for(Symbol.keyFor(sym));
    if (!Symbol.keyFor(symbol)) return sym;
    return symbol.valueOf();
  }
  isString(val) {
    if (val instanceof String || typeof val === "string") return true;
    return false;
  }
}

module.exports = Util;
