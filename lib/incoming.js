/* eslint camelcase: [2, {properties: "never"}] */
/* eslint space-before-function-paren: [2, "never"] */
/* eslint-env es6 */
var x2j = require('xml2js');

var Emitter = require('events').EventEmitter;
var emitter = new Emitter();
var eventEmitter = new Emitter();
var ons = {};
var eventOns = {};

var types = ['text', 'image', 'voice', 'video', 'shortvideo', 'location', 'link'];
var eventTypes = ['subscribe', 'unsubscribe', 'scan', 'location', 'click', 'view', 'templatesendjobfinish'];

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
  }
};
