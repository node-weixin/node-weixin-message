/* eslint camelcase: [2, {properties: "never"}] */
/* eslint space-before-function-paren: [2, "never"] */
/* eslint-env es6 */

var template = require('ect');
var path = require('path');

var renderer = template({
  root: path.resolve(__dirname, '../../assets/templates/reply/')
});

module.exports = {
  _xml: function(from, to, type, data) {
    if (['text', 'image', 'voice', 'video', 'news', 'music'].indexOf(type) !== -1) {
      var _ = require('lodash');
      var options = _.extend({
        from: from,
        to: to,
        time: new Date().getTime(),
        type: type
      }, data);
      return renderer.render(type + '.ect', options);
    }
  },
  text: function(from, to, content) {
    return this._xml(from, to, 'text', {
      content: content
    });
  },
  image: function(from, to, mediaId) {
    return this._xml(from, to, 'image', {
      mediaId: mediaId
    });
  },
  voice: function(from, to, mediaId) {
    return this._xml(from, to, 'voice', {
      mediaId: mediaId
    });
  },
  video: function(from, to, mediaId, title, desc) {
    return this._xml(from, to, 'video', {
      mediaId: mediaId,
      title: title,
      description: desc
    });
  },
  music: function(from, to, mediaId, title, desc, url, hqUrl) {
    return this._xml(from, to, 'music', {
      mediaId: mediaId,
      title: title,
      description: desc,
      url: url,
      hqUrl: hqUrl
    });
  },
  news: function(from, to, articles) {
    return this._xml(from, to, 'news', {
      articles: articles
    });
  }
};
