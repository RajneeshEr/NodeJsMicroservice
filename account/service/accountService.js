const fastify = require('../app')
const AccountModel = require('../model/accountModel')
const bodyparser = require('body-parser')
const msg = require('../config/constact')

exports.insert = async (request, respons)=> {
    AccountModel.create(request.body)
    .then((result)=>{
        if(!result){
            fastify.log.error(msg.NOT_SAVE)
        }else{
            respons.status(201).send({
            msg : msg.SAVE,
            Object : result
        })
    }
    }).catch((error)=>{
        fastify.log.error(error)
        respons.status(500).send({
            msg : error
        })
    })
}

exports.findAll = async (request, respons)=> {
    AccountModel.find().then((result) => {
        if(!result){
            respons.status(200).send({
                msg : msg.FIND,
                Object : result
            })
            fastify.log.info(msg.FIND)
        }else{
            respons.status(404).send({
                msg : msg.NOT_FIND,
                Object : result
            })
            fastify.log.info('Data does not find successfully...')
        }
    }).catch((error)=> {
        respons.status(404).send({
            msg : 'Data does not find successfully...',
        })
        fastify.log.error(error)
    })
}

exports.findByCustId = async (request, respons)=>{
    const query = request.query.custId
    AccountModel.findOne({
        custId : query
    },(error, result)=>{
        if(!result){
            respons.status(404).send({
                msg : 'data not find successfully for Id ' + query,
            })
            fastify.log.error(error)
        }else{
            respons.status(200).send({
                msg : 'data find successfully for Id ' + query,
                Object : result
            })
            fastify.log.info('data find successfully for Id ' + query)
        }
    })
}

exports.findByCustIdAndAccType = async (request, respons)=>{
    const query1 = request.query.custId
    const query2 = request.query.type
    console.log(query1+query2)
    AccountModel.findOne({
        custId : query1,
        type : query2
    },(error, result)=>{
        if(!result){
            respons.status(404).send({
                msg : 'data not find successfully for Cust Id ' + query1 + ' and for account type '+query2,
            })
            fastify.log.error(error)
        }else{
            respons.status(200).send({
                msg : 'data find successfully for Cust Id ' + query1 + ' and for account type '+query2,
                Object : result
            })
            fastify.log.info('data not find successfully for Cust Id ' + query1 + ' and for account type '+query2)
        }
    })
}