# node-weixin-message
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> Weixin message handling

微信消息处理

## 反馈与帮助

nodejs微信开发交流QQ群： 39287176

## node-weixin项目的子项目

  node-weixin项目是一个旨在帮助微信开发与使用的全面的技术支持平台项目。

  目前最主要集成项目是
  1. [node-weixin-express](https://github.com/node-weixin/node-weixin-express)
    它是基于node-weixin-api与node web服务器而实现的服务器实现参考实现。

  2. [node-weixin-api](https://github.com/node-weixin/node-weixin-api)
    它是基于node-weixin-*所实现的API所组合而成的接口。

## 安装

```sh
$ npm install --save node-weixin-message
```

## 使用

```js
var nodeWeixinMessage = require('node-weixin-message');


//在http请求里的处理方式
app.get('weixin/text', function(req, res) {
  var messages = nodeWeixinMessage.messages;

  function text(message, res, callback, extra) {
    //message => 解析后的JSON
    //res => res
    //callback => callback
    //extra => 'some data',

    //Extra
    res.send(message);
  }

  //多次侦听相同的回调函数只会被调用一次
  messages.on.text(text);
  messages.on.text(text);
  messages.on.text(text);
  messages.onXML(req.body, res, function callback(message) {
    //After message handled.
  }
  //后面可以接系统允许的最大数量的参数，只要跟text的处理函数一一对应就可以了。
  //唯一不同的是req.body会被解析成JSON
  //,
  //'some data');

});
```

## 消息处理


### 公共号消息

[用户消息处理接口](https://github.com/node-weixin/node-weixin-message/wiki/%E5%A4%84%E7%90%86%E7%94%A8%E6%88%B7%E5%8F%91%E9%80%81%E8%BF%87%E6%9D%A5%E7%9A%84%E6%B6%88%E6%81%AF)

[公共号事件处理接口](https://github.com/node-weixin/node-weixin-message/wiki/%E5%A4%84%E7%90%86%E4%BA%A7%E7%94%9F%E7%9A%84%E4%BA%8B%E4%BB%B6%E6%B6%88%E6%81%AF)

[回复用户消息](https://github.com/node-weixin/node-weixin-message/wiki/%E5%9B%9E%E5%A4%8D%E7%94%A8%E6%88%B7%E6%B6%88%E6%81%AF)

[发送模板消息](https://github.com/node-weixin/node-weixin-message/wiki/%E6%8E%A8%E9%80%81%E6%A8%A1%E6%9D%BF%E6%B6%88%E6%81%AF)

### 客户API

[客服API消息回复](https://github.com/node-weixin/node-weixin-message/wiki/%E5%AE%A2%E6%88%B7API%E6%B6%88%E6%81%AF%E5%9B%9E%E5%A4%8D)


### 客服接待列表信息

```js
service.account.list(settings, app, function (error, data) {
  //data
});

```

### 客服在线接待信息

```js
service.account.online(settings, app, function (error, data) {
  //data.kf_online_list
});

```

### 模板消息管理

```js
service.manage.industry(settings, app, 1, 2, function (error, data ) {
  //data.errcode
  //data.errmsg
});

service.manage.template(settings, app, 'TM00015', function (error, data ) {
  //data.errcode
  //data.errmsg
});

```

## License

Apache-2.0 © [calidion](calidion.github.io)


[npm-image]: https://badge.fury.io/js/node-weixin-message.svg
[npm-url]: https://npmjs.org/package/node-weixin-message
[travis-image]: https://travis-ci.org/node-weixin/node-weixin-message.svg?branch=master
[travis-url]: https://travis-ci.org/node-weixin/node-weixin-message
[daviddm-image]: https://david-dm.org/node-weixin/node-weixin-message.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/node-weixin/node-weixin-message
[coveralls-image]: https://coveralls.io/repos/node-weixin/node-weixin-message/badge.svg
[coveralls-url]: https://coveralls.io/r/node-weixin/node-weixin-message
