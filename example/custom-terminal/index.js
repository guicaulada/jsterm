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

const path = require('path')
const express = require('express')
const Terminal = require('jsterm')

const allow = [
    'localhost',
    '127.0.0.1',
    '0.0.0.0'
]

let term = new Terminal(1337)

term.app.use('/*', (req, res, next) => {
  let ip = req.ip.split(':').slice(-1)[0]
  if (allow.includes(ip)) {
      next()
  } else {
      res.end()
  }
})

term.app.use(express.static(path.join(__dirname, 'public')))

term.add('cmd.exe')
term.add('bash.exe')
term.add('node.exe')

term.listen()

console.log('Terminal listening on localhost:1337')