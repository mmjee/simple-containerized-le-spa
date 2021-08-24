const Hapi = require('@hapi/hapi')

const server = Hapi.server({ load: { sampleInterval: 1000 }, autoListen: false })

server.route({
  method: 'GET',
  path: '/',
  handler: (request, h) => {
    return 'Hello World!'
  }
})

module.exports = server
