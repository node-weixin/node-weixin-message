var request = require('node-weixin-request');
var util = require('node-weixin-util');
var auth = require('node-weixin-auth');
var settings = require('node-weixin-settings');
var crypto = require('crypto');

module.exports = {
  api: {
    _send: function (app, data, cb) {
      var url = "https://api.weixin.qq.com/cgi-bin/message/custom/send?";
      auth.determine(app, function () {
        var authData = settings.get(app.id, 'auth');
        url = url + util.toParam({
            access_token: authData.accessToken
          });
        request.json(url, data, cb);
      });
    },
    text: function (app, to, message, cb) {
      this._send(app, {
        touser: to,
        msgtype: 'text',
        text: {
          content: message
        }
      }, cb);
    },
    image: function (app, to, mediaId, cb) {
      this._send(app, {
        touser: to,
        msgtype: 'image',
        image: {
          media_id: mediaId
        }
      }, cb);
    },
    voice: function (app, to, mediaId, cb) {
      this._send(app, {
        touser: to,
        msgtype: 'voice',
        voice: {
          media_id: mediaId
        }
      }, cb);
    },
    video: function (app, to, title, desc, mediaId, thumbMediaId, cb) {
      this._send(app, {
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
    music: function (app, to, url, hqUrl, thumbMediaId, title, desc, cb) {
      this._send(app, {
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
    news: function (app, to, articles, cb) {
      this._send(app, {
        touser: to,
        msgtype: 'news',
        news: {
          articles: articles
        }
      }, cb);
    },
    wxcard: function (app, to, cardId, outerId, cb) {
      var self = this;
      auth.determine(app, function () {
        var authData = settings.get(app.id, 'auth');

        var type = 'wx_card';
        auth.ticket.determine(app, authData.accessToken, type, function(err) {
          if (err) {
            cb(err);
          } else {
            var ticket = settings.get(app.id, type).ticket;

            var timestamp = String((new Date().getTime() / 1000).toFixed(0));
            var sha1 = crypto.createHash('sha1');
            sha1.update(timestamp);
            var noncestr = sha1.digest('hex');

            console.log('ticket: %s, timestamp: %s, noncestr: %s, card_id: %s', ticket, timestamp, noncestr, cardId);

            var str = [ticket, timestamp, noncestr, cardId].sort().join('');
            var signature = crypto.createHash('sha1').update(str).digest('hex');
            console.log('%s => %s', str, signature);
            var cardExt = '{"code":"","openid":"","timestamp":"'+timestamp+',"signature":"'+signature+'"}';
            console.log(cardExt);

            self._send(app, {
              touser: to,
              msgtype: 'wxcard',
              wxcard: {
                card_id: cardId,
                card_ext: cardExt
              }
            }, cb);
          }
        });
      });
    }
  },
  account: {
    _send: function (app, url, data, cb) {
      auth.determine(app, function () {
        var authData = settings.get(app.id, 'auth');

        url = url + '?' + util.toParam({
            access_token: authData.accessToken
          });
        console.log(url, data);
        request.json(url, data, cb);
      });
    },
    add: function (app, account, password, nickname, cb) {
      var data = {
        "kf_account": account,
        "nickname": nickname,
        "password": password
      };

      var url = 'https://api.weixin.qq.com/customservice/kfaccount/add';
      this._send(app, url, data, cb);
    },
    update: function (app, account, password, nickname, cb) {
      var data = {
        "kf_account": account,
        "nickname": nickname,
        "password": password
      };

      var url = 'https://api.weixin.qq.com/customservice/kfaccount/update';
      this._send(app, url, data, cb);
    },
    remove: function (app, account, password, nickname, cb) {
      var data = {
        "kf_account": account,
        "nickname": nickname,
        "password": password
      };

      var url = 'https://api.weixin.qq.com/customservice/kfaccount/del';
      this._send(app, url, data, cb);
    },

    avatar: function (app, account, file, cb) {
      var url = 'http://api.weixin.qq.com/customservice/kfaccount/uploadheadimg?';
      auth.determine(app, function () {
        var authData = settings.get(app.id, 'auth');
        url = url + util.toParam({
            access_token: authData.accessToken,
            kf_account: account
          });
        request.file(url, file, cb);
      });
    },

    logo: this.avatar,

    list: function (app, cb) {
      var request = require("request");
      var url = 'https://api.weixin.qq.com/cgi-bin/customservice/getkflist?';
      auth.determine(app, function () {
        var authData = settings.get(app.id, 'auth');

        url = url + util.toParam({
            access_token: authData.accessToken
          });
        request(url, function (error, response, body) {
          if (!error && response.statusCode === 200) {
            //Return false if succeeded, else true
            cb(false, JSON.parse(body));
          } else {
            cb(true, {message: body});
          }
        });
      });
    }
  }
};
