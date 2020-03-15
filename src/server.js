/**
 * Module dependencies.
 */

var app = require('./app')
var debug = require('debug')('szertar:server')
var http = require('http')

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || 8000)
app.set('port', port)

/**
 * Create HTTP server.
 */

var server = http.createServer(app)

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port)
server.on('listening', onListening)

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10)

  if (isNaN(port)) {
    // named pipe
    return val
  }

  if (port >= 0) {
    // port number
    return port
  }

  return false
}

/**
 * Event listener for HTTP server 'listening' event.
 */

function onListening() {
  var addr = server.address()
  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port
  debug('Listening on ' + bind)
  console.log(
    '✔ Express server listening on port %d in %s mode',
    app.get('port'),
    app.get('env')
  )
}
