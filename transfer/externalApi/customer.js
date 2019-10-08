const fastify = require('../app')
const axios = require('axios')
const msg = require('../config/constact')
const redis = require('redis')
const REDIS_PORT = process.env.PORT || 6379
const client = redis.createClient(REDIS_PORT)

// exports.findCustomerInfo = async (request, response) =>{
//     console.log('Request Body in transfer service : '+request.body.custPhoneNumber)
//     try {
//         const apiresponse = await axios.get('http://localhost:3002/customer/getbyId',{
//         params:
//             {
//                 phoneNumber : request.body.custPhoneNumber
//             }
//         })
//         console.log('data inside external api')
//         console.log(apiresponse.data)
//     } catch (error) {
//         fastify.log.error(error)
//     }
// }


async function getData(){
    console.log('Request Body in transfer service : ')
    //new Promise((resolve, reject)=>{
        axios.get('http://localhost:3002/customer/getbyId',{
        params:
            {
                phoneNumber : '11111'
            }
        },(error, data)=>{
            console.log(data)
            if(data !==null){
                resolve(data)
            }else{
                reject(error)
            }
        })
    //})
}

getData()





