const fastify = require('./app')
var port = process.env.PORT || 3000;

//Registering DB, Routes
fastify.register(require('./db'))
fastify.register(require('./routes/config'))
fastify.register(require('./routes/customer'))
fastify.register(require('./routes/gateway'))

fastify.listen(port, async (error, address) => {
    if(error){
        fastify.log.error(error)
        process.exit(1)
    }
    fastify.log.info(`The server started on ${address}`)
})