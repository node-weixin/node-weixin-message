var send = require('../send');

module.exports = {
  setIndustry: function(app, inId1, inId2, cb) {
    var url = 'https://api.weixin.qq.com/cgi-bin/template/api_set_industry?';
    send(url, app, {
      "industry_id1": inId1,
      "industry_id2": inId2
    }, cb);

  },
  get: function(app, id, cb) {
    var url = 'https://api.weixin.qq.com/cgi-bin/template/api_add_template?';
    send(url, app, {
      template_id_short: id
    }, cb);
  },
  send: function(app, to, templateId, link, data, cb) {
    var url = 'https://api.weixin.qq.com/cgi-bin/message/template/send?';
    send(url, app, {
      touser: to,
      template_id: templateId,
      url: link,
      data: data
    }, cb);
  }
};
