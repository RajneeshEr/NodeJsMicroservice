const Transaction = require('../model/transactionModel')
const fastify = require('../app')
const msg = require('../config/constact')
const thirdParty_customerapi = require('../externalApi/customer')
const thirdParty_accountapi = require('../externalApi/account')

exports.insert = async (request, response) => {

    //check the status first of 3rd party api and after check flag of debit and credit api
    //if status 200 and flag is true then system allow to do transaction
    // create a promise for final response

    const fromAccount = request.body.fromAccount
    const toAccount = request.body.toAccount
    const newbalance = request.body.balance

    let debitflag 
    try {
        debitflag = await thirdParty_accountapi.debitAccount(fromAccount, newbalance)
    } catch (error) {
        fastify.log.error('inside debit flag transaction not completed...')
        response.status(500).send({
            msg : msg.FAIL_TRANSACTION,
        })
    }
    let creditflag 
    try {
        creditflag = await thirdParty_accountapi.creditAccount(toAccount, newbalance)
    } catch (error) {
        fastify.log.error('inside credit flag transaction not completed...')
        response.status(500).send({
            msg : msg.FAIL_TRANSACTION,
        })
    }
    return new Promise((resolve, reject)=>{
        if(debitflag.status == 200 && debitflag.data.flag == true){
            if(creditflag.status == 200 && debitflag.data.flag == true){
                Transaction.create(request.body)
                .then((result)=>{
                    if(result !=null) {
                        resolve(response.status(200).send({
                            msg : msg.SUCCESS_TRANSACTION,
                            Object : result
                        }))
                        fastify.log.info(msg.SUCCESS_TRANSACTION)
                    }else{
                        reject(response.status(500).send({
                            msg : msg.FAIL_TRANSACTION,
                        }))
                        fastify.log.error(msg.FAIL_TRANSACTION)
                    }
                }).catch((error)=>{
                    fastify.log.error(msg.FAIL_TRANSACTION)
                    reject(response.status(500).send({
                        msg : error.message
                    }))
                    fastify.log.error(error)
                })
            }else{
                fastify.log.error('credit details not correct, transaction can not be completed...')
                reject(response.status(500).send({
                    msg : msg.FAIL_TRANSACTION
                }))
            }
        }else{
            fastify.log.error('debit details not correct, transaction can not be completed...')
            reject(response.status(500).send({
                msg : msg.FAIL_TRANSACTION
            }))
        }
    })
}

exports.getAllTransaction = async (request, response)=>{
    return new Promise((resolve, reject)=>{
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
            reject(response.status(500).send({
                error : error.message
            }))
            fastify.log.info(msg.NOT_FIND)
        })
    })
}
