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
const response = await supermeteor.sendEmail('user@example.com', 'Subject', 'Body');
console.log(response.data); // {msg: 'OK'}

// Plain text (HTML remains the API default).
await supermeteor.sendEmail('user@example.com', 'Subject', 'Body', {html: false});
```


The API selects the sender from the account email configuration. Email requests wait up to 10 seconds for provider acceptance; acceptance does not guarantee inbox delivery.

### 3. SMS verification

```javascript
const start = await supermeteor.verifyStart('+6591234567');
const result = await supermeteor.verifyCheck(start.data.session_id, '001234');
console.log(result.data); // {status: 'verified'} or {status: 'failed', reason: 'incorrect_code'}
```

Use an E.164 phone number and a six-digit **string** to preserve leading zeroes. Requires SMS Verify enabled on your account and an API deployment exposing `/sms/verifyStart` and `/sms/verifyCheck`. SDK support does not enable the server feature. A pending start means acceptance, not delivery. Verify requests use a 20-second timeout. Axios errors retain HTTP status and response data; requests do not automatically retry, since a timed-out start may already have sent an SMS.

All methods return Axios responses; access the API result through `response.data`. Existing SMS/WhatsApp and message-search calls retain their behavior.

## Node compatibility and checks

Requires Node >=18. GitHub Actions checks the latest patch of each stable major from 18 through 26 using strict dependency engine validation, locked and freshly resolved dependencies, syntax checks, offline API tests and package inspection. Each matrix job writes a report to the workflow Summary. Historical Node releases are included for compatibility; use a maintained Node release for production. Future majors require verification when released.

```bash
npm ci --engine-strict --ignore-scripts
npm run lint
npm test
npm pack --dry-run --ignore-scripts
```

Tests intercept Axios before network I/O and send no messages.

## Publishing to npm

The `.github/workflows/npm.yml` workflow runs verification on pull requests, pushes to `master`, version tags and manual runs. Publishing runs only for version tags, after every Node job passes, and requires the tag to match `package.json`.

Add a repository Actions secret named `NPM_TOKEN` containing an npm granular access token with write permission for **supermeteor** and permission to bypass 2FA for automated publishing. The publishing step passes it to npm as `NODE_AUTH_TOKEN`; the job uses npm 11 and publishes provenance through GitHub OIDC.

For a release, commit the SDK changes, bump the version (for example `npm version minor` for these new methods), then push the commit and generated version tag. npm versions are immutable; use a new version for each release.

# Incoming webhook
Inbound message hook is available in real-time, and setting is in the Setting Page.

Here are the examples of webhook data. The webhook is sent in POST method with JSON body

## receiving a message
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


## receiving an image
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
