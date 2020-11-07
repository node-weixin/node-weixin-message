'use strict';

/* eslint camelcase: [2, {properties: "never"}] */
/* eslint space-before-function-paren: [2, "never"] */
/* eslint-env es6 */

var assert = require('assert');
var nodeWeixinMessage = require('../');
var fs = require('fs');
var path = require('path');

var x2j = require('xml2js');

describe('node-weixin-message', function() {
  describe('#events', function() {
    it('it should be able to handle subscribe event', function(done) {
      var messages = nodeWeixinMessage.messages;

      messages.event.on.subscribe(function(message) {
        assert.strictEqual(true, message.FromUserName === 'fromUser');
        assert.strictEqual(true, message.ToUserName === 'toUser');
        assert.strictEqual(true, message.CreateTime === '123456789');
        assert.strictEqual(true, message.MsgType === 'event');
        assert.strictEqual(true, message.Event === 'subscribe');
        done();
      });
      var xml = fs.readFileSync(path.resolve(__dirname, './events/subscribe.xml'));
      x2j.parseString(xml, {
        explicitArray: false,
        ignoreAttrs: true
      }, function(error, json) {
        messages.parse(json.xml);
      });
    });

    it('it should be able to handle unsubscribe event', function(done) {
      var messages = nodeWeixinMessage.messages;

      messages.event.on.unsubscribe(function(message) {
        assert.strictEqual(true, message.FromUserName === 'fromUser');
        assert.strictEqual(true, message.ToUserName === 'toUser');
        assert.strictEqual(true, message.CreateTime === '123456789');
        assert.strictEqual(true, message.MsgType === 'event');
        assert.strictEqual(true, message.Event === 'unsubscribe');
        done();
      });
      var xml = fs.readFileSync(path.resolve(__dirname, './events/unsubscribe.xml'));
      x2j.parseString(xml, {
        explicitArray: false,
        ignoreAttrs: true
      }, function(error, json) {
        messages.parse(json.xml);
      });
    });

    it('it should be able to handle unsubscribe event', function() {
      var messages = nodeWeixinMessage.messages;
      var lists = ['subscribe', 'unsubscribe', 'scan', 'location', 'click', 'view', 'templatesendjobfinish'];

      for (var k in messages.event.on) {
        if (typeof k === 'string') {
          assert.strictEqual(true, lists.indexOf(k) !== -1);
          assert.strictEqual(true, typeof messages.event.on[k] === 'function');
        }
      }
    });
  });
});
