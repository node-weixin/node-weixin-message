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
  it('it should be able to handle incoming text', function(done) {
    var messages = nodeWeixinMessage.messages;

    messages.on.text(function(message) {
      assert.equal(true, message.FromUserName === 'fromUser');
      assert.equal(true, message.ToUserName === 'toUser');
      assert.equal(true, message.CreateTime === '1348831860');
      assert.equal(true, message.MsgType === 'text');
      assert.equal(true, message.Content === 'this is a test');
      assert.equal(true, message.MsgId === '1234567890123456');
      done();
    });
    var xml = fs.readFileSync(path.resolve(__dirname, './messages/text.xml'));
    x2j.parseString(xml, {
      explicitArray: false,
      ignoreAttrs: true
    }, function(error, json) {
      messages.parse(json.xml);
    });
  });

  it('it should be able to handle incoming image', function(done) {
    var messages = nodeWeixinMessage.messages;

    messages.on.image(function(message) {
      assert.equal(true, message.FromUserName === 'fromUser');
      assert.equal(true, message.ToUserName === 'toUser');
      assert.equal(true, message.CreateTime === '1348831860');
      assert.equal(true, message.MsgType === 'image');
      assert.equal(true, message.PicUrl === 'this is a url');
      assert.equal(true, message.MediaId === 'media_id');
      assert.equal(true, message.MsgId === '1234567890123456');
      done();
    });
    var xml = fs.readFileSync(path.resolve(__dirname, './messages/image.xml'));
    x2j.parseString(xml, {
      explicitArray: false,
      ignoreAttrs: true
    }, function(error, json) {
      messages.parse(json.xml);
    });
  });

  it('it should be able to handle incoming voice', function(done) {
    var messages = nodeWeixinMessage.messages;
    messages.on.voice(function(message) {
      assert.equal(true, message.FromUserName === 'fromUser');
      assert.equal(true, message.ToUserName === 'toUser');
      assert.equal(true, message.CreateTime === '1357290913');
      assert.equal(true, message.MsgType === 'voice');
      assert.equal(true, message.Format === 'Format');
      assert.equal(true, message.Recognition === '腾讯微信团队');
      assert.equal(true, message.MediaId === 'media_id');
      assert.equal(true, message.MsgId === '1234567890123456');
      done();
    });
    var xml = fs.readFileSync(path.resolve(__dirname, './messages/voice.xml'));
    x2j.parseString(xml, {
      explicitArray: false,
      ignoreAttrs: true
    }, function(error, json) {
      messages.parse(json.xml);
    });
  });

  it('it should be able to handle incoming video', function(done) {
    var messages = nodeWeixinMessage.messages;

    messages.on.video(function(message) {
      assert.equal(true, message.FromUserName === 'fromUser');
      assert.equal(true, message.ToUserName === 'toUser');
      assert.equal(true, message.CreateTime === '1357290913');
      assert.equal(true, message.MsgType === 'video');
      assert.equal(true, message.ThumbMediaId === 'thumb_media_id');
      assert.equal(true, message.MediaId === 'media_id');
      assert.equal(true, message.MsgId === '1234567890123456');
      done();
    });
    var xml = fs.readFileSync(path.resolve(__dirname, './messages/video.xml'));
    x2j.parseString(xml, {
      explicitArray: false,
      ignoreAttrs: true
    }, function(error, json) {
      messages.parse(json.xml);
    });
  });

  it('it should be able to handle incoming short video', function(done) {
    var messages = nodeWeixinMessage.messages;

    messages.on.shortvideo(function(message) {
      assert.equal(true, message.FromUserName === 'fromUser');
      assert.equal(true, message.ToUserName === 'toUser');
      assert.equal(true, message.CreateTime === '1357290913');
      assert.equal(true, message.MsgType === 'shortvideo');
      assert.equal(true, message.ThumbMediaId === 'thumb_media_id');
      assert.equal(true, message.MediaId === 'media_id');
      assert.equal(true, message.MsgId === '1234567890123456');
      done();
    });
    var xml = fs.readFileSync(path.resolve(__dirname, './messages/shortvideo.xml'));
    x2j.parseString(xml, {
      explicitArray: false,
      ignoreAttrs: true
    }, function(error, json) {
      messages.parse(json.xml);
    });
  });

  it('it should be able to handle incoming location', function(done) {
    var messages = nodeWeixinMessage.messages;

    messages.on.location(function(message) {
      assert.equal(true, message.FromUserName === 'fromUser');
      assert.equal(true, message.ToUserName === 'toUser');
      assert.equal(true, message.CreateTime === '1351776360');
      assert.equal(true, message.MsgType === 'location');
      assert.equal(true, message.Location_X === '23.134521');
      assert.equal(true, message.Location_Y === '113.358803');
      assert.equal(true, message.Scale === '20');
      assert.equal(true, message.Label === '位置信息');
      assert.equal(true, message.MsgId === '1234567890123456');
      done();
    });
    var xml = fs.readFileSync(path.resolve(__dirname, './messages/location.xml'));
    x2j.parseString(xml, {
      explicitArray: false,
      ignoreAttrs: true
    }, function(error, json) {
      messages.parse(json.xml);
    });
  });

  it('it should be able to handle incoming link', function(done) {
    var messages = nodeWeixinMessage.messages;

    messages.on.link(function(message) {
      assert.equal(true, message.FromUserName === 'fromUser');
      assert.equal(true, message.ToUserName === 'toUser');
      assert.equal(true, message.CreateTime === '1351776360');
      assert.equal(true, message.MsgType === 'link');
      assert.equal(true, message.Title === '公众平台官网链接');
      assert.equal(true, message.Description === '公众平台官网链接');
      assert.equal(true, message.Url === 'url');
      assert.equal(true, message.MsgId === '1234567890123456');
      done();
    });
    var xml = fs.readFileSync(path.resolve(__dirname, './messages/link.xml'));
    x2j.parseString(xml, {
      explicitArray: false,
      ignoreAttrs: true
    }, function(error, json) {
      messages.parse(json.xml);
    });
  });

  it('should not be invoked more than once', function(done) {
    var messages = nodeWeixinMessage.messages;
    var AVisited = false;
    var BVisited = false;
    var A = function() {
      AVisited = true;
    };
    var B = function() {
      BVisited = true;
    };

    messages.on.link(A);
    messages.on.link(B);

    messages.on.link(function(message) {
      assert.equal(true, AVisited);
      assert.equal(true, BVisited);
      assert.equal(true, message.FromUserName === 'fromUser');
      assert.equal(true, message.ToUserName === 'toUser');
      assert.equal(true, message.CreateTime === '1351776360');
      assert.equal(true, message.MsgType === 'link');
      assert.equal(true, message.Title === '公众平台官网链接');
      assert.equal(true, message.Description === '公众平台官网链接');
      assert.equal(true, message.Url === 'url');
      assert.equal(true, message.MsgId === '1234567890123456');
      done();
    });
    var xml = fs.readFileSync(path.resolve(__dirname, './messages/link.xml'));
    x2j.parseString(xml, {
      explicitArray: false,
      ignoreAttrs: true
    }, function(error, json) {
      messages.parse(json.xml);
    });
  });
});
