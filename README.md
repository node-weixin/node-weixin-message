#  [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]  [![Coveralls Status][coveralls-image]][coveralls-url]

> Weixin message handling

微信消息处理

## 反馈与帮助

nodejs微信开发交流QQ群： 39287176


## node-weixin项目

  node-weixin项目是一个旨在帮助微信开发与使用的全面的技术支持平台项目。

  目前最主要集成项目是
  1. [node-weixin-express](https://github.com/node-weixin/node-weixin-express)
    它是基于node-weixin-api与node web服务器而实现的服务器实现参考实现。

  2. [node-weixin-api](https://github.com/node-weixin/node-weixin-api)
    它是基于node-weixin-*所实现的API所组合而成的接口。

 它们都是由下列子项目提供的功能组合而成:

 1. [node-weixin-config](https://github.com/node-weixin/node-weixin-config)
    用于微信配置信息的校验

 2. [node-weixin-auth](https://github.com/node-weixin/node-weixin-auth)
    用于与微信服务器握手检验

 3. [node-weixin-util](https://github.com/node-weixin/node-weixin-util)
    一些常用的微信请求，加密，解密，检验的功能与处理

 4. [node-weixin-request](https://github.com/node-weixin/node-weixin-request)
    微信的各类服务的HTTP请求的抽象集合

 5. [node-weixin-oauth](https://github.com/node-weixin/node-weixin-oauth)
    微信OAuth相关的操作

 6. [node-weixin-pay](https://github.com/node-weixin/node-weixin-pay)
    微信支付的服务器接口

 7. [node-weixin-jssdk](https://github.com/node-weixin/node-weixin-jssdk)
    微信JSSDK相关的服务器接口

 8. [node-weixin-menu](https://github.com/node-weixin/node-weixin-menu)
    微信菜单相关的操作与命令

 9. [node-weixin-user](https://github.com/node-weixin/node-weixin-user)
    微信用户API

10. [node-weixin-media](https://github.com/node-weixin/node-weixin-media)
    微信多媒体API

11. [node-weixin-link](https://github.com/node-weixin/node-weixin-link)
    微信推广(二维码,URL)API

12. [node-weixin-message](https://github.com/node-weixin/node-weixin-message)
    微信消息处理API


## Install

```sh
$ npm install --save node-weixin-message
```


## Usage

```js
var nodeWeixinMessage = require('node-weixin-message');

```

### 处理进入消息

```js

var messages = nodeWeixinMessage.messages;


//处理接收消息

//需要通过parse分析消息，然后再通知相应的处理方法，这个代码需要放在ack服务器的返回处理
//messages.parse(json);

//接收文本
messages.on.text(function(message) {
  //message.FromUserName
  //message.ToUserName
  //message.CreateTime
  //message.MsgType
  //message.Content
  //message.MsgId
});

//接收图片
messages.on.image(function(message) {
 //message.FromUserName
 //message.ToUserName
 //message.CreateTime
 //message.MsgType
 //message.PicUrl
 //message.MediaId
 //message.MsgId
});

//接收语音
messages.on.voice(function(message) {
  //message.FromUserName
  //message.ToUserName
  //message.CreateTime
  //message.MsgType
  //message.Format
  //message.Recognition
  //message.MediaId
  //message.MsgId
});

//接收视频
messages.on.video(function(message) {
  //message.FromUserName
  //message.ToUserName
  //message.CreateTime
  //message.MsgType
  //message.ThumbMediaId
  //message.MediaId
  //message.MsgId
});

//接收短视频
messages.on.shortvideo(function(message) {
  //message.FromUserName
  //message.ToUserName
  //message.CreateTime
  //message.MsgType
  //message.ThumbMediaId
  //message.MediaId
  //message.MsgId
});

//接收位置信息
messages.on.location(function(message) {
  //message.FromUserName
  //message.ToUserName
  //message.CreateTime
  //message.MsgType
  //message.Location_X
  //message.Location_Y
  //message.Scale
  //message.Label
  //message.MsgId
});

//接收链接
messages.on.link(function(message) {
  //message.FromUserName
  //message.ToUserName
  //message.CreateTime
  //message.MsgType
  //message.Title
  //message.Description
  //message.Url
  //message.MsgId
});

```

#### 处理进入事件

```js

//以下消息也都是基于messages.parse(json);

//处理用户订阅
messages.event.on.subscribe(function (message) {
});

//处理用户退订
messages.event.on.unsubscribe(function (message) {
});

//处理扫描带参数二维码事件
messages.event.on.scan(function (message) {
});

//处理上报地理位置事件  
messages.event.on.location(function (message) {
});


//处理点击菜单拉取消息时的事件
messages.event.on.click(function (message) {
});

//处理点击菜单跳转链接时的事件
messages.event.on.view(function (message) {
});

//处理模块消息发送事件
messages.event.on.templatesendjobfinish(function (message) {
});


```

### 回复消息

```js

var reply = nodeWeixinMessage.reply;
//res是HTTP的res

//回复文本
var text = reply.text('FromUserName', 'ToUserName', 'content');
res.send(text)

//回复图片
var image = reply.image('FromUserName', 'ToUserName', 'mediaId');
res.send(image)

//回复视频
var video = reply.video('FromUserName', 'ToUserName', 'mediaId', 'title', 'desc');
res.send(video);

//回复音乐
var music = reply.music('FromUserName', 'ToUserName', 'mediaId', 'title', 
'desc', 'http://www.musicurl.com', 'http://www.hightQualitymusicurl.com');
res.send(music);


//回复图文
var news = reply.news('FromUserName', 'ToUserName', [{
    title: 'title1',
    description: 'description1',
    picUrl: 'picUrl1',
    url: 'url1'
  },
  {
    title: 'title2',
    description: 'description2',
    picUrl: 'picUrl2',
    url: 'url2'
  },
  {
    title: 'title3',
    description: 'description3',
    picUrl: 'picUrl3',
    url: 'url3'
  }]);
res.send(news);


```


### 发送模板消息

```js
var template = nodeWeixinMessage.template;

//设置行业属性
template.setIndustry(app, auth, '1', '2', function (error, data) {
  //data.errcode
  //data.errmsg
});

//获取模板
template.get(app, auth, 'TM00015', function (error, data) {
  //data.errcode
  //data.errmsg
  //data.template_id;
});

//发送模板
template.send(app, auth, process.env.APP_OPENID, templateId, 'http://www.qq.com', {
  "first": {
    "value":"恭喜你购买成功！",
    "color":"#173177"
  },
  "orderMoneySum":{
    "value":"102.82",
    "color":"#173177"
  },
  "orderProductName": {
    "value":"田一块",
    "color":"# 383232"
  },
  "remark":{
    "value":"欢迎再次购买！",
    "color":"#173177"
  }
}, function (error, data) {
  //data.errcode
  //data.errmsg
  //data.msgid
});

```

### 客服API消息回复

```js
var service = nodeWeixinMessage.service;


//回复文本消息
service.api.text(app, auth, process.env.APP_OPENID, 'hello', function (error, data) {
  //data.errcode
  //data.errmsg
});

//回复图片
service.api.image(app, auth, process.env.APP_OPENID, mediaId, function (error, data) {
  //data.errcode
  //data.errmsg
});

//回复语音
service.api.voice(app, auth, process.env.APP_OPENID, mediaId, function (error, data) {
  //data.errcode
  //data.errmsg
});

//回复视频
service.api.video(app, auth, process.env.APP_OPENID, 'title', 'desc',
 mediaId, thumbMediaId, function (error, data) {
  //data.errcode
  //data.errmsg
});

//回复音乐
service.api.music(app, auth, process.env.APP_OPENID,
  'http://www.stephaniequinn.com/Music/Commercial%20DEMO%20-%2015.mp3',
  'http://www.stephaniequinn.com/Music/Commercial%20DEMO%20-%2015.mp3',  //高品质音乐URL
  thumbMediaId,
  'title',
  'desc', function (error, data) {
    //data.errcode
    //data.errmsg
  });

//回复图文
var articles = [
  {
    "title": "Happy Day",
    "description": "Is Really A Happy Day",
    "url": "http://www.qq.com",
    "picurl": "https://mp.weixin.qq.com/cgi-bin/singlesendpage?t=message/send&action=index&tofakeid=1866487131&token=1650197120&lang=zh_CN"
  },
  {
    "title": "Happy Day",
    "description": "Is Really A Happy Day",
    "url": "http://www.qq.com",
    "picurl": "https://mp.weixin.qq.com/cgi-bin/singlesendpage?t=message/send&action=index&tofakeid=1866487131&token=1650197120&lang=zh_CN"
  }
];

service.api.news(app, auth, process.env.APP_OPENID, articles, function (error, data) {
  //data.errcode
  //data.errmsg
});


```

## License

MIT © [node-weixin](www.node-weixin.com)


[npm-image]: https://badge.fury.io/js/node-weixin-message.svg
[npm-url]: https://npmjs.org/package/node-weixin-message
[travis-image]: https://travis-ci.org/node-weixin/node-weixin-message.svg?branch=master
[travis-url]: https://travis-ci.org/node-weixin/node-weixin-message
[daviddm-image]: https://david-dm.org/node-weixin/node-weixin-message.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/node-weixin/node-weixin-message
[coveralls-image]: https://coveralls.io/repos/node-weixin/node-weixin-message/badge.svg?branch=master&service=github
[coveralls-url]: https://coveralls.io/github/node-weixin/node-weixin-message?branch=master
