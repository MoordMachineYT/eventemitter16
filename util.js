class Util {
  constructor(emitter) {
    this.emitter = emitter;
    this.strings = {};
    this.symbols = {};
  }
  resolveSymbol(sym) {
    const symbol = Symbol.for(Symbol.keyFor(sym));
    if (!Symbol.keyFor(symbol)) return sym;
    this.strings[symbol] = `AGXS37#EXE${Symbol.keyFor(symbol)}QSD`;
    this.symbols[this.strings[symbol]] = symbol;
    return this.strings[symbol];
  }
  isValid(val) {
    if (val instanceof String || typeof val === "string" || typeof val === "symbol") return true;
    return false;
  }
  symbolify(sym) {
    if (!this.symbols[sym]) return sym;
    return this.symbols[sym];
  }
  enhanceStackTrace(err, own) { // Heavily inspired by node itself
    
  }
}

Util.defaultMaxListeners = 10;

module.exports = Util;
