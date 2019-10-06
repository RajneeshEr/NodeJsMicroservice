const fastify = require('../app')
const axios = require('axios')
const msg = require('../config/constact')
var customerFlag = false

exports.CustomerApi = async (request, response) =>{
    await axios.get('http://localhost:3002/customer/getbyId',{
        params: {
            phoneNumber : "234234233432"
          }
    })
    .then((apiresponse)=>{
        if(apiresponse.status == 200){
            return apiresponse.data
        }else{
            return false
        }
    }).catch((error)=> {
        fastify.log.error(error)
    })
}

