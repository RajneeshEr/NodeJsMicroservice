const fastify = require('../app')
const getHandler = require('../service/accountService')
const path_getAll = '/account/getall'
const path_getByPhoneNumber = '/account/getbyCustId:custId'
const path_getByCustIdAndAccType = '/account/getbycustIdAndtype:custId&:type'
const path_getByAccountNumber = '/account/getbyAccountNumber:accNumber'

module.exports = async ()=> {
    fastify.get(path_getAll, getHandler.findAll)
    fastify.get(path_getByPhoneNumber, getHandler.findByCustId)
    fastify.get(path_getByCustIdAndAccType, getHandler.findByCustIdAndAccType)
    fastify.get(path_getByAccountNumber, getHandler.findByAccountNumber)
}
