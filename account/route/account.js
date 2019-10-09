const fastify = require('../app')
const postHandler = require('../service/accountService')
const debitHandler = require('../service/accountDebitService')
const creditHandler = require ('../service/accountCreditService')

const path_save = '/account/save'
const path_debitBalance = '/account/debit'
const path_creditBalance = '/account/credit'

module.exports = async()=> {
    fastify.post(path_save, postHandler.insert)
    fastify.post(path_debitBalance, debitHandler.debit)
    fastify.post(path_creditBalance, creditHandler.credit)
}