# Supermeteor

[![npm version](https://img.shields.io/npm/v/supermeteor.svg?style=flat-square)](https://www.npmjs.org/package/supermeteor)
[![install size](https://packagephobia.now.sh/badge?p=supermeteor)](https://packagephobia.now.sh/result?p=supermeteor)
[![npm downloads](https://img.shields.io/npm/dm/supermeteor.svg?style=flat-square)](http://npm-stat.com/charts.html?package=supermeteor)

Supermeteor is Node Js SDK use to send SMS message and email.

How to use:

install using npm
```bash
npm install supermeteor
```
include supermeter in your file

```javascript
const supermeteor = require('supermeteor')('SECRET_KEY');
```
Package uses axios for HTTP request, so for function use "async" prefix and for mathod use "await" prefix.

### 1. For sending sms:

pass secret key, type, phone, message as function parameter,
Here is the sample function call for send sms.

#### Type must be: sms or whatsapp

```javascript
await supermeteor.sendMessage('sms|whatsapp','phone','message');
```
### 2. For sending email:

pass secret key, email, subject, message as function parameter,
Here is the sample function call for send email.
```javascript
await supermeteor.sendEmail('email','subject','message');
```

# Incoming webhook
Inbound message hook is available in real-time, and setting is in the Setting Page.

Here are the examples of webhook data. The webhook is sent in POST method with JSON body

## receiving a message
```json
{
  "_id": "6299686fa0b5be00127052cf",
  "accountId": "5ccbdc9bd7b320fe8c4e119d",
  "createdAt": "2022-06-03T01:48:31.941Z",
  "channel": "whatsapp",
  "type": "incoming",
  "status": "SUCCESS",
  "phoneCountryCode": "852",
  "phoneNumber": "61112222",
  "fromPhoneCountryCode": "852",
  "fromPhoneNumber": "64447777",
  "image": "https://supermeteor.s3-ap-southeast-1.amazonaws.com/2022/06/6299686fa0b5be00127052cf.png"
}
```


## receiving an image
```json
{
  "_id": "62996851a0b5be00127052cd",
  "accountId": "5ccbdc9bd7b320fe8c4e119d",
  "createdAt": "2022-06-03T01:48:01.459Z",
  "channel": "whatsapp",
  "type": "incoming",
  "status": "SUCCESS",
  "phoneCountryCode": "852",
  "phoneNumber": "61112222",
  "fromPhoneCountryCode": "852",
  "fromPhoneNumber": "64447777",
  "message": "this is testing message",
  "quotedMessage": null
}
```

## receiving a quoted message
```json

{
  "_id": "62996851a0b5be00127052ce",
  "accountId": "5ccbdc9bd7b320fe8c4e119d",
  "createdAt": "2022-06-03T01:48:01.460Z",
  "channel": "whatsapp",
  "type": "incoming",
  "status": "SUCCESS",
  "phoneCountryCode": "852",
  "phoneNumber": "61112222",
  "fromPhoneCountryCode": "852",
  "fromPhoneNumber": "64447777",
  "message": "this is quoted message",
  "quotedMessage": "this is testing message"
}
```
