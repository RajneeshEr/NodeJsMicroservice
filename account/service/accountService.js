const fastify = require('../app')
const AccountModel = require('../model/accountModel')
const bodyparser = require('body-parser')
const msg = require('../config/constact')

exports.insert = async (request, respons)=> {
    await AccountModel.create(request.body)
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
    await AccountModel.find().then((result) => {
        if(result !==null){
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
    await AccountModel.findOne({
        custId : query
    },(error, result)=>{
        if(result == null){
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
    await AccountModel.findOne({
        custId : query1,
        type : query2
    },(error, result)=>{
        if(error !== null){
            respons.status(404).send({
                msg : 'data not find successfully...',
            })
            fastify.log.error(error)
        }
        else if(result == null){
            respons.status(404).send({
                msg : 'data not find successfully...',
            })
            fastify.log.error(error)
        }else{
            respons.status(200).send({
                msg : 'data find successfully...',
                Object : result
            })
            fastify.log.info('data find successfully...')
        }
    })
}

exports.findByAccountNumber = async (request, respons)=>{
    const query = request.query.accNumber
    if(query !== null || query!== undefined){
        return new Promise((resolve, reject)=>{
            AccountModel.findOne(
                {accNumber : query},
                (error, result)=>{
                    if(error !=null){
                        reject(respons.status(500).send({
                            error : error.message
                        }))
                        fastify.log.error(error)
                    }
                    else if(result != null){
                        resolve(respons.status(200).send({
                            msg : 'data find successfully for this account number : ' + query,
                            Object : result
                        }))
                        fastify.log.info('data find successfully for this account number : ' + query)
                    }else{
                        reject(respons.status(500).send({
                            error : 'Data not fond for this account number : ' + query
                        }))
                        fastify.log.error('Data not fond for this account number : ' + query)
                    }
                }
            )
        })
    }else{
        respons.status(500).send({
            error : 'Data not fond for this account number : ' + query
        })
        fastify.log.error('Data not fond for this account number : ' + query)
    }
}
