const Transaction = require('../model/transactionModel')
const fastify = require('../app')
const msg = require('../config/constact')
const axios = require('axios')
const getCustomerhandler = require('../externalApi/customer')
 
exports.insert = async (request, response) => {
    console.log(request.body)

    const custInfo = await getCustomerhandler.CustomerApi(request, response)

    console.log('inside transaction api flag value: '+custInfo)

    Transaction.create(request.body).
    then((result)=>{
        if(!result) {
            response.send({
                msg : msg.SAVE,
                Object : result
            })
            fastify.log.info(msg.SAVE)
        }else{
            response.send({
                msg : msg.NOT_SAVE,
                Object : result
            })
            fastify.log.error(msg.NOT_SAVE)
        }
    }).catch((error)=>{
        response.status(500).send({
            msg : msg.NOT_SAVE,
            Object : error
        })
        fastify.log.error(error)
    })
}

