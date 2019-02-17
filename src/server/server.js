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

const Socket = require('./socket.js')
const express = require('express')
const http = require('http')

class Server {
  constructor() {
    this.app = express()
    this.server = http.createServer(this.app)
    this.socket = new Socket(this.server)
  }

  use(path) {
    return this.app.use(express.static(path))
  }

  get(path, func) {
    return this.app.get(path, func)
  }

  set(setting, val) {
    return this.app.set(setting, val)
  }

  listen(port) {
    return this.server.listen(port)
  }

  on(event, func) {
    return this.socket.io.on(event, func)
  }

  delete(event) {
    return this.socket.delete(event)
  }
}

module.exports = Server