// This is configuration file which is responsible for creating fastify instance

const fastify = require('fastify')({
    logger: true,
    ignoreTrailingSlash: true // string used to determine how to handle passing / as a route with a prefix.
})

module.exports=fastify