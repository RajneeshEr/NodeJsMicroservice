const fastify = require('../app')
const axios = require('axios')
const msg = require('../config/constact')
//var customerFlag = false

async function getInfo(){
try {
    var custInfo = await axios.get('http://localhost:3002/customer/getbyId',{
        params: {
            phoneNumber : "234234233432"
          }
    })
    return custInfo.data
    //console.log(custInfo.data)
} catch (error) {
    
}

    // await axios.get('http://localhost:3002/customer/getbyId',{
    //     params: {
    //         phoneNumber : "234234233432"
    //       }
    // })
    // .then((apiresponse)=>{
    //     if(apiresponse.status == 200){
    //         console.log(apiresponse.data)
    //         return apiresponse.data
    //     }else{
    //         response.status(200).send({
    //             customerFlag : false,
    //             msg : msg.NOT_FIND
    //         })
    //     }
    // }).catch((error)=> {
    //     fastify.log.error(error)
    // })
}

var objectinfo = getInfo()

console .log('custlkjlj lk : '+objectinfo)
