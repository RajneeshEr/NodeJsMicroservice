const mongoose = require('mongoose')
const fastify = require('../app')

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const customerSchema = new Schema({
    firstName : String,
    lastName : String,
    phoneNumber : {
        type : String,
        unique : true
    },
    email: {
        type : String,
        unique : true
    },
    age : String
})

// This is also kind of middleware before save want's to perform some action
// customerSchema.pre('save', (next)=>{
//     //TODO
//     fastify.log.info('Do some validation on customer validation...')
// })

const customer = mongoose.model('customer' , customerSchema)

module.exports=customer