#!/usr/bin/env node
'use strict';
var meow = require('meow');
var nodeWeixinMessage = require('./');

var cli = meow({
  help: [
    'Usage',
    '  node-weixin-message <input>',
    '',
    'Example',
    '  node-weixin-message Unicorn'
  ].join('\n')
});

nodeWeixinMessage(cli.input[0]);
