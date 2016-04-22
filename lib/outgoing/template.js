/* eslint camelcase: [2, {properties: "never"}] */
/* eslint space-before-function-paren: [2, "never"] */
/* eslint-env es6 */

var send = require('../send');

module.exports = {
  setIndustry: function(settings, app, inId1, inId2, cb) {
    var url = 'https://api.weixin.qq.com/cgi-bin/template/api_set_industry?';
    send(settings, app, url, {
      industry_id1: inId1,
      industry_id2: inId2
    }, cb);
  },
  get: function(settings, app, id, cb) {
    var url = 'https://api.weixin.qq.com/cgi-bin/template/api_add_template?';
    send(settings, app, url, {
      template_id_short: id
    }, cb);
  },
  send: function(settings, app, to, templateId, link, data, cb) {
    var url = 'https://api.weixin.qq.com/cgi-bin/message/template/send?';
    send(settings, app, url, {
      touser: to,
      template_id: templateId,
      url: link,
      data: data
    }, cb);
  }
};
