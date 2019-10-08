const fastify = require('../app')
const CustomerModel = require('../model/customerModel')
const bodyparser = require('body-parser')
const msg = require('../config/constact')

exports.insert = async (request, respons)=> {
    new Promise((resolve, reject)=>{
    CustomerModel.create(request.body)
    .then((result)=>{
        if(result != null){
            resolve(respons.status(201).send({
                msg : msg.SAVE,
                Object : result
            }))
            fastify.log.info(msg.SAVE)
        }else{
            reject(respons.status(200).send({
                msg : msg.NOT_SAVE,
                Object : result
            }))
            fastify.log.info(msg.NOT_SAVE)
        }
    }).catch((error)=>{
        resolve(respons.status(200).send({
            msg : msg.NOT_SAVE,
            Object : error
        }))
        fastify.log.info(msg.NOT_SAVE + error)
    })
    })    
}

exports.findAll = async (request, respons)=> {
    new Promise((resolve, reject)=>{
        CustomerModel.find().then((result) => {
            if(result !=null){
                resolve(respons.status(200).send({
                    msg : msg.FIND,
                    Object : result
                }))
                fastify.log.info('Data find successfully...')
            }else{
                resolve(respons.status(404).send({
                    msg : msg.NOT_FIND,
                    Object : result
                }))
                fastify.log.info(msg.NOT_FIND)
            }
        }).catch((error)=> {
            resolve(respons.status(404).send({
                msg : msg.NOT_FIND,
                Object : error
            }))
            fastify.log.info(msg.NOT_FIND)
        })
    })
}

// exports.findById = async (request, respons)=>{
//     const query = request.query.phoneNumber
//     console.log(query)
//     new Promise((resolve, reject)=>{
//         CustomerModel.findOne(
//             {
//                 phoneNumber : query
//             },
//             (error, result)=>{
//                 console.log(result)
//                 if(result != null){
//                     resolve(respons.status(200).send({
//                         msg : 'data find successfully for Id ' + query,
//                         Object : result
//                     }))
//                     fastify.log.info('data find successfully for Id ' + query)
//                 }else{
//                     reject(respons.status(404).send({
//                         msg : 'data not find successfully for Id ' + query,
//                     }))
//                     fastify.log.error(error)
//                 }
//             }
//         )
//     })
// }

exports.findByPhoneNumber = async (request, respons)=>{
    const query = request.query.phoneNumber
    console.log(query)
    // new Promise((resolve, reject)=>{
        CustomerModel.findOne(
            {
                phoneNumber : query
            },
            (error, result)=>{
                console.log(result)
                if(result != null){
                    respons.status(200).send({
                        msg : 'data find successfully for Id ' + query,
                        Object : result
                    })
                    fastify.log.info('data find successfully for Id ' + query)
                }else{
                    respons.status(404).send({
                        msg : 'data not find successfully for Id ' + query,
                    })
                    fastify.log.error(error)
                }
            }
        )
    //})
}

// await CustomerModel.findOne({
//     phoneNumber : query
// },(error, result)=>{
//     if(!result){
//         respons.status(404).send({
//             msg : 'data not find successfully for Id ' + query,
//         })
//         fastify.log.error(error)
//     }
//     respons.status(200).send({
//         msg : 'data find successfully for Id ' + query,
//         Object : result
//     })
//     fastify.log.info('data find successfully for Id ' + query)
// })