# eventemitter16
A custom event emitter to replace Node’s built in eventemitter
---
<h1>Why eventemitter16?</h1>

- **It is small but very powerful**
- **It is built with classes**
- **It doesn't use any dependencies**
- **It has better errors thrown in case of a user mistake**
- **It is easy to implement**
- **It executes all methods synchronously and in order of addition** *emitter.prependListener() and emitter.prependOnceListener() are not included*
- **It has an additional Util class you can access in __eventemitter16__ instances**
- **It is easy to extend**
---
## Examples
- **Simple emitter logging "Hello world!"**
```js
const EventEmitter = require('eventemitter16'); // Import the module
const emitter = new EventEmitter; // Create an instance of it

emitter.on('hello', () => { // Listen to the event
  console.log("Hello world!");
});

emitter.emit('hello'); // Invokes all listeners for 'hello'
```

- **Simple emitter executing functions and giving them arguments**
```js
const EventEmitter = require('eventemitter16'); // Import the module
const emitter = new EventEmitter; // Create an instance of it

emitter.on('exec', (hello, world) => { // Listen to the event
  console.log(hello + ' ' + world);
  emitter.emit('qwerty', hello, world); // Invokes all listeners for 'qwerty'
});

emitter.on('qwerty', (...args) => { // Listen to the event
  console.log(args.join(' ');
});

emitter.emit('exec', 'Hello', 'world!'); // Invokes all listeners for 'exec'
```

- **Simple testing application logging the eventnames and listeners**
```js
const EventEmitter = require('eventemitter16'); // Import the module
const emitter = new EventEmitter; // Create an instance of it

emitter.on('qwerty', () => {}) // Chaining events is also possible!
  .on('message', () => {})
  .on('message', () => {}); // Won't be logged twice

console.log(emitter.eventNames()); // [ 'qwerty', 'message' ]

const listeners = emitter.listeners(); // 3 empty methods

console.log(listeners.map(fn => fn.toSource()));
```

- **Simple emitter listening to events only once**
```js
const EventEmitter = require('eventemitter16'); // Import the module
const emitter = new EventEmitter; // Create an instance of it

emitter.on('message', msg => { // Listen to the event
  console.log(msg);
}).once('message', msg => { // Will be removed and then invoked
  msg = msg.split('').reverse().join('');
  console.log(msg);
});

emitter.emit('message', 'drooM'); // Invokes all listeners for 'message'
emitter.emit('message', 'Hello world!'); // Won't invoke the second listener since it got removed
```
