const fastify = require('../app')
const auth = require('../middleware/auth')
const CustomerModel = require('../model/customerModel')
const bodyparser = require('body-parser')
const axios = require('axios')

module.exports = async()=> {




    fastify.get('/', async (req, res) => {

        res.send('<h1>BANK-DEMO</h1>')
         })


    //  fastify.get('/', {preHandler: auth}, async (req, res) => {

    //     // const customerId = await CustomerModel.findOne({ email })
    //      console.log(req.user._id)
 
    //     const response = await axios.post('http://127.0.0.1:9000/account',
    //                  req.body)
    //              res.send(response.data)
    //      })    
 







}
