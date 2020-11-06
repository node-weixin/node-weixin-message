'use strict';

/* eslint camelcase: [2, {properties: "never"}] */
/* eslint space-before-function-paren: [2, "never"] */
/* eslint-env es6 */

var assert = require('assert');
var nodeWeixinMessage = require('../');
var fs = require('fs');
var path = require('path');

var x2j = require('xml2js');

var app = {
  id: process.env.APP_ID,
  secret: process.env.APP_SECRET,
  token: process.env.APP_TOKEN,
  encodingaeskey: process.env.APP_ENCODINGAESKEY
};

describe('node-weixin-message', function() {
  it('it should be able to handle incoming text', function(done) {
    var messages = nodeWeixinMessage.messages;

    messages.on.text(function(message) {
      assert.strictEqual(true, message.FromUserName === 'fromUser');
      assert.strictEqual(true, message.ToUserName === 'toUser');
      assert.strictEqual(true, message.CreateTime === '1348831860');
      assert.strictEqual(true, message.MsgType === 'text');
      assert.strictEqual(true, message.Content === 'this is a test');
      assert.strictEqual(true, message.MsgId === '1234567890123456');
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
      assert.strictEqual(true, message.FromUserName === 'fromUser');
      assert.strictEqual(true, message.ToUserName === 'toUser');
      assert.strictEqual(true, message.CreateTime === '1348831860');
      assert.strictEqual(true, message.MsgType === 'image');
      assert.strictEqual(true, message.PicUrl === 'this is a url');
      assert.strictEqual(true, message.MediaId === 'media_id');
      assert.strictEqual(true, message.MsgId === '1234567890123456');
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
      assert.strictEqual(true, message.FromUserName === 'fromUser');
      assert.strictEqual(true, message.ToUserName === 'toUser');
      assert.strictEqual(true, message.CreateTime === '1357290913');
      assert.strictEqual(true, message.MsgType === 'voice');
      assert.strictEqual(true, message.Format === 'Format');
      assert.strictEqual(true, message.Recognition === '腾讯微信团队');
      assert.strictEqual(true, message.MediaId === 'media_id');
      assert.strictEqual(true, message.MsgId === '1234567890123456');
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
      assert.strictEqual(true, message.FromUserName === 'fromUser');
      assert.strictEqual(true, message.ToUserName === 'toUser');
      assert.strictEqual(true, message.CreateTime === '1357290913');
      assert.strictEqual(true, message.MsgType === 'video');
      assert.strictEqual(true, message.ThumbMediaId === 'thumb_media_id');
      assert.strictEqual(true, message.MediaId === 'media_id');
      assert.strictEqual(true, message.MsgId === '1234567890123456');
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
      assert.strictEqual(true, message.FromUserName === 'fromUser');
      assert.strictEqual(true, message.ToUserName === 'toUser');
      assert.strictEqual(true, message.CreateTime === '1357290913');
      assert.strictEqual(true, message.MsgType === 'shortvideo');
      assert.strictEqual(true, message.ThumbMediaId === 'thumb_media_id');
      assert.strictEqual(true, message.MediaId === 'media_id');
      assert.strictEqual(true, message.MsgId === '1234567890123456');
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
      assert.strictEqual(true, message.FromUserName === 'fromUser');
      assert.strictEqual(true, message.ToUserName === 'toUser');
      assert.strictEqual(true, message.CreateTime === '1351776360');
      assert.strictEqual(true, message.MsgType === 'location');
      assert.strictEqual(true, message.Location_X === '23.134521');
      assert.strictEqual(true, message.Location_Y === '113.358803');
      assert.strictEqual(true, message.Scale === '20');
      assert.strictEqual(true, message.Label === '位置信息');
      assert.strictEqual(true, message.MsgId === '1234567890123456');
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
      assert.strictEqual(true, message.FromUserName === 'fromUser');
      assert.strictEqual(true, message.ToUserName === 'toUser');
      assert.strictEqual(true, message.CreateTime === '1351776360');
      assert.strictEqual(true, message.MsgType === 'link');
      assert.strictEqual(true, message.Title === '公众平台官网链接');
      assert.strictEqual(true, message.Description === '公众平台官网链接');
      assert.strictEqual(true, message.Url === 'url');
      assert.strictEqual(true, message.MsgId === '1234567890123456');
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
      assert.strictEqual(true, AVisited);
      assert.strictEqual(true, BVisited);
      assert.strictEqual(true, message.FromUserName === 'fromUser');
      assert.strictEqual(true, message.ToUserName === 'toUser');
      assert.strictEqual(true, message.CreateTime === '1351776360');
      assert.strictEqual(true, message.MsgType === 'link');
      assert.strictEqual(true, message.Title === '公众平台官网链接');
      assert.strictEqual(true, message.Description === '公众平台官网链接');
      assert.strictEqual(true, message.Url === 'url');
      assert.strictEqual(true, message.MsgId === '1234567890123456');
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

  it('should not be able to handle the same function only once', function(done) {
    var messages = nodeWeixinMessage.messages;
    var time = 0;

    function A() {
      time++;
    }
    messages.on.link(A);
    messages.on.link(A);
    messages.on.link(A);
    messages.on.link(function() {
      assert.strictEqual(true, time === 1);
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

  it('should not be able to handle the same function only once', function(done) {
    var messages = nodeWeixinMessage.messages;
    var time = 0;

    function A() {
      time++;
    }
    messages.on.link(A);
    messages.on.link(A);
    messages.on.link(A);
    messages.on.link(function() {
      assert.strictEqual(true, time === 1);
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

  it('should not be able to parse as many times without warning', function(done) {
    var count = 100;
    var time = 0;
    var r1 = {};
    var r2 = {};
    r2.send = function() {
      count--;
      assert.strictEqual(true, time + count === 100);
      if (count > 1) {
        http(r1, r2);
      } else {
        return done();
      }
    };

    function http(req, res) {
      var messages = nodeWeixinMessage.messages;

      function A(message) {
        time++;
        res.send(message);
      }
      messages.on.link(A);
      messages.on.link(A);
      messages.on.link(A);
      var xml = fs.readFileSync(path.resolve(__dirname, './messages/link.xml'));
      x2j.parseString(xml, {
        explicitArray: false,
        ignoreAttrs: true
      }, function(error, json) {
        messages.parse(json.xml);
      });
    }
    http(r1, r2);
  });

  it('should not be able to pass res to handler', function(done) {
    var r1 = {};
    var r2 = {};
    r2.send = function(message) {
      assert.strictEqual(true, message.FromUserName === 'fromUser');
      assert.strictEqual(true, message.ToUserName === 'toUser');
      assert.strictEqual(true, message.CreateTime === '1351776360');
      assert.strictEqual(true, message.MsgType === 'link');
      assert.strictEqual(true, message.Title === '公众平台官网链接');
      assert.strictEqual(true, message.Description === '公众平台官网链接');
      assert.strictEqual(true, message.Url === 'url');
      assert.strictEqual(true, message.MsgId === '1234567890123456');
      done();
    };

    function http(req, res) {
      var messages = nodeWeixinMessage.messages;

      function A(message, res) {
        assert.strictEqual(res, r2);
        res.send(message);
      }
      messages.on.link(A);
      var xml = fs.readFileSync(path.resolve(__dirname, './messages/link.xml'));
      x2j.parseString(xml, {
        explicitArray: false,
        ignoreAttrs: true
      }, function(error, json) {
        messages.parse(json.xml, res);
      });
    }
    http(r1, r2);
  });

  it('should not be able to pass more things to handler', function(done) {
    var r1 = {};
    var r2 = {};
    r2.send = function(message) {
      assert.strictEqual(true, message.FromUserName === 'fromUser');
      assert.strictEqual(true, message.ToUserName === 'toUser');
      assert.strictEqual(true, message.CreateTime === '1351776360');
      assert.strictEqual(true, message.MsgType === 'link');
      assert.strictEqual(true, message.Title === '公众平台官网链接');
      assert.strictEqual(true, message.Description === '公众平台官网链接');
      assert.strictEqual(true, message.Url === 'url');
      assert.strictEqual(true, message.MsgId === '1234567890123456');
    };

    function http(req, res) {
      var messages = nodeWeixinMessage.messages;
      function A(message, res, cb, more) {
        assert.strictEqual(res, r2);
        assert.strictEqual(more, 'and more');
        res.send(message);
        cb();
      }
      messages.on.link(A);
      var xml = fs.readFileSync(path.resolve(__dirname, './messages/link.xml'));
      x2j.parseString(xml, {
        explicitArray: false,
        ignoreAttrs: true
      }, function(error, json) {
        messages.parse(json.xml, res, function callback() {
          done();
        }, 'and more');
      });
    }
    http(r1, r2);
  });

  it('should not be able to use onXML', function(done) {
    var r1 = {};
    var r2 = {};
    r2.send = function(message) {
      assert.strictEqual(true, message.FromUserName === 'fromUser');
      assert.strictEqual(true, message.ToUserName === 'toUser');
      assert.strictEqual(true, message.CreateTime === '1351776360');
      assert.strictEqual(true, message.MsgType === 'link');
      assert.strictEqual(true, message.Title === '公众平台官网链接');
      assert.strictEqual(true, message.Description === '公众平台官网链接');
      assert.strictEqual(true, message.Url === 'url');
      assert.strictEqual(true, message.MsgId === '1234567890123456');
    };
    var messages = nodeWeixinMessage.messages;
    function A(message, res, cb, more) {
      assert.strictEqual(res, r2);
      assert.strictEqual(more, 'and more');
      res.send(message);
      cb();
    }
    messages.on.link(A);

    function http(req, res) {
      var xml = fs.readFileSync(path.resolve(__dirname, './messages/link.xml'));
      messages.onXML(xml, res, function() {
        done();
      }, 'and more');
    }
    http(r1, r2);
  });

  it('should be able to parse encrypted xml', function(done) {
    var messages = nodeWeixinMessage.messages;

    var query = { encrypt_type: 'aes' };

    messages.on.text(function(message) {
      assert.strictEqual(true, message.FromUserName === 'fromUser');
      assert.strictEqual(true, message.ToUserName === 'toUser');
      assert.strictEqual(true, message.CreateTime === '1348831860');
      assert.strictEqual(true, message.MsgType === 'text');
      assert.strictEqual(true, message.Content === 'this is a test');
      assert.strictEqual(true, message.MsgId === '1234567890123456');
      done();
    });
    var xml = fs.readFileSync(path.resolve(__dirname, './messages/encrypt_text.xml'));
    x2j.parseString(xml, {
      explicitArray: false,
      ignoreAttrs: true
    }, function(error, json) {
      messages.parseEncrypt(app.APP_TOKEN, app.APP_ENCODINGAESKEY, query, json);
    });
  });
});
