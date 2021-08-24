const fastify = require('fastify')({ logger: true })

// Declare a route
fastify.get('/', async (req, reply) => {
  return { hello: 'world' }
})

module.exports = fastify.routing
