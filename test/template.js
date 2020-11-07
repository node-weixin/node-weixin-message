'use strict';
var assert = require('assert');
var nodeWeixinMessage = require('../');
var settings = require('node-weixin-settings');

var app = {
  id: process.env.APP_ID,
  secret: process.env.APP_SECRET,
  token: process.env.APP_TOKEN
};

describe('node-weixin-message', function () {
  describe('#template', function () {
    var templateId = null;
    it('it should be able to set industry', function (done) {
      nodeWeixinMessage.template.setIndustry(settings, app, '1', '2', function (error, data) {
        assert.strictEqual(true, !error);
        assert.strictEqual(true, (data.errcode === 0 && data.errmsg === 'ok') ||
          (data.errcode === 43100 && data.errmsg.indexOf('change template too frequently hint') !== -1));
        done();
      });
    });

    it('it should be able to get template', function (done) {
      nodeWeixinMessage.template.get(settings, app, 'TM00015', function (error, data) {
        templateId = data.template_id;
        assert.strictEqual(true, !error);
        if (data.errcode !== 45026) {
          assert.strictEqual(true, data.errcode === 0);
          assert.strictEqual(true, data.errmsg === 'ok');
          assert.strictEqual(true, typeof data.template_id === 'string');
          assert.strictEqual(true, data.template_id.length > 1);
        }
        done();
      });
    });

    it('it should be able to send template', function (done) {
      nodeWeixinMessage.template.send(settings, app, process.env.APP_OPENID, templateId, 'http://www.qq.com', {
        first: {
          value: '恭喜你购买成功！',
          color: '#173177'
        },
        orderMoneySum: {
          value: '102.82',
          color: '#173177'
        },
        orderProductName: {
          value: '田一块',
          color: '# 383232'
        },
        remark: {
          value: '欢迎再次购买！',
          color: '#173177'
        }
      }, function (error, data) {
        assert.strictEqual(true, !error);
        if (data.errcode === 40036) {
          console.error(error, data);
        } else {
          assert.strictEqual(true, data.errcode === 0);
          assert.strictEqual(true, data.errmsg === 'ok');
          assert.strictEqual(true, data.msgid > 1);
        }
        done();
      });
    });
  });
});
