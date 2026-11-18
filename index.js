'use strict';

const axios = require('axios');
const {toLower} = require('lodash');


let main = (secret, opts = {}) => {
  let {
    sandbox = false,
    fromPhone,
  } = opts || {}


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
    sendEmail: (email, subject, message, {html = true} = {}) => {
      for (const [name, value] of Object.entries({email, subject, message})) {
        if (typeof value !== 'string' || !value.trim()) {
          throw new TypeError(`${name} must not be blank`)
        }
      }
      if (typeof html !== 'boolean') throw new TypeError('html must be a boolean')
      return client.post(`/email/send`, {
        secret,
        email,
        subject,
        message,
        html,
      }, {timeout: 10000})
    },
    verifyStart: (phoneNumber) => {
      if (typeof phoneNumber !== 'string' || !/^\+[1-9][0-9]{1,14}$/.test(phoneNumber) || phoneNumber !== phoneNumber.trim()) {
        throw new TypeError('phone number must be in E.164 format')
      }
      return client.post('/sms/verifyStart', {
        secret,
        phone_number: phoneNumber,
      }, {timeout: 20000})
    },
    verifyCheck: (sessionId, code) => {
      if (typeof sessionId !== 'string' || !sessionId.trim()) {
        throw new TypeError('session ID must not be blank')
      }
      if (typeof code !== 'string' || !/^[0-9]{6}$/.test(code) || code.length !== 6) {
        throw new TypeError('code must be a six-digit string')
      }
      return client.post('/sms/verifyCheck', {
        secret,
        session_id: sessionId,
        code,
      }, {timeout: 20000})
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