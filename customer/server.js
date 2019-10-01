const fastify = require('./app')
var port = process.env.PORT || 3000;
//const mongoose = fastify.register(require('./db'))
const mongoose = require('./db')

//Register/plugin is very important core api of fastify framework 
fastify.register(require('./customer.js'))

fastify.listen(port, async (error, address) => {
    if(error){
        fastify.log.error(error)
        process.exit(1)
    }
    fastify.log.info(`The server started on ${address}`)
})