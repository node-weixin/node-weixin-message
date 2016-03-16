/* eslint camelcase: [2, {properties: "never"}] */
/* eslint space-before-function-paren: [2, "never"] */
/* eslint-env es6 */

var util = require('node-weixin-util');
var request = require('node-weixin-request');
var auth = require('node-weixin-auth');
var settings = require('node-weixin-settings');

module.exports = function(url, app, data, cb) {
  auth.determine(app, function() {
    settings.get(app.id, 'auth', function(authData) {
      var newUrl = url + util.toParam({
        access_token: authData.accessToken
      });
      request.json(newUrl, data, cb);
    });
  });
};
