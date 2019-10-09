const fastify = require('./app')
const mongoose = require('mongoose')
const db_url = 'mongodb://127.0.0.1:27017/nodejsmicro'
const db_url_cluster='mongodb+srv://rajneesh:rajneesh@rajneesh-xjjlw.gcp.mongodb.net/customerdb?retryWrites=true&w=majority'

const mongoosedb = async () =>{
     mongoose.connect(
            db_url,
            {
              useNewUrlParser: true,
              useUnifiedTopology: true,
              useCreateIndex: true,
              useFindAndModify: false
            }).then(() => fastify.log.info("Conected to database successfully....!"))
               .catch((error) => fastify.log.info(error)) 
    
}

module.exports = mongoosedb
