'use strict';

const axios = require('axios');
const {get, toLower} = require('lodash');


let main = (secret, opts = {}) => {
  let {
    sandbox = false,
    fromPhone,
  } = opts || {}


  const host = 'https://api.supermeteor.com'
  const getHost = (sandbox) => `https://api${sandbox ? "-uat" : ""}.supermeteor.com`
  const client = axios.create({
    baseURL: getHost(sandbox),
    timeout: 1000,
  })

  return {
    sendMessage: (messageType, phone, message) => {
      let data = {
        secret,
        phone,
        message,
      }
      if (toLower(messageType) === 'whatsapp'){
        data.fromPhone = fromPhone
      }
      return client.post(`/${messageType}/send`, data)
    },
    sendEmail: (email, subject, message) => {
      return client.post(`/email/send`, {
        secret,
        email,
        subject,
        message,
      })
    },
    searchMessages: (accountId, {
      limit = 10,
      skip = 0,
      dateTo,
      dateFrom,
      phoneNumber,
      countryCode,
      status,
    }) => {
      return client.get(`/account/${accountId}/messages`, {
        headers: {
          authorization: `${secret}`
        },
        params: {
          limit,
          skip,
          dateTo,
          dateFrom,
          phoneNumber,
          countryCode,
          status,
        }
      })
    }
  }
}

let supermeteor = (secret, opts = {}) => {
  return main(secret, opts)
}

module.exports = supermeteor