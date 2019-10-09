const jwt = require('jsonwebtoken')
const CustomerModel = require('../model/customerModel')
const {promisify} = require('util')
const redis = require('redis')
const REDIS_PORT = process.env.PORT || 6379;

const client = redis.createClient(REDIS_PORT);


const auth = async (req, res) => {
    try {
        
        //const token = req.headers.authorization.replace('Bearer ', '')

        const getAsync = promisify(client.get).bind(client);
        const token = await getAsync("token")
        if (!token) {
            throw new Error()
        }
        console.log('token....', token)
        const decoded = jwt.verify(token, 'thisismynewcourse')
        const user = await CustomerModel.findOne({ _id: decoded._id, 'tokens.token': token })

        if (!user) {
            throw new Error()
        }

        req.token = token
        req.user = user
        
    } catch (e) {
        res.status(401).send(e)
    }

}

module.exports = auth