'use strict';
const assert = require('node:assert/strict');
const axios = require('axios');
const create = axios.create.bind(axios);
const factory = require('..');

async function main() {
  for (const sandbox of [false, true]) {
    const calls = [];
    let failure;
    let response = {status: 'pending', session_id: 'opaque-session'};
    // Keep real Axios serialization, intercept at the adapter before any network I/O.
    axios.create = (config) => create({...config, adapter: async (request) => {
      calls.push(request);
      if (failure) throw failure;
      return {data: JSON.stringify(response), status: 200, statusText: 'OK', headers: {}, config: request};
    }});
    const sdk = factory('test-secret', {sandbox, fromPhone: 'sender'});
    const check = (path, payload, timeout) => {
      const call = calls[calls.length - 1];
      assert.equal(call.baseURL, `https://api${sandbox ? '-uat' : ''}.supermeteor.com`);
      assert.equal(call.url, path);
      assert.equal(call.method, 'post');
      assert.deepEqual(JSON.parse(call.data), payload);
      assert.equal(call.timeout, timeout);
    };
    assert.deepEqual((await sdk.verifyStart('+6591234567')).data, response);
    check('/sms/verifyStart', {secret: 'test-secret', phone_number: '+6591234567'}, 20000);
    for (const result of [{status: 'verified'}, {status: 'failed', reason: 'incorrect_code'}]) {
      response = result;
      assert.deepEqual((await sdk.verifyCheck('opaque-session', '001234')).data, result);
      check('/sms/verifyCheck', {secret: 'test-secret', session_id: 'opaque-session', code: '001234'}, 20000);
    }
    response = {msg: 'OK'};
    assert.deepEqual((await sdk.sendEmail('user@example.com', 'Subject', 'Body')).data, response);
    check('/email/send', {secret: 'test-secret', email: 'user@example.com', subject: 'Subject', message: 'Body', html: true}, 10000);
    await sdk.sendEmail('user@example.com', 'Subject', 'Body', {html: false});
    check('/email/send', {secret: 'test-secret', email: 'user@example.com', subject: 'Subject', message: 'Body', html: false}, 10000);
    const count = calls.length;
    for (const value of ['', null, 123, '6591234567', '+0123', '+1234567890123456', '+6591234567\n', '+6591234567\r']) {
      assert.throws(() => sdk.verifyStart(value), TypeError);
    }
    for (const value of ['', null, 123, '12345', '1234567', '１２３４５６', '123456\n', '123456\r']) {
      assert.throws(() => sdk.verifyCheck('session', value), TypeError);
    }
    for (const value of ['', '  ', null, 123]) {
      assert.throws(() => sdk.verifyCheck(value, '001234'), TypeError);
      assert.throws(() => sdk.sendEmail(value, 'subject', 'body'), TypeError);
      assert.throws(() => sdk.sendEmail('user@example.com', value, 'body'), TypeError);
      assert.throws(() => sdk.sendEmail('user@example.com', 'subject', value), TypeError);
    }
    assert.throws(() => sdk.sendEmail('user@example.com', 'subject', 'body', {html: 'false'}), TypeError);
    assert.equal(calls.length, count, 'invalid inputs must not send');
    for (const error of [new axios.AxiosError('timeout', 'ECONNABORTED'), new axios.AxiosError('unavailable', 'ERR_BAD_RESPONSE', {}, {}, {status: 503, data: {error: 'verify_unavailable'}})]) {
      failure = error;
      for (const operation of [() => sdk.verifyStart('+6591234567'), () => sdk.verifyCheck('session', '001234'), () => sdk.sendEmail('user@example.com', 'subject', 'body')]) {
        const before = calls.length;
        await assert.rejects(operation, (actual) => actual === error);
        assert.equal(calls.length, before + 1, 'must not automatically retry');
      }
    }
    failure = undefined;
    await sdk.sendMessage('whatsapp', 'recipient', 'body');
    check('/whatsapp/send', {secret: 'test-secret', phone: 'recipient', message: 'body', fromPhone: 'sender'}, 1000);
    await sdk.sendMessage('sms', 'recipient', 'body');
    check('/sms/send', {secret: 'test-secret', phone: 'recipient', message: 'body'}, 1000);
    await sdk.searchMessages('account', {limit: 5});
    const search = calls[calls.length - 1];
    assert.equal(search.method, 'get');
    assert.equal(search.url, '/account/account/messages');
    assert.equal(search.headers.authorization, 'test-secret');
    assert.equal(search.params.limit, 5);
  }
  console.log('Offline checks passed: email, SMS Verify, errors, no retries, existing messages/search, production and sandbox.');
}
main().catch((error) => { console.error(error); process.exitCode = 1; }).finally(() => { axios.create = create; });
