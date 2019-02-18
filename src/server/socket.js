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

const io = require('socket.io')

class ExtendableProxy {
  constructor(getset = {}) {
    return new Proxy(this, getset);
  }
}
class Socket extends ExtendableProxy {
  constructor(server) {
    super({
      get: (socket, method) => {
        if (method === 'clients' || method === 'io') return socket[method]
        else return socket.io[method]
      }
    })
    let self = this
    self.io = io(server)
    self.clients = new Set()
    self.on('connection', (client) => {
      self.clients.add(client)

      client.on('disconnect', () => {
        client.disconnect(true)
        self.clients.delete(client)
      })

      client.on('finished', () => {
        client.end()
      })
    })
  }
}

module.exports = Socket