const Fastify = require('fastify')
const addRoutes = require('./app')

// require("greenlock-express")
require('@root/greenlock-express')
  .init({
    packageRoot: __dirname,
    configDir: './greenlock.d',

    cluster: false
  })
  .ready(httpsWorker)

// One of the worst and the unholiest marriages of all time
// This is so bad that I cried for 24 hours straight after I witnessed this crime happen
function httpsWorker (glx) {
  const fastify = ({
    logger: true,
    serverFactory (handler) {
      const tlsOptions = null
      return glx.http2Server(tlsOptions, handler)
    }
  })

  fastify.listen(443)

  // Listening to 80 to solve HTTP-01 challenges and redirecting clueless people to HTTPS
  const httpServer = glx.httpServer()

  httpServer.listen(80, '::', function () {
    console.info('Listening on ', httpServer.address())
  })
}
