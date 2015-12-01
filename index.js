'use strict';
module.exports = {
  reply: require('./lib/outgoing/auto-reply'),
  messages: require('./lib/incoming'),
  service: require('./lib/outgoing//customer-service'),
  template: require('./lib/outgoing/template')
};
