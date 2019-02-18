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

const os = require('os')
const path = require('path')
const spawn = require('node-pty').spawn
const Server = require('./server')

class Terminal {
  constructor(port) {
    let self = this
    self.port = port
    self.server = new Server()
    self.server.set('view engine', 'ejs')
    self.server.on('connection', (client) => {
      client.on('spawn', (shll) => {
        if (!shll) shll = os.platform() === 'win32' ? 'powershell.exe' : 'bash'
        let term = spawn(shll, [], { cwd: os.homedir(), env: process.env })

        term.on('data', (data) => {
          client.emit('write', data.toString('utf8'))
        })

        client.on('write', (data) => {
          term.write(data)
        })

        client.on('resize', (data) => {
          term.resize(data.cols, data.rows)
        })

        client.on('disconnect', (data) => {
          term.kill()
        })
      })
    })
    self.server.get('/', (req, res) => {
      self.render(res)
    })
  }

  render(res, shell='') {
    res.render(path.join(__dirname, 'public', 'index.ejs'), {shell: shell, port: this.port})
  }

  add(shell) {
    let self = this
    self.server.get('/'+shell, (req, res) => {
      self.render(res, shell)
    })
  }

  use(location) {
    this.location = location
    this.server.use(location)
  }

  listen() {
    if (!this.location) this.server.use(path.join(__dirname, 'public'))
    return this.server.listen(this.port)
  }
}

module.exports = Terminal
