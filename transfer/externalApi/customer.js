const fastify = require('../app')
const axios = require('axios')
var customerFlag = false

module.exports = async (reuest, response)=>{
    await axios.get('http://localhost:3002/customer/getbyId',{
        params: {
            phoneNumber : reuest.body.custPhoneNumber
          }
    })
    .then((response)=>{
        if(response.data.status == 200){
            customerFlag = true
            console.log(response.data)
        }
    }).catch((error)=> {
        fastify.log.error(error)
    })
}