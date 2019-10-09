const fastify = require('../app')
var bodyParser = require('body-parser');
var User = require('../model/user');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config/secret');

// fastify.register(bodyParser.urlencoded({ extended: false }));
// fastify.register(bodyParser.json());

exports.registerUser = async ()=>{
  fastify.post('/register', (req, res) => {
  console.log('in register' + req.body)
  let hashedPassword = bcrypt.hashSync(req.body.password, 8)
  console.log(hashedPassword)
  User.create({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  }, (err, user) => {
    if (err) return res.status(500).send("Registration failed")

    var token = jwt.sign({ id: user._id }, config.secret, { expiresIn: 86400 })

    res.status(200).send({ auth: true, token: token })
  })
})

}

exports.loginUser = async ()=>{
  fastify.post('/login', (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) return res.status(500).send("Internal server error")
    if (!user) return res.status(404).send("User not found")
    
    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password)
    if (!passwordIsValid) return res.status(401).send({ auth: false, token: null })

    var token = jwt.sign({ id: user._id }, config.secret, { expiresIn: 86400 })

    res.status(200).send({ auth: true, token: token })
  })
})}
