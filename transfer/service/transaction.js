const Transaction = require('../model/transactionModel')
const fastify = require('../app')
const msg = require('../config/constact')
const axios = require('axios')
 
exports.insert = async (request, response) => {
    console.log(request.body)


    Transaction.create(request.body).
    then((result)=>{
        if(!result) {
            response.send({
                msg : msg.SAVE,
                Object : result
            })
            fastify.log.info(msg.SAVE)
        }else{
            response.send({
                msg : msg.NOT_SAVE,
                Object : result
            })
            fastify.log.error(msg.NOT_SAVE)
        }
    }).catch((error)=>{
        response.status(500).send({
            msg : msg.NOT_SAVE,
            Object : error
        })
        fastify.log.error(error)
    })
}

async function getcust(){
    await axios.get('http://localhost:3002/customer/getbyId',{
        params: {
            phoneNumber : 234234233432
          }
    })
    .then((response)=>{
        console.log(response)
    }).catch((error)=> {
        fastify.log.error(error)
    })
}
