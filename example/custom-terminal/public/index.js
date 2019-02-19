/*
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
*/

const socket = io.connect('http://localhost:' + port)

Terminal.applyAddon(fit)

const term = new Terminal({
  rightClickSelectsWord: false,
  cursorBlink: true,
  scrollback: 10000,
  fontFamily: 'Meslo LG M for Powerline', // You will need Powerline to use this font
  fontSize: 12
})

term.open(document.body)

term.on('data', (data) => {
  socket.emit('write', data)
})

socket.on('write', (data) => {
  term.write(data)
})

socket.emit('spawn', shell)

// This is necessary to hide scrollbars
let resized = false
let resize = (size) => {
  if (!resized) {
    resized = true
    term.resize(size.cols + 3, size.rows)
    setTimeout(() => resized = false, 250)
  }
}

term.on('resize', (size) => {
  if (!resized) resize(size) // Necessary to hide scrollbars
  else socket.emit('resize', size)
})

// Handles screen resizing
term.fit()
socket.emit('resize', {cols: term.cols, rows: term.rows})

window.addEventListener('resize', (data) => {
  setTimeout(() => {
    term.fit()
  }, 250)
})
