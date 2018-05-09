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
  longestSeqContainedIn(a, b) {
    for (var len = a.length; len >= 3; --len) {
      for (var i = 0; i < a.length - len; ++i) {
        for (var j = 0; j < b.length - len; ++j) {
          let matches = true;
          for (var k = 0; k < len; ++k) {
            if (a[i + k] !== b[j + k]) {
              matches = false;
              break;
            }
          }
          if (matches)
            return [ len, i, j ];
        }
      }
    }

    return [ 0, 0, 0 ];
  }
  enhanceStackTrace(err, own) { // Kinda copied the following and previous method :)
    const sep = "\nEmitted 'error' event at:\n";
    const errStack = err.stack.split("\n").slice(1);
    const ownStack = own.stack.split("\n").slice(1);
    const [len, off] = this.longestSeqContainedIn(ownStack, errStack);
    if (len > 0) ownStack.splice(off + 1, len - 1, '    [... lines matching original stack trace ...]');
    err.stack = err.stack + sep + ownStack.join("\n");
    return err.stack;
  }
}

Util.defaultMaxListeners = 10;

module.exports = Util;
