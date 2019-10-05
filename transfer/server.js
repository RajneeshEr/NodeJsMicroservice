const fastify = require('./app')
var port = process.env.PORT || 3003;

//Register/plugin is very important core api of fastify framework 
fastify.register(require('./db'))
// fastify.register(require('./routes/config'))
// fastify.register(require('./routes/customer'))

fastify.listen(port, async (error, address) => {
    if(error){
        fastify.log.error(error)
        process.exit(1)
    }
    fastify.log.info(`The server started on ${address}`)
})