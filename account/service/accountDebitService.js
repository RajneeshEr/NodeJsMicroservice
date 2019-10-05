const fastify = require('../app')
const msg = require('../config/constact')
const AccountModel = require('../model/accountModel')


exports.debit = async (request, response)=> {
    const accountbalance = await AccountModel.findOne({
        accNumber : request.body.accNumber
    },'balance', (error, result)=>{
        return result
    })

    var updateBalance = await calculatebalance(accountbalance.balance, request.body.balance)
    fastify.log.info('Updated balance calcuated : '+updateBalance)

    if(updateBalance!=NaN || updateBalance!=undefined){
        await AccountModel.findOneAndUpdate({
            accNumber : request.body.accNumber
        },{
            balance : updateBalance
        },(error, result)=>{
            new Promise((resolve, reject)=>{
                if(!error){
                    resolve(response.status(200).send({
                        msg : msg.UPDATE,
                        amount : updateBalance
                    }))
                    fastify.log.info('New balance updated in database : '+result.balance)
                }else{
                    reject(response.status(200).send({
                        msg : msg.NOT_UPDATE,
                        Object : error
                    }))
                    fastify.log.info('New balance not updated in database')
                }
            })
        })
    }else{
        response.status(204).send({
            msg : msg.NOT_UPDATE,
        })
    }
}

async function calculatebalance(num1, num2){
    if(num1 > num2){
        return num1-num2
    }else{
        return NaN
    }
}
