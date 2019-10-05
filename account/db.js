const fastify = require('./app')
const mongoose = require('mongoose')
const db_url = 'mongodb://localhost/nodejsmicro'
const db_url_cluster='mongodb+srv://rajneesh:rajneesh@rajneesh-xjjlw.gcp.mongodb.net/accountdb?retryWrites=true&w=majority'

const mongoosedb = async () =>{
    mongoose.connect(
    db_url_cluster,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify : false
    },
    (error)=>{
        new Promise((resolve, reject)=>{
            if(error){
                reject(fastify.log.error('Unable to connect with database...! '+ error))
            }
            resolve(fastify.log.info('Connected to dataBase successfully...!'))
        }).catch((error)=>{
            console.log(error)
        })
})}

module.exports = mongoosedb
