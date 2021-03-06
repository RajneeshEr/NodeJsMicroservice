const fastify = require('./app')
var port = process.env.PORT || 3003;
var User = require('./model/user');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('./config/secret');

//Register/plugin is very important core api of fastify framework 
fastify.register(require('./db'))
fastify.register(require('./route/transaction'))
// fastify.register(require('./routes/customer'))

fastify.listen(port, async (error, address) => {
    if(error){
        fastify.log.error(error)
        process.exit(1)
    }
    fastify.log.info(`The server started on ${address}`)
})