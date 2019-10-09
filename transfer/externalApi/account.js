const fastify = require('../app')
const axios = require('axios')
var customerApiResponse = require('./customer')

async function getData(){

    let res
    try {
        res = await customerApiResponse.findCustomerInfo()
        console.log(res.data)
    } catch (error) {
        console.log(error)
    }
    // console.log(res.data)
}

getData()
