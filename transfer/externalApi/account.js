const fastify = require('../app')
const axios = require('axios')
const base_url = ''

exports.findAccountByCustId = async (req, res)=>{
    return axios.get('https://rajneeshaccountservice.herokuapp.com/account/getbyCustId:custId',{
        params:{custId : req.body.custId}    
    })
}

exports.findAccountDetailsByAccountNumber = async (accountNumber)=>{
    return axios.get('https://rajneeshaccountservice.herokuapp.com/account/getbyAccountNumber',{
        params:{accNumber : accountNumber}    
    })
}

exports.debitAccount = async (accountNumber, debitbalance)=>{
    return axios({
        method: 'post',
        url: 'https://rajneeshaccountservice.herokuapp.com/account/debit',
        data: {
            "accNumber" : accountNumber,
            "balance" : debitbalance
        }
    })
}

exports.creditAccount = async (accountNumber, creditbalance)=>{
    return axios({
        method: 'post',
        url: 'https://rajneeshaccountservice.herokuapp.com/account/credit',
        data: {
            "accNumber" : accountNumber,
            "balance" : creditbalance
        }
    })
}

