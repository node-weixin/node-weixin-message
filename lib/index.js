'use strict';
/* eslint camelcase: [2, {properties: "never"}] */
/* eslint space-before-function-paren: [2, "never"] */
/* eslint-env es6 */

module.exports = {
  reply: require('./outgoing/auto-reply'),
  messages: require('./incoming'),
  service: require('./outgoing/customer-service'),
  template: require('./outgoing/template')
};
