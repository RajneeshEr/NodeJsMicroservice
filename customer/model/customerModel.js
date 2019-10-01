const mongoose = require('mongoose')
const fastify = require('../app')

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const customerSchema = new Schema({
    firstName : String,
    lastName : String,
    phoneNumber : String,
    email: String,
    age : String
})

// This is also kind of middleware before save want's to perform some action
customerSchema.pre('create', (next)=>{
    //TODO
    fastify.log.info('Do some validation on customer validation...')
})

const customer = mongoose.model('customer' , customerSchema)

module.exports=customer