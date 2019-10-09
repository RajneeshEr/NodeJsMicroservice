const fastify = require('../app')
const CustomerModel = require('../model/customerModel')
const bodyparser = require('body-parser')
const msg = require('../config/constact')

exports.insert = async (request, respons)=> {
    return new Promise((resolve, reject)=>{
        CustomerModel.create(request.body)
        .then((result)=>{
            if(result != null){
                resolve(respons.status(201).send({
                    msg : msg.SAVE,
                    Object : result
                }))
                fastify.log.info(msg.SAVE)
            }else{
                reject(respons.status(500).send({
                    msg : msg.NOT_SAVE,
                    Object : result
                }))
                fastify.log.info(msg.NOT_SAVE)
            }
        }).catch((error)=>{
                resolve(respons.status(500).send({
                    msg : msg.NOT_SAVE,
                    error : error.message
                }))
                fastify.log.info(msg.NOT_SAVE + error.message)
        }) 
    })    
}

exports.findAll = async (request, respons)=> {
    return new Promise((resolve, reject)=>{
        CustomerModel.find().then((result) => {
            if(result !=null){
                resolve(respons.status(200).send({
                    msg : msg.FIND,
                    Object : result
                }))
                fastify.log.info(msg.FIND)
            }else{
                resolve(respons.status(500).send({
                    msg : msg.NOT_FIND,
                    Object : result
                }))
                fastify.log.info(msg.NOT_FIND)
            }
        }).catch((error)=> {
            reject(respons.status(500).send({
                msg : msg.NOT_FIND,
                error : error.message
            }))
            fastify.log.info(msg.NOT_FIND)
        })
    })
}

exports.findById = async (request, respons)=>{
    const query = request.query.custID
    console.log(JSON.stringify(query))
    if(query !== null || query !== undefined){
        return new Promise((resolve, reject)=>{
            CustomerModel.findOne(
                { _id : query},
                (error, result)=>{
                    if(error !=null){
                        reject(respons.status(500).send({
                            error : error.message
                        }))
                        fastify.log.error(error)
                    }
                    else if(result != null){
                        resolve(respons.status(200).send({
                            msg : `data find successfully...`,
                            Object : result
                        }))
                        fastify.log.info('data find successfully...')
                    }else{
                        reject(respons.status(500).send({
                            msg : 'data not find successfully...',
                        }))
                        fastify.log.error(error)
                    }
                }
            )
        })
    }else{
        respons.status(500).send({
            error : 'Data not fond for this Id : ' + query
        })
        fastify.log.error('Data not fond for this Id : ' + query)
    }
}

exports.findByPhoneNumber = async (request, respons)=>{
    const query = request.query.phoneNumber
    if(query !== null || query!== undefined){
        return new Promise((resolve, reject)=>{
            CustomerModel.findOne(
                {phoneNumber : query},
                (error, result)=>{
                    if(error !=null){
                        reject(respons.status(500).send({
                            error : error.message
                        }))
                        fastify.log.error(error)
                    }
                    else if(result != null){
                        resolve(respons.status(200).send({
                            msg : 'data find successfully for Id ' + query,
                            Object : result
                        }))
                        fastify.log.info('data find successfully for Id ' + query)
                    }else{
                        reject(respons.status(500).send({
                            error : 'Data not fond for this phoneNumber : ' + query
                        }))
                        fastify.log.error('Data not fond for this phoneNumber : ' + query)
                    }
                }
            )
        })
    }else{
        respons.status(500).send({
            error : 'Data not fond for this phoneNumber : ' + query
        })
        fastify.log.error('Data not fond for this phoneNumber : ' + query)
    }
}
