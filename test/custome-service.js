'use strict';
var assert = require('assert');
var path = require('path');
var nodeWeixinMessage = require('../');

var service = nodeWeixinMessage.service;

var app = {
  id: process.env.APP_ID,
  secret: process.env.APP_SECRET,
  token: process.env.APP_TOKEN
};
var auth = require("node-weixin-auth");
var media = require('node-weixin-media');

var shareId = null;

describe('node-weixin-message', function () {
  it('it should be able to handle text event', function (done) {
    service.text(app, auth, process.env.APP_OPENID, 'hello', function (error, data) {
      assert.equal(true, !error);
      assert.equal(true, data.errcode === 0);
      assert.equal(true, data.errmsg === 'ok');
      done();
    });
  });
  it('it should be able to handle image event', function (done) {
    var file = path.resolve(__dirname, "media/test.png");
    media.temporary.create(app, auth, 'image', file, function (error, json) {
      //json.type
      //json.media_id
      service.image(app, auth, process.env.APP_OPENID, json.media_id, function (error, data) {
        assert.equal(true, !error);
        assert.equal(true, data.errcode === 0);
        assert.equal(true, data.errmsg === 'ok');
        done();
      });
    });
  });

  it('it should be able to handle thumb event', function (done) {
    var file = path.resolve(__dirname, "media/test.png");
    media.temporary.create(app, auth, 'thumb', file, function (error, json) {
      //json.type
      //json.media_id
      shareId = json.thumb_media_id;
      done();
    });
  });

  it('it should be able to handle voice event', function (done) {
    var file = path.resolve(__dirname, "media/test.amr");
    media.temporary.create(app, auth, 'voice', file, function (error, json) {
      //json.type
      //json.media_id
      service.voice(app, auth, process.env.APP_OPENID, json.media_id, function (error, data) {
        assert.equal(true, !error);
        assert.equal(true, data.errcode === 0);
        assert.equal(true, data.errmsg === 'ok');
        done();
      });
    });

  });

  it('it should be able to handle video event', function (done) {
    var file = path.resolve(__dirname, "media/test.mp4");
    media.temporary.create(app, auth, 'video', file, function (error, json) {
      //json.type
      //json.media_id
      service.video(app, auth, process.env.APP_OPENID, 'title', 'desc', json.media_id, shareId, function (error, data) {
        assert.equal(true, !error);
        assert.equal(true, data.errcode === 0);
        assert.equal(true, data.errmsg === 'ok');
        done();
      });
    });
  });

  it('it should be able to handle music event', function (done) {
    service.music(app, auth, process.env.APP_OPENID,
      'http://www.stephaniequinn.com/Music/Commercial%20DEMO%20-%2015.mp3',
      'http://www.stephaniequinn.com/Music/Commercial%20DEMO%20-%2015.mp3',
      shareId,
      'title',
      'desc', function (error, data) {
        assert.equal(true, !error);
        assert.equal(true, data.errcode === 0);
        assert.equal(true, data.errmsg === 'ok');
      done();
    });
  });
});
