const fastify = require('../app')
const auth = require('../middleware/auth')
const CustomerModel = require('../model/customerModel')
const bodyparser = require('body-parser')
const axios = require('axios')

module.exports = async()=> {


    

    // Creating customer
    fastify.post('/customer/create', async (req, res) => {     
        const user = new CustomerModel(req.body)  
        try {
            await user.save()
            const token = await user.generateAuthToken()
            res.status(201).send({ user, token })
        } catch (e) {
            res.status(400).send(e)
        }
    })

    // Login to profile
    fastify.post('/customer/login', async (req, res) => {
        try {
            const user = await CustomerModel.findByCredentials(req.body.email, req.body.password)
            const token = await user.generateAuthToken()
            res.status(201).send({ user, token })
        } catch (e) {
            res.status(400).send(e)
        }
    })

    // View customer profile
    fastify.get('/customer/profile',  {preHandler: auth} , async (req, res) => {

        try{
            res.send(req.user)
        } catch (e) {
            res.status(400).send(e)
        }
        
    })

    // logout from the current account
    fastify.post('/customer/logout', {preHandler: auth}, async (req, res) => {
        try {
            req.user.tokens = req.user.tokens.filter((token) => {
                return token.token !== req.token
            })
            await req.user.save()  
            res.send("The user has logged out")
        } catch (e) {
            res.status(500).send(e)
        }
    })
    
    // logout from all the account in variuos platform
    fastify.post('/customer/logoutAll', {preHandler: auth}, async (req, res) => {
        try {
            req.user.tokens = []
            await req.user.save()
            res.send()
        } catch (e) {
            res.status(500).send()
        }
    })

    // Update the customer profile
    fastify.patch('/customer/update', {preHandler: auth}, async (req, res) => {
        const updates = Object.keys(req.body)
        const allowedUpdates = ['firstName', 'lastName', 'phoneNumber', 'email', 'password', 'age']
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    
        if (!isValidOperation) {
            return res.status(400).send({ error: 'Invalid updates!' })
        }
    
        try {
            updates.forEach((update) => req.user[update] = req.body[update])
            await req.user.save()
            res.send(req.user)
        } catch (e) {
            res.status(400).send(e)
        }
    })
    
    // Delete the customer profile
    fastify.delete('/customer/delete', {preHandler: auth}, async (req, res) => {
        try {
            await req.user.remove()
            res.send(req.user)
        } catch (e) {
            res.status(500).send(e)
        }
    })

   // Create an Account
    fastify.get('/customer/create/account1', async (req, res) => {
        try {
            const response =   await axios.get('http://127.0.0.1:9000/test')
            
            res.send(response.data)
        } catch (e) {
            res.status(400).send(e)
        }
    })


    fastify.get('/customer/create/account', {preHandler: auth}, async (req, res) => {

       // const customerId = await CustomerModel.findOne({ email })
        console.log(req.user._id)

       const response = await axios.post('http://127.0.0.1:9000/account',
                    req.body)
                res.send(response.data)
        })


}