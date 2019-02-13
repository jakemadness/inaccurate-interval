/*
   @https://github.com/jakemadness/inaccurate-interval/tree/master/javascript
*/
var inaccurateInterval = function(callback, min, max) {
   var self        = this;
   self.callback   = callback;
   self.timeout    = false;
   self.running    = false;
   self.randomTime = function() {
      return Math.random() * (max - min) + min;
   };
   self.next = function() {
      if ( self.running ) {
         self.timeout = setTimeout(function() {
            self.callback();
            self.next();
         }, self.randomTime());
      }
   };
   self.start = function() {
      self.running = true;
      self.next();
   };
   self.stop = function() {
      clearTimeout(self.timeout);
      self.running = false;
   };
   self.start();
};