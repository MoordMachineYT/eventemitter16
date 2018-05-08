class Util {
  constructor(emitter) {
    this.emitter = emitter;
  }
  resolveSymbol(sym) {
    const symbol = Symbol.for(Symbol.keyFor(sym));
    if (!Symbol.keyFor(symbol)) return sym;
    return `AGXS37#EXE${Symbol.keyFor(symbol)}QSD`;
  }
  isValid(val) {
    if (val instanceof String || typeof val === "string" || typeof val === "symbol") return true;
    return false;
  }
}

module.exports = Util;
