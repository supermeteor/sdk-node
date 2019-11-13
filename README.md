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
