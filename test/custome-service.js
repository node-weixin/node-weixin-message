'use strict';

/* eslint camelcase: [2, {properties: "never"}] */
/* eslint space-before-function-paren: [2, "never"] */
/* eslint-env es6 */

var assert = require('assert');
var path = require('path');
var nodeWeixinMessage = require('../');

var service = nodeWeixinMessage.service;

var app = {
  id: process.env.APP_ID,
  secret: process.env.APP_SECRET,
  token: process.env.APP_TOKEN
};
var auth = require('node-weixin-auth');
var media = require('node-weixin-media');

var shareId = null;

describe('node-weixin-message', function() {
  it('should init', function(done) {
    auth.determine(app, function() {
      done();
    });
  });
  describe('#api', function() {
    it('it should be able to handle text event', function(done) {
      service.api.text(app, process.env.APP_OPENID, 'hello', function(error, data) {
        assert.equal(true, !error);
        if (data.errcode !== 45015) {
          assert.equal(true, data.errcode === 0);
          assert.equal(true, data.errmsg === 'ok');
        }
        done();
      });
    });
    it('it should be able to handle image event', function(done) {
      var file = path.resolve(__dirname, 'media/test.png');
      media.temporary.create(app, 'image', file, function(error, json) {
        // json.type
        // json.media_id

        var callback = function(error, data) {
          assert.equal(true, !error);
          if (data.errcode !== 45015) {
            assert.equal(true, data.errcode === 0);
            assert.equal(true, data.errmsg === 'ok');
          }
          done();
        };
        service.api.image(app, process.env.APP_OPENID, json.media_id, callback);
      });
    });

    it('it should be able to handle thumb event', function(done) {
      var file = path.resolve(__dirname, 'media/test.png');
      media.temporary.create(app, 'thumb', file, function(error, json) {
        // json.type
        // json.media_id
        shareId = json.thumb_media_id;
        done();
      });
    });

    it('it should be able to handle voice event', function(done) {
      var file = path.resolve(__dirname, 'media/test.amr');
      media.temporary.create(app, 'voice', file, function(error, json) {
        // json.type
        // json.media_id
        service.api.voice(app, process.env.APP_OPENID, json.media_id, function(error, data) {
          assert.equal(true, !error);
          if (data.errcode !== 45015) {
            assert.equal(true, data.errcode === 0);
            assert.equal(true, data.errmsg === 'ok');
          }
          done();
        });
      });
    });

    it('it should be able to handle video event', function(done) {
      var file = path.resolve(__dirname, 'media/test.mp4');
      media.temporary.create(app, 'video', file, function(error, json) {
        // json.type
        // json.media_id
        service.api.video(app, process.env.APP_OPENID, 'title', 'desc', json.media_id, shareId, function(error, data) {
          assert.equal(true, !error);
          if (data.errcode !== 45015) {
            assert.equal(true, data.errcode === 0);
            assert.equal(true, data.errmsg === 'ok');
          }
          done();
        });
      });
    });

    it('it should be able to handle music event', function(done) {
      service.api.music(app, process.env.APP_OPENID,
        'http://www.stephaniequinn.com/Music/Commercial%20DEMO%20-%2015.mp3',
        'http://www.stephaniequinn.com/Music/Commercial%20DEMO%20-%2015.mp3',
        shareId,
        'title',
        'desc',
        function(error, data) {
          assert.equal(true, !error);
          if (data.errcode !== 45015) {
            assert.equal(true, data.errcode === 0);
            assert.equal(true, data.errmsg === 'ok');
          }
          done();
        });
    });

    it('it should be able to handle news event', function(done) {
      var articles = [{
        title: 'Happy Day',
        description: 'Is Really A Happy Day',
        url: 'http://www.qq.com',
        picurl: 'https://mp.weixin.qq.com/cgi-bin/singlesendpage?t=message/send&action=index&tofakeid=1866487131&token=1650197120&lang=zh_CN'
      }, {
        title: 'Happy Day',
        description: 'Is Really A Happy Day',
        url: 'http://www.qq.com',
        picurl: 'https://mp.weixin.qq.com/cgi-bin/singlesendpage?t=message/send&action=index&tofakeid=1866487131&token=1650197120&lang=zh_CN'
      }];

      service.api.news(app, process.env.APP_OPENID, articles, function(error, data) {
        assert.equal(true, !error);
        if (data.errcode !== 45015) {
          assert.equal(true, data.errcode === 0);
          assert.equal(true, data.errmsg === 'ok');
        }
        done();
      });
    });
  });
  describe('#account', function() {
    it('it should be able to add an account', function(done) {
      service.account.add(app, 'test1@test', '96e79218965eb72c92a549dd5a330112', 'guest1', function(error, data) {
        assert.equal(true, !error);
        assert.equal(true, !data.errcode || data.errcode === 61450);
        assert.equal(true, data.errmsg === 'ok' || data.errmsg === 'system error');
        done();
      });
    });

    it('it should be able to update an account', function(done) {
      service.account.update(app, 'test1@test', '96e79218965eb72c92a549dd5a330112', 'guest1', function(error, data) {
        assert.equal(true, !error);
        assert.equal(true, Boolean(data));
        done();
      });
    });

    it('it should be able to delete an account', function(done) {
      service.account.remove(app, 'test1@test', '96e79218965eb72c92a549dd5a330112', 'guest1', function(error, data) {
        assert.equal(true, !error);
        assert.equal(true, data.errcode === 0 || data.errcode === 61451);
        assert.equal(true, data.errmsg === 'ok' || data.errmsg === 'invalid parameter');
        done();
      });
    });
  });

  describe('#account', function() {
    it('it should be able to test rawRequest', function(done) {
      service._rawRequest(app, 'http://www.none100.com/', function(error, data) {
        assert.equal(true, error);
        assert.equal(true, Boolean(data));
        done();
      });
    });

    it('it should be able to update avatar', function(done) {
      var file = path.resolve(__dirname, './media/test.jpg');
      service.account.avatar(app, 'kf001', file, function(error, data) {
        assert.equal(true, !error);
        assert.equal(true, Boolean(data));
        done();
      });
    });
    it('it should be able to list kfs', function(done) {
      service.account.list(app, function(error, data) {
        assert.equal(true, !error);
        assert.equal(true, Boolean(data));
        // assert.equal(true, Boolean(data).kf_online_list.length >= 0);
        done();
      });
    });
    it('it should be able to list online kfs', function(done) {
      service.account.online(app, function(error, data) {
        assert.equal(true, !error);
        assert.equal(true, Boolean(data));
        // assert.equal(true, Boolean(data).kf_online_list.length >= 0);
        done();
      });
    });
  });

  describe('#manage', function() {
    it('it should be able to set industry', function(done) {
      service.manage.industry(app, 1, 2, function(error, data) {
        assert.equal(true, !data.errcode || data.errcode === 43100);
        done();
      });
    });
    it('it should be able to get template id', function(done) {
      service.manage.template(app, 'TM00015', function(error, data) {
        assert.equal(true, Boolean(data));
        assert.equal(true, typeof data.template_id === 'string' || Boolean(data.errmsg));
        done();
      });
    });

    it('it should be able to send template msg', function(done) {
      service.manage.template(app, 'TM00015', function(error, data) {
        assert.equal(true, Boolean(data));
        assert.equal(true, typeof data.template_id === 'string' || Boolean(data.errmsg));
        done();
      });
    });
  });
});
