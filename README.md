# jsterm #

**jsterm** is a terminal emulator made with Node.js and xterm.js.

## Requirements
* [xterm](https://www.npmjs.com/package/xterm)
* [express](https://www.npmjs.com/package/express)
* [socket.io](https://www.npmjs.com/package/socket.io) 
* [ejs](https://www.npmjs.com/package/ejs)

## Documentation ##
### Getting Started

Install jsterm using npm:

```bash
$ npm install jsterm
```

You can now use jsterm like so:

```js
let Terminal = require('jsterm')

let term = new Terminal(1337) // localhost:1337 - Default shell

term.add('cmd.exe')  // localhost:1337/cmd.exe
term.add('bash.exe') // localhost:1337/bash.exe
term.add('node.exe') // localhost:1337/node.exe

term.listen(1337)

console.log('Terminal listening on localhost:1337')
```

Refer to the [jsterm examples](https://github.com/Sighmir/jsterm/tree/master/example) for more information.  

## License ##
```
jsterm - A terminal emulator made with Node.js and xterm.js.
Copyright (C) 2019  Guilherme Caulada (Sighmir)

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
```
