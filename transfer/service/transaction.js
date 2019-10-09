const Transaction = require('../model/transactionModel')
const fastify = require('../app')
const msg = require('../config/constact')
const axios = require('axios')
const getCustomerhandler = require('../externalApi/customer')
 
exports.insert = async (request, response) => {
    console.log(request.body)

    // const custInfo = await getCustomerhandler.findCustomerInfo(request, response)
    // console.log('inside transaction api flag value: '+custInfo)

    new Promise((resolve, reject)=>{
        Transaction.create(request.body)
        .then((result)=>{
            if(result !=null) {
                resolve(response.status(200).send({
                    msg : msg.SAVE,
                    Object : result
                }))
                fastify.log.info(msg.SAVE)
            }else{
                resolve(response.status(500).send({
                    msg : msg.NOT_SAVE,
                    Object : result
                }))
                fastify.log.error(msg.NOT_SAVE)
            }
        }).catch((error)=>{
            resolve(response.status(500).send({
                msg : error.message
            }))
            fastify.log.error(error)
        })
    })
}

exports.getAllTransaction = async (request, response)=>{
    new Promise((resolve, reject)=>{
        Transaction.find().then((result) => {
            if(result !=null){
                resolve(response.status(200).send({
                    msg : msg.FIND,
                    Object : result
                }))
                fastify.log.info(msg.FIND)
            }else{
                resolve(response.status(404).send({
                    msg : msg.NOT_FIND,
                    Object : result
                }))
                fastify.log.info(msg.NOT_FIND)
            }
        }).catch((error)=> {
            resolve(response.status(500).send({
                error : error.message
            }))
            fastify.log.info(msg.NOT_FIND)
        })
    })
}
