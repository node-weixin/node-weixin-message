var util = require('node-weixin-util');
var request = require('node-weixin-request');
var auth = require('node-weixin-auth');
var settings = require('node-weixin-settings');

module.exports = {
  _send: function (app, url, data, cb) {
    auth.determine(app, function () {
      var authData = settings.get(app.id, 'auth');
      url = url + util.toParam({
          access_token: authData.accessToken
        });
      request.json(url, data, cb);
    });
  },
  setIndustry: function(app, inId1, inId2, cb) {
    var url = 'https://api.weixin.qq.com/cgi-bin/template/api_set_industry?';
    this._send(app, url,   {
      "industry_id1": inId1,
      "industry_id2": inId2
    }, cb);

  },
  get: function(app, id, cb) {
    var url = 'https://api.weixin.qq.com/cgi-bin/template/api_add_template?';
    this._send(app, url,   {
      template_id_short: id
    }, cb);
  },
  send: function(app, to, templateId, link, data, cb) {
    var url = 'https://api.weixin.qq.com/cgi-bin/message/template/send?';
    this._send(app, url, {
      touser: to,
      template_id: templateId,
      url: link,
      data: data
    }, cb);
  }
};
