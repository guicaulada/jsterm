# Customizing your terminal emulator #

With custom public files you can customize the design and program new features for your terminal emulator.

## Requirements
* [xterm](https://www.npmjs.com/package/xterm)

## Documentation ##
### Getting Started

Install xterm.js on your public folder using npm:

```bash
$ npm install --prefix ./src/public xterm
```

You can now use xterm.js like so:

```html
<link rel="stylesheet" href="node_modules/xterm/dist/xterm.css" />
<script src="node_modules/xterm/dist/xterm.js"></script>
```

Refer to the [xterm.js documentation](https://xtermjs.org/docs) for more information.  

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
