const fastify = require('../app')
const AccountModel = require('../model/accountModel')

exports.findAccoutDetails = async (request, response)=>{
    return new Promise((resolve, reject)=>{
        AccountModel.findOne({
            accNumber : request.body.accNumber
        },'balance', (error, result)=>{
            if(result != null){
                resolve(result)
            }else{
                reject(result)
            }
        })
    })
}