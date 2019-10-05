const fastify = require('../app')
const postHandler = require('../service/accountService')
const postHandlerDebit = require('../service/accountDebitService')
const path_save = '/account/save'
const path_updateBalance = '/account/widthdrawal'

module.exports = async()=> {
    fastify.post(path_save, postHandler.insert)
    fastify.post(path_updateBalance, postHandlerDebit.debit)
}