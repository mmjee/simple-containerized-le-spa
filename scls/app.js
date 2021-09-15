const fs = require('fs')
const fastifyStatic = require('fastify-static')

module.exports = async (fastify) => {
  fastify.register(fastifyStatic, {
    root: '/app/frontend'
  })
  fastify.setNotFoundHandler((req, reply) => {
    const stream = fs.createReadStream('/app/frontend/index.html', 'utf8')
    reply.code(200).type('text/html').send(stream)
  })
}
