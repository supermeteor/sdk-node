# Supermeteor
Supermeteor is Node Js SDK use to send SMS message and email.

How to use:

install using npm
```bash
npm install supermeteor
```
include supermeterv1 in your file

```javascript
const supermeteor = require('supermeteor');
```
Package uses axios for HTTP request, so for function use "async" prefix and for mathod use "await" prefix.

### 1. For sending sms:

pass secret key, type, phone, message as function parameter,
Here is the sample function call for send sms.

#### Type must be: sms or whatsapp

```javascript
await supermeteor.sendMessage('secret key','type','phone','message');
```
### 2. For sending email:

pass secret key, email, subject, message as function parameter,
Here is the sample function call for send email.
```javascript
await supermeteor.sendEmail('secret key','email','subject','message');
```
