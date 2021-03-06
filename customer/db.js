const fastify = require('./app')
const mongoose = require('mongoose')
const db_url = 'mongodb://localhost/nodejsmicro'
const db_url_cluster='mongodb+srv://rajneesh:rajneesh@rajneesh-xjjlw.gcp.mongodb.net/customerdb?retryWrites=true&w=majority'

const mongoosedb = async () =>{
    mongoose.connect(
    db_url,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    (error)=>{
        new Promise((resolve, reject)=>{
            if(error){
                reject(fastify.log.error('Unable to connect with database...! '))
            }else{
                resolve(fastify.log.info('Connected to dataBase successfully...!'))
            }
        }).catch((error)=>{
            fastify.log.error(error)
        })
})}

module.exports = mongoosedb
