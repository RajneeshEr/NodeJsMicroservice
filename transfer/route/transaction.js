const fastify = require('../app')
const getHandler = require('../service/transaction')
const path_save = 'transaction/save'
const path_widthdraw = 'transaction/withdrawal'

module.exports = async ()=>{
    fastify.post(path_save, getHandler.insert)
    fastify.post(path_widthdraw, getHandler.widthdrawal)
}