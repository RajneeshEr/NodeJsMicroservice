const fastify = require('../app')
const getHandler = require('../service/accountService')
const path_getAll = '/account/getall'
const path_getByPhoneNumber = '/account/getbycustId:custId'
const path_getByCustIdAndAccType = '/account/getbycustIdAndtype:custId&:type'


module.exports = async ()=> {
    fastify.get(path_getAll, getHandler.findAll)
    fastify.get(path_getByPhoneNumber, getHandler.findByCustId)
    fastify.post(path_getByCustIdAndAccType, getHandler.findByCustIdAndAccType)
}
