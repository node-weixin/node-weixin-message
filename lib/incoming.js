/* eslint camelcase: [2, {properties: "never"}] */
/* eslint space-before-function-paren: [2, "never"] */
/* eslint-env es6 */
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
    ons[type] = (function(emitter, type) {
      return function(cb) {
        emitter.once(type.toLowerCase(), cb);
      };
    })(emitter, type);
  }
}

makeEventCall(emitter, ons, types);
makeEventCall(eventEmitter, eventOns, eventTypes);

module.exports = {
  on: ons,
  parse: function(message) {
    switch (message.MsgType) {
      case 'event':
        this.event.parse(message);
        break;
      default:
        emitter.emit(message.MsgType, message);
    }
  },
  event: {
    on: eventOns,
    parse: function(event) {
      eventEmitter.emit(event.Event.toLowerCase(), event);
    }
  }
};
