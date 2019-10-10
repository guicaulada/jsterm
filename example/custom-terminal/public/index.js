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

const fitAddon = new FitAddon.FitAddon()
const term = new Terminal({
  allowTransparency: true,
  rightClickSelectsWord: false,
  cursorBlink: true,
  scrollback: 10000,
  fontFamily: 'Meslo LG M for Powerline', // You will need Powerline to use this font
  fontSize: 12
})

term.loadAddon(fitAddon)

term.open(document.getElementById('terminal'))

term.onData((data) => {
  socket.emit('write', data)
})

socket.on('write', (data) => {
  term.write(data, () => console.log(data))
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

term.onResize((size) => {
  if (!resized) resize(size) // Necessary to hide scrollbars
  else socket.emit('resize', size)
})

// Handles screen resizing
fitAddon.fit()
socket.emit('resize', {cols: term.cols, rows: term.rows})

window.addEventListener('resize', (data) => {
  setTimeout(() => {
    fitAddon.fit()
  }, 250)
})

setTimeout(() => { // https://apod.nasa.gov/apod/archivepix.html
  $.getJSON('https://api.nasa.gov/planetary/apod?api_key=' + data.nasa_apik, (json) => {
    console.log(json)
    $('.xterm-viewport').css('background-image', `url(${json.hdurl})`);
    $('.xterm-viewport').css('opacity', 0.5);
    $('.xterm-viewport').css('background-repeat', 'no-repeat');
    $('.xterm-viewport').css('background-position', 'center center');
    $('body').append(`<div id="nasa_image" style="visibility: hidden !important;"><p>${json.title}</p><p>${json.explanation}</p></div>`)
  })
}, 1000)
