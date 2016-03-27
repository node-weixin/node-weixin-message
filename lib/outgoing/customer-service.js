'user strict';
/* eslint camelcase: [2, {properties: "never"}] */
/* eslint space-before-function-paren: [2, "never"] */
/* eslint-env es6 */

var request = require('node-weixin-request');
var util = require('node-weixin-util');
var auth = require('node-weixin-auth');
var settings = require('node-weixin-settings');

var send = require('../send');

var customUrl = 'https://api.weixin.qq.com/cgi-bin/message/custom/send?';

var rawRequest = function(app, url, cb) {
  var request = require('request');
  auth.determine(app, function() {
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
    text: function(app, to, message, cb) {
      send(customUrl, app, {
        touser: to,
        msgtype: 'text',
        text: {
          content: message
        }
      }, cb);
    },
    image: function(app, to, mediaId, cb) {
      send(customUrl, app, {
        touser: to,
        msgtype: 'image',
        image: {
          media_id: mediaId
        }
      }, cb);
    },
    voice: function(app, to, mediaId, cb) {
      send(customUrl, app, {
        touser: to,
        msgtype: 'voice',
        voice: {
          media_id: mediaId
        }
      }, cb);
    },
    video: function(app, to, title, desc, mediaId, thumbMediaId, cb) {
      send(customUrl, app, {
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
    music: function(app, to, url, hqUrl, thumbMediaId, title, desc, cb) {
      send(customUrl, app, {
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
    news: function(app, to, articles, cb) {
      send(customUrl, app, {
        touser: to,
        msgtype: 'news',
        news: {
          articles: articles
        }
      }, cb);
    }
  },
  account: {
    add: function(app, account, password, nickname, cb) {
      var data = {
        kf_account: account,
        nickname: nickname,
        password: password
      };

      var url = 'https://api.weixin.qq.com/customservice/kfaccount/add?';
      send(url, app, data, cb);
    },
    update: function(app, account, password, nickname, cb) {
      var data = {
        kf_account: account,
        nickname: nickname,
        password: password
      };

      var url = 'https://api.weixin.qq.com/customservice/kfaccount/update?';
      send(url, app, data, cb);
    },
    remove: function(app, account, password, nickname, cb) {
      var data = {
        kf_account: account,
        nickname: nickname,
        password: password
      };

      var url = 'https://api.weixin.qq.com/customservice/kfaccount/del?';
      send(url, app, data, cb);
    },

    avatar: function(app, account, file, cb) {
      var url = 'http://api.weixin.qq.com/customservice/kfaccount/uploadheadimg?';
      auth.determine(app, function() {
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
    list: function(app, cb) {
      var url = 'https://api.weixin.qq.com/cgi-bin/customservice/getkflist?';
      rawRequest(app, url, cb);
    },
    online: function(app, cb) {
      var url = 'https://api.weixin.qq.com/cgi-bin/customservice/getonlinekflist?';
      rawRequest(app, url, cb);
    }
  },
  manage: {
    industry: function(app, id1, id2, cb) {
      var url = 'https://api.weixin.qq.com/cgi-bin/template/api_set_industry?';
      var data = {
        industry_id1: id1,
        industry_id2: id2
      };
      send(url, app, data, cb);
    },
    template: function(app, templateId, cb) {
      var url = 'https://api.weixin.qq.com/cgi-bin/template/api_add_template?';
      var data = {
        template_id_short: templateId
      };
      send(url, app, data, cb);
    }
  }
};
