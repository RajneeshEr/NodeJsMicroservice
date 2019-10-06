const fastify = require('../app')
const CustomerModel = require('../model/customerModel')
const bodyparser = require('body-parser')

exports.insert = async (request, respons)=> {
    CustomerModel.create(request.body)
    .then((result)=>{
        respons.status(201).send({
            msg : 'Data save successfully...',
            Object : result
        })
        fastify.log.info('Data save successfully...')
    }).catch((error)=>{
        fastify.log.error(error)
    })
}

exports.findAll = async (request, respons)=> {
    CustomerModel.find().then((result) => {
        respons.status(200).send({
            msg : 'Data find successfully...',
            Object : result
        })
        fastify.log.info('Data find successfully...')
    }).catch((error)=> {
        respons.status(404).send({
            msg : 'Data does not find successfully...',
        })
        fastify.log.error(error)
    })
}

exports.findById = async (request, respons)=>{
    const query = request.query.phoneNumber
    await CustomerModel.findOne({
        phoneNumber : query
    },(error, result)=>{
        if(!result){
            respons.status(404).send({
                msg : 'data not find successfully for Id ' + query,
            })
            fastify.log.error(error)
        }
        respons.status(200).send({
            msg : 'data find successfully for Id ' + query,
            Object : result
        })
        fastify.log.info('data find successfully for Id ' + query)
    })
}