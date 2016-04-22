'user strict';
/* eslint camelcase: [2, {properties: "never"}] */
/* eslint space-before-function-paren: [2, "never"] */
/* eslint-env es6 */

var request = require('node-weixin-request');
var util = require('node-weixin-util');
var auth = require('node-weixin-auth');

var send = require('../send');

var customUrl = 'https://api.weixin.qq.com/cgi-bin/message/custom/send?';

var rawRequest = function(settings, app, url, cb) {
  var request = require('request');
  auth.determine(settings, app, function() {
    settings.get(app.id, 'auth', function(authData) {
      url += util.toParam({
        access_token: authData.accessToken
      });
      request(url, function(error, response, body) {
        if (!error && response.statusCode === 200) {
          cb(false, JSON.parse(body));
        } else {
          cb(true, {
            message: body
          });
        }
      });
    });
  });
};

module.exports = {
  _rawRequest: rawRequest,
  api: {
    text: function(settings, app, to, message, cb) {
      send(settings, app, customUrl, {
        touser: to,
        msgtype: 'text',
        text: {
          content: message
        }
      }, cb);
    },
    image: function(settings, app, to, mediaId, cb) {
      send(settings, app, customUrl, {
        touser: to,
        msgtype: 'image',
        image: {
          media_id: mediaId
        }
      }, cb);
    },
    voice: function(settings, app, to, mediaId, cb) {
      send(settings, app, customUrl, {
        touser: to,
        msgtype: 'voice',
        voice: {
          media_id: mediaId
        }
      }, cb);
    },
    video: function(settings, app, to, title, desc, mediaId, thumbMediaId, cb) {
      send(settings, app, customUrl, {
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
    music: function(settings, app, to, url, hqUrl, thumbMediaId, title, desc, cb) {
      send(settings, app, customUrl, {
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
    news: function(settings, app, to, articles, cb) {
      send(settings, app, customUrl, {
        touser: to,
        msgtype: 'news',
        news: {
          articles: articles
        }
      }, cb);
    }
  },
  account: {
    add: function(settings, app, account, password, nickname, cb) {
      var data = {
        kf_account: account,
        nickname: nickname,
        password: password
      };

      var url = 'https://api.weixin.qq.com/customservice/kfaccount/add?';
      send(settings, app, url, data, cb);
    },
    update: function(settings, app, account, password, nickname, cb) {
      var data = {
        kf_account: account,
        nickname: nickname,
        password: password
      };

      var url = 'https://api.weixin.qq.com/customservice/kfaccount/update?';
      send(settings, app, url, data, cb);
    },
    remove: function(settings, app, account, password, nickname, cb) {
      var data = {
        kf_account: account,
        nickname: nickname,
        password: password
      };

      var url = 'https://api.weixin.qq.com/customservice/kfaccount/del?';
      send(settings, app, url, data, cb);
    },

    avatar: function(settings, app, account, file, cb) {
      var url = 'http://api.weixin.qq.com/customservice/kfaccount/uploadheadimg?';
      auth.determine(settings, app, function() {
        settings.get(app.id, 'auth', function(authData) {
          url += util.toParam({
            access_token: authData.accessToken,
            kf_account: account
          });
          request.file(url, file, cb);
        });
      });
    },
    logo: this.avatar,
    list: function(settings, app, cb) {
      var url = 'https://api.weixin.qq.com/cgi-bin/customservice/getkflist?';
      rawRequest(settings, app, url, cb);
    },
    online: function(settings, app, cb) {
      var url = 'https://api.weixin.qq.com/cgi-bin/customservice/getonlinekflist?';
      rawRequest(settings, app, url, cb);
    }
  },
  manage: {
    industry: function(settings, app, id1, id2, cb) {
      var url = 'https://api.weixin.qq.com/cgi-bin/template/api_set_industry?';
      var data = {
        industry_id1: id1,
        industry_id2: id2
      };
      send(settings, app, url, data, cb);
    },
    template: function(settings, app, templateId, cb) {
      var url = 'https://api.weixin.qq.com/cgi-bin/template/api_add_template?';
      var data = {
        template_id_short: templateId
      };
      send(settings, app, url, data, cb);
    }
  }
};
