const fastify = require('../app')
const postHandler = require('../services/customerservice')
const path_save = '/customer/save'

module.exports = async()=> {
    fastify.post(path_save, postHandler.insert)
}