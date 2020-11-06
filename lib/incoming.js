/* eslint camelcase: [2, {properties: "never"}] */
/* eslint space-before-function-paren: [2, "never"] */
/* eslint-env es6 */
var x2j = require('xml2js');
var crypto = require('crypto');

var Emitter = require('events').EventEmitter;
var emitter = new Emitter();
var eventEmitter = new Emitter();
var ons = {};
var eventOns = {};

var types = ['text', 'image', 'voice', 'video', 'shortvideo', 'location', 'link'];
var eventTypes = ['subscribe', 'unsubscribe', 'scan', 'location', 'click', 'view', 'templatesendjobfinish', 'view_miniprogram'];

function htonl(n) {
  var buffer = Buffer.alloc(4);
  buffer[0] = (n & 0xFF000000) >> 24;
  buffer[1] = (n & 0x00FF0000) >> 16;
  buffer[2] = (n & 0x0000FF00) >> 8;
  buffer[3] = (n & 0x000000FF) >> 0;
  return buffer;
}

function padding(n) {
  var len = n % 32;
  if (len === 0) { 
    len = 32;
  } else {
    len = 32 - len;
  }
  var buffer = Buffer.alloc(len);
  for (var i = 0; i < len; i++) {
    buffer[i] = len;
  }
  return buffer;
}

function makeEventCall(emitter, ons, types) {
  for (var i = 0; i < types.length; i++) {
    var type = types[i];
    ons[type] = (function makeTypeCall(emitter, type) {
      return function makeCall(cb) {
        var listeners = emitter.listeners(type.toLowerCase());
        for (var i = 0; i < listeners.length; i++) {
          if (listeners[i].listener === cb) {
            return;
          }
        }
        emitter.once(type.toLowerCase(), cb);
      };
    })(emitter, type);
  }
}

makeEventCall(emitter, ons, types);
makeEventCall(eventEmitter, eventOns, eventTypes);

module.exports = {
  setMaxListeners: function(maxListeners) {
    emitter.setMaxListeners(maxListeners);
    eventEmitter.setMaxListeners(maxListeners);
  },
  on: ons,
  onXML: function(xml) {
    var self = this;
    var preArg = arguments;
    x2j.parseString(xml, {
      explicitArray: false,
      ignoreAttrs: true
    }, function(error, json) {
      if (error) {
        throw Error('Failed Parsing XML!');
      }
      var args = [json.xml];
      for (var i = 1; i < preArg.length; i++) {
        args.push(preArg[i]);
      }
      self.parse.apply(self, args);
    });
  },
  parse: function() {
    switch (arguments[0].MsgType) {
      case 'event':
        this.event.parse.apply(this, arguments);
        break;
      default:
        var args = [arguments[0].MsgType];
        for (var i = 0; i < arguments.length; i++) {
          args.push(arguments[i]);
        }
        emitter.emit.apply(emitter, args);
    }
  },
  event: {
    on: eventOns,
    parse: function() {
      var args = [arguments[0].Event.toLowerCase()];
      for (var i = 0; i < arguments.length; i++) {
        args.push(arguments[i]);
      }
      eventEmitter.emit.apply(eventEmitter, args);
    }
  },
  generateSignature: function(token, timestamp, nonce, msgSignature){
    var mixes = [token, timestamp, nonce, msgSignature];
    mixes.sort();
    var str = mixes.join('');
    var sha1 = crypto.createHash('sha1');
    sha1.update(str);
    return sha1.digest('hex');
  },
  check: function (token, msgSignature, timestamp, nonce, msgEncrypt) {
    var newSignature = this.generateSignature(token, timestamp, nonce, msgEncrypt);
    if (newSignature === msgSignature) {
      return true;
    }
    return false;
  },
  decrypt: function(encodingAESKey, msgEncrypt){
    var AESKey = Buffer.from(encodingAESKey + '=', 'base64');
    var iv = AESKey.slice(0, 16);
    const cipher = crypto.createDecipheriv('aes-256-cbc', AESKey, iv);
    cipher.setAutoPadding(false);
    var text = cipher.update(msgEncrypt, 'base64', 'utf8') + cipher.final('utf8');
    return { 
      nonce: text.substring(0, 16), 
      msg_len: text.substring(16, 20),
      xml: text.substring(20, text.lastIndexOf('>') + 1)
    }
  },
  encrypt: function(encodingAESKey, xml, appId){
    var nonce = util.getNonce(16);
    var AESKey = Buffer.from(encodingAESKey + '=', 'base64');
    var iv = AESKey.slice(0, 16);
    var preBuf = Buffer.from(nonce, 'utf8'),
      msgBuf = Buffer.from(xml, 'utf8'),
      msgBufLen = msgBuf.length,
      netBuf = htonl(msgBufLen),
      appIdBuf = Buffer.from(appId, 'utf8'),
      appIdBufLen = appIdBuf.length,
      paddingBuf = padding(20 + msgBufLen + appIdBufLen);
    const cipher = crypto.createCipheriv('aes-256-cbc', AESKey, iv);
    cipher.setAutoPadding(false);
    return cipher.update(Buffer.concat([preBuf, netBuf, msgBuf, appIdBuf, paddingBuf]), 'binary', 'base64') + cipher.final('base64');
  },
  parseEncrypt: function(appToken, appEncodingAESKey, query, body) {
    var self = this;
    if(query.encrypt_type && query.encrypt_type === 'aes'){
      if(self.check(appToken, body.msg_signature, body.timestamp, body.nonce, body.xml.Encrypt)){
        self.onXML(self.decrypt(appEncodingAESKey, body.xml.Encrypt));
      } else {
        throw Error('Bad Message!');
      }
    } else {
      self.parse(body.xml);
    }
  }
};
