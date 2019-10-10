const fastify = require('./app')
var port =  process.env.PORT || 3001;
var host =  process.env.YOUR_HOST || '0.0.0.0';

//Register/plugin is very important core api of fastify framework 
fastify.register(require('./db'))
fastify.register(require('./route/account'))
fastify.register(require('./route/accountConfig'))

fastify.listen(port,host, async (error, address) => {
    if(error){
        fastify.log.error(error)
        process.exit(1)
    }
    fastify.log.info(`The server started on ${address}`)
})