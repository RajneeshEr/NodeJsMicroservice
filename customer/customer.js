const fastify = require('./app')
const bodyparser = require('body-parser')
const path_save = '/customer/save'
//const mongoose = require('./db')
const Customer = require('./model/customerModel')

const postHandler = async (request, response)=>{
    new Promise((resolve, reject)=>{
        Customer.create({
            firstName: request.body.firstName,
            lastName: request.body.lastName,
            phoneNumber: request.body.phoneNumber,
            age: request.body.age
        },(error, customer)=>{
            if(error){
                reject(fastify.log.error('Unable to save the data...'))
            }else{
                resolve(
                    response.send({
                        statusCode: 200,
                        msg: 'Data save successfully...',
                        object: customer
                }))
            }  
        })
    })
}

const customerPostApi = async (fastify,options)=>{
    // await can ‘wait’ for a async function to resolve or reject a value
    //Important! await can only be used inside an async function.
    await fastify.post(path_save,options,postHandler)

}

module.exports = customerPostApi;