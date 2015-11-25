'use strict';
var assert = require('assert');
var nodeWeixinMessage = require('../');

var service = nodeWeixinMessage.service;

var app = {
  id: process.env.APP_ID,
  secret: process.env.APP_SECRET,
  token: process.env.APP_TOKEN
};
var auth = require("node-weixin-auth");

console.log(app);

describe('node-weixin-message', function () {
  it('it should be able to handle subscribe event', function (done) {
    service.text(app, auth, process.env.APP_OPENID, 'hello', function(error, data) {
      console.log(error, data);
      assert.equal(true, true);
      done();
    });
  });
});
