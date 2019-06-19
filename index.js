'use strict';

const axios = require('axios');

const host = 'https://email-uat.lncknight.com'
const client = axios.create({
  baseURL: host,
  timeout: 1000,
})

let main = secret => {
  return {
    sendMessage: (messageType, phone, message) => {
      return client.post(`/${messageType}/send`, {
        secret,
        phone,
        message,
      })
    },
    sendEmail: (email, subject, message) => {
      return client.post(`/email/send`, {
        secret,
        email,
        subject,
        message,
      })
    }
  }
}

let supermeteor = (secret) => {
  return main(secret)
}

module.exports = supermeteor