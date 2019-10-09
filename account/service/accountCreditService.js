const fastify = require('../app')
const msg = require('../config/constact')
const AccountModel = require('../model/accountModel')
const balance = require('./findAccountBalance')


exports.credit = async (request, response)=> {
    let accountbalance
    try {
        accountbalance = await balance.findAccoutDetails(request, response)
    } catch (error) {
        response.status(500).send({
            error : msg.NOT_FIND_ACC
        })
        fastify.log.info(msg.NOT_FIND_ACC)
    }
    
    if(accountbalance ==0 || accountbalance == null || accountbalance == undefined){
        response.status(500).send({
            error : msg.NOT_FIND_ACC
        })
        fastify.log.info(msg.NOT_FIND_ACC)
    }

    var updateBalance = await calculatebalance(accountbalance.balance, request.body.balance)
    fastify.log.info('Updated balance calcuated : '+updateBalance)

    if(updateBalance!=NaN || updateBalance!=undefined){
        await AccountModel.findOneAndUpdate({
            accNumber : request.body.accNumber
        },{
            balance : updateBalance
        },(error, result)=>{
            new Promise((resolve, reject)=>{
                if(error !== null){
                    reject(response.status(500).send({
                        error : error.message
                    }))
                    fastify.log.info(msg.NOT_ACC_UPDATE + error)
                }
                else if(result !== null){
                    resolve(response.status(200).send({
                        msg : msg.ACC_UPDATE,
                        amount : updateBalance,
                        flag : true
                    }))
                    fastify.log.info(msg.ACC_UPDATE + result.balance)
                }else{
                    reject(response.status(500).send({
                        msg : msg.NOT_ACC_UPDATE,
                        flag : false,
                    }))
                    fastify.log.info(msg.NOT_ACC_UPDATE)
                }
            })
        })
    }else{
        response.status(500).send({
            msg : msg.NOT_ACC_UPDATE,
            flag : false
        })
    }
}

async function calculatebalance(num1, num2){
    return num1+num2    
}
