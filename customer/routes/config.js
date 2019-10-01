const fastify = require('../app')
const getHandler = require('../services/customerservice')
const path_getAll = '/customer/getall'
const path_getByPhoneNumber = '/customer/getbyId:phoneNumber'

module.exports = async ()=> {
    fastify.get(path_getAll, getHandler.findAll)
    fastify.get(path_getByPhoneNumber, getHandler.findById)
}
