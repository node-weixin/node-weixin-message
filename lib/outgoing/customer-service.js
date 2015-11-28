var request = require('node-weixin-request');
var util = require('node-weixin-util');

module.exports = {
  _send: function(app, auth, data, cb) {
    var url = "https://api.weixin.qq.com/cgi-bin/message/custom/send?";
    auth.determine(app, function () {
      url = url + util.toParam({
          access_token: app.auth.accessToken
        });
      request.json(url, data, cb);
    });
  },
  text: function(app, auth, to, message, cb) {
    this._send(app, auth, {
      touser: to,
      msgtype: 'text',
      text: {
        content: message
      }
    }, cb);
  },
  image: function(app, auth, to, mediaId, cb) {
    this._send(app, auth, {
      touser: to,
      msgtype: 'image',
      image: {
        media_id: mediaId
      }
    }, cb);
  },
  voice: function(app, auth, to, mediaId, cb) {
    this._send(app, auth, {
      touser: to,
      msgtype: 'voice',
      voice: {
        media_id: mediaId
      }
    }, cb);
  },
  video: function(app, auth, to, title, desc, mediaId, thumbMediaId,  cb) {
    this._send(app, auth, {
      touser: to,
      msgtype: 'video',
      video: {
        media_id: mediaId,
        thumb_media_id: thumbMediaId,
        title: title,
        description: desc
      }
    }, cb);
  },
  music: function(app, auth, to, url, hqUrl, thumbMediaId, title, desc, cb) {
    this._send(app, auth, {
      touser: to,
      msgtype: 'music',
      music: {
        musicurl: url,
        hqmusicurl: hqUrl,
        thumb_media_id: thumbMediaId,
        title: title,
        description: desc
      }
    }, cb);
  },
  news: function(app, auth, to, articles, cb) {
    this._send(app, auth, {
      touser: to,
      msgtype: 'news',
      news: {
        articles: articles
      }
    }, cb);
  }
};
