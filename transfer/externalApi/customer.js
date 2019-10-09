const fastify = require('../app')
const axios = require('axios')
const msg = require('../config/constact')
const redis = require('redis')
const REDIS_PORT = process.env.PORT || 6379
//const client = redis.createClient(REDIS_PORT)

exports.findCustomerByPhone = async (req, res)=>{
    return axios.get('http://localhost:3002/customer/getbyPhoneNumber',{
        params:{phoneNumber : req.body.phoneNumber}    
    })
}


exports.findCustomerByID = async (req, res)=>{
    return axios.get('http://localhost:3002/customer/getId',{
        params:{custId : req.body.custId}    
    })
}
