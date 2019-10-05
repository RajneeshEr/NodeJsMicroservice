const fastify = require('../app')
const axios = require('axios')
var customerFlag

exports.findCustByPhone = async (reuest, response)=>{
    await axios.get('http://localhost:3002/customer/getbyId',{
        params: {
            phoneNumber : 234234233432
          }
    })
    .then((response)=>{
        if(response)
        customerFlag = true
        console.log(response)
    }).catch((error)=> {
        fastify.log.error(error)
    })
}