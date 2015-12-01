var util = require('node-weixin-util');
var request = require('node-weixin-request');

module.exports = {
  _send: function (app, auth, url, data, cb) {
    auth.determine(app, function () {
      url = url + util.toParam({
          access_token: app.auth.accessToken
        });
      request.json(url, data, cb);
    });
  },
  setIndustry: function(app, auth, inId1, inId2, cb) {
    var url = 'https://api.weixin.qq.com/cgi-bin/template/api_set_industry?';
    this._send(app, auth, url,   {
      "industry_id1": inId1,
      "industry_id2": inId2
    }, cb);

  },
  get: function(app, auth, id, cb) {
    var url = 'https://api.weixin.qq.com/cgi-bin/template/api_add_template?';
    this._send(app, auth, url,   {
      template_id_short: id
    }, cb);
  },
  send: function(app, auth, to, templateId, link, data, cb) {
    var url = 'https://api.weixin.qq.com/cgi-bin/message/template/send?';
    this._send(app, auth, url, {
      touser: to,
      template_id: templateId,
      url: link,
      data: data
    }, cb);
  }
};
