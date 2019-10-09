const mongoose = require('mongoose')
const fastify = require('../app')

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const trasactionSchema = new Schema({
    id: ObjectId,
    fromAccount : String,
    toAccount : String,
    balance : Number,
    //status : String
})

// This is also kind of middleware before save want's to perform some action
// accountSchema.pre('save', (next)=>{
//     console.log('valuve inside next : '+next)
//     //TODO
//     fastify.log.info('Do some data validation on account model...')
// })

const trasaction = mongoose.model('trasaction' , trasactionSchema)

module.exports=trasaction