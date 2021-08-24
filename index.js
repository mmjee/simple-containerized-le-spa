const Server = require('./server')

// require("greenlock-express")
require('@root/greenlock-express')
  .init({
    packageRoot: __dirname,
    configDir: './greenlock.d',

    cluster: false
  })
  .ready(httpsWorker)

function httpsWorker (glx) {
  //
  // HTTP2 would have been the default httpsServer for node v12+
  // However... https://github.com/expressjs/express/issues/3388
  //

  // Get the raw http2 server:
  const tlsOptions = null
  const http2Server = glx.http2Server(tlsOptions, Server._core._dispatch)

  http2Server.listen(443, '::', function () {
    console.info('Listening on ', http2Server.address())
  })

  // Note:
  // You must ALSO listen on port 80 for ACME HTTP-01 Challenges
  // (the ACME and http->https middleware are loaded by glx.httpServer)
  const httpServer = glx.httpServer()

  httpServer.listen(80, '::', function () {
    console.info('Listening on ', httpServer.address())
  })
}
