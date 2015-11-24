'use strict';
var assert = require('assert');
var nodeWeixinMessage = require('../');

var x2j = require('xml2json');

describe('node-weixin-message should reply', function () {
  it('it should be able to reply text', function () {
    var reply = nodeWeixinMessage.reply;
    var text = reply.text('a', 'b', 'content');
    var json = x2j.toJson(text, {object: true}).xml;
    assert.equal(true, json.FromUserName === 'a');
    assert.equal(true, json.ToUserName === 'b');
    assert.equal(true, json.MsgType === 'text');
    assert.equal(true, json.Content === 'content');
    assert.equal(true, new Date(parseInt(json.CreateTime)).getTime() > 0);
  });

  it('it should be able to reply image', function () {
    var reply = nodeWeixinMessage.reply;
    var image = reply.image('a', 'b', 'mediaId');
    var json = x2j.toJson(image, {object: true}).xml;
    assert.equal(true, json.FromUserName === 'a');
    assert.equal(true, json.ToUserName === 'b');
    assert.equal(true, json.MsgType === 'image');
    assert.equal(true, json.Image.MediaId === 'mediaId');
    assert.equal(true, new Date(parseInt(json.CreateTime)).getTime() > 0);
  });

  it('it should be able to reply voice', function () {
    var reply = nodeWeixinMessage.reply;
    var voice = reply.voice('a', 'b', 'mediaId');
    var json = x2j.toJson(voice, {object: true}).xml;
    assert.equal(true, json.FromUserName === 'a');
    assert.equal(true, json.ToUserName === 'b');
    assert.equal(true, json.MsgType === 'voice');
    assert.equal(true, json.Voice.MediaId === 'mediaId');
    assert.equal(true, new Date(parseInt(json.CreateTime)).getTime() > 0);
  });

  it('it should be able to reply video', function () {
    var reply = nodeWeixinMessage.reply;
    var video = reply.video('a', 'b', 'mediaId', 'title', 'desc');
    var json = x2j.toJson(video, {object: true}).xml;
    assert.equal(true, json.FromUserName === 'a');
    assert.equal(true, json.ToUserName === 'b');
    assert.equal(true, json.MsgType === 'video');
    assert.equal(true, json.Video.MediaId === 'mediaId');
    assert.equal(true, json.Video.Title === 'title');
    assert.equal(true, json.Video.Description === 'desc');
    assert.equal(true, new Date(parseInt(json.CreateTime)).getTime() > 0);
  });

  it('it should be able to reply music', function () {
    var reply = nodeWeixinMessage.reply;
    var music = reply.music('a', 'b', 'mediaId', 'title', 'desc',
      'http://www.music1.com', 'http://www.music2.com');
    var json = x2j.toJson(music, {object: true}).xml;
    assert.equal(true, json.FromUserName === 'a');
    assert.equal(true, json.ToUserName === 'b');
    assert.equal(true, json.MsgType === 'music');
    assert.equal(true, json.Music.ThumbMediaId === 'mediaId');
    assert.equal(true, json.Music.Title === 'title');
    assert.equal(true, json.Music.Description === 'desc');
    assert.equal(true, json.Music.MusicUrl === 'http://www.music1.com');
    assert.equal(true, json.Music.HQMusicUrl === 'http://www.music2.com');
    assert.equal(true, new Date(parseInt(json.CreateTime)).getTime() > 0);
  });

  it('it should be able to reply news', function () {
    var reply = nodeWeixinMessage.reply;
    var news = reply.news('a', 'b', [{
      title: 'title1',
      description: 'description1',
      picUrl: 'picUrl1',
      url: 'url1'
    },
      {
        title: 'title2',
        description: 'description2',
        picUrl: 'picUrl2',
        url: 'url2'
      },
      {
        title: 'title3',
        description: 'description3',
        picUrl: 'picUrl3',
        url: 'url3'
      }]);
    var json = x2j.toJson(news, {object: true}).xml;
    assert.equal(true, json.FromUserName === 'a');
    assert.equal(true, json.ToUserName === 'b');
    assert.equal(true, json.MsgType === 'news');
    assert.equal(true, json.ArticleCount === '3');
    assert.equal(true, json.Articles.item.length === 3);
    assert.equal(true, new Date(parseInt(json.CreateTime)).getTime() > 0);

    var items = json.Articles.item;
    for(var i = 0; i < items.length; i++) {
      var item = items[i];
      var idx = i + 1;

      assert.equal(true, item.Title === 'title' + idx);
      assert.equal(true, item.Description === 'description' + idx);
      assert.equal(true, item.PicUrl === 'picUrl' + idx);
      assert.equal(true, item.Url === 'url' + idx);
    }
  });

});
