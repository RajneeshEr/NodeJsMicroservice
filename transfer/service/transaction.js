const Transaction = require('../model/transactionModel')
const fastify = require('../app')
 
exports.insert = async (request, response) => {
    Transaction.create(request.body).
    then((result)=> {
        if(!result){
            response.send({
                msg : 'Data save successfully...',
                Object : result
            })
            fastify.log.info('Data save successfully...')
        }else{
            response.send({
                msg : 'Data not save successfully...',
                Object : result
            })
            fastify.log.error('Data not save successfully...')
        }
    })
}

exports.widthdrawal = async (request, response)=>{

    
}