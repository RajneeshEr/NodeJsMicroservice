const mongoose = require('mongoose')
const fastify = require('../app')

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const accountSchema = new Schema({
    type : {
        type: String,
        lowercase: true // Always convert `test` to lowercase
    },
    accNumber : {
        type: String,
        unique: [true,'account number must be unique...']
    },
    balance : {
        type: Number
    },
    custId: {
        type: ObjectId
    },
})

// This is also kind of hooks before save want's to perform some action
// accountSchema.pre('save', (next)=>{
//     console.log('valuve inside next : '+next)
//     //TODO
//     fastify.log.info('Do some data validation on account model...')
// })

const account = mongoose.model('account' , accountSchema)

module.exports=account