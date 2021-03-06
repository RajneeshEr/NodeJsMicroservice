const fastify = require('./app')
const mongoose = require('mongoose')
const db_url = 'mongodb://localhost/nodejsmicro'
const db_url_cluster='mongodb+srv://rajneesh:rajneesh@rajneesh-xjjlw.gcp.mongodb.net/transactiondb?retryWrites=true&w=majority'

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
                reject(fastify.log.error('Unable to connect with database...! '+ error))
            }else{
                resolve(fastify.log.info('Connected to dataBase successfully...!'))
            }
        }).catch((error)=>{
            console.log(error)
        })
})}

module.exports = mongoosedb
