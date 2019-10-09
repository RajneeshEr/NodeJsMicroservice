const fastify = require('../app')
const getHandler = require('../services/customerservice')
const path_getAll = '/customer/getall'
const path_getByPhoneNumber = '/customer/getbyPhoneNumber:phoneNumber'
const path_getByCustomerId = '/customer/getbyId:custId'

module.exports = async ()=> {
    fastify.get(path_getAll, getHandler.findAll)
    fastify.get(path_getByPhoneNumber, getHandler.findByPhoneNumber)
    fastify.get(path_getByCustomerId, getHandler.findById)
}
