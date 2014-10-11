#node-mock-stdin

[![Build Status](https://travis-ci.org/caitp/node-mock-stdin.svg?branch=master)](https://travis-ci.org/caitp/node-mock-stdin) [![Coverage Status](https://img.shields.io/coveralls/caitp/node-mock-stdin.svg)](https://coveralls.io/r/caitp/node-mock-stdin?branch=master)

Provide a mock readable stream, useful for testing interactive CLI applications.

Maybe simple mocks for other standard files wouldn't be a terrible idea, if anyone
feels like those are needed. Patches welcome.

##API

- **Module**
  - [stdin()](#modulestdin)
- **MockSTDIN**
  - [send()](#mockstdinsend)
  - [end()](#mockstdinend)
  - [restore()](#mockstdinrestore)

---

######Module#stdin()

**example**

```js
require('mock-stdin').stdin();
```

Replaces the existing `process.stdin` value with a mock object exposing a `send` method (a
`MockSTDIN` instance). This allows APIs like `process.openStdin()` or `process.stdin.on()`
to operate on a mock instance.

**note**: Event listeners from the original `process.stdin` instance are not added to the
mock instance. Installation of the mock should occur before any event listeners are
registered.

**return value**: A `MockSTDIN` instance

---

######MockSTDIN#send(data)

**example**

```js
var stdin = require('mock-stdin').stdin();
stdin.send("Some text");
stdin.send(Buffer("Some text", "Some optional encoding"));
stdin.send([
  "Array of lines",
  "  which are joined with a linefeed."
]);

// sending a null will trigger EOF and dispatch an 'end' event.
stdin.send(null);
```

Queue up data to be read by the stream. Results in data (and possibly end) events being 
dispatched.

**parameters**
  - `data`: A `String`, `Buffer`, `Array<String>`, or `null`. The `data` parameter will result in
    the default encoding if specified as a string or array of strings.

**return value**: The `MockSTDIN` instance, for chaining.

---

######MockSTDIN#end()

**example**

```js
var stdin = require('mock-stdin').stdin();
stdin.end();
```

Alias for [MockSTDIN#send(null)](#mockstdinsend). Results in dispatching an `end` event.

**return value**: The `MockSTDIN` instance, for chaining.

---

##[LICENSE](LICENSE)

The MIT License (MIT)

Copyright (c) 2013 Caitlin Potter & Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.