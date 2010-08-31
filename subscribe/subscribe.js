steal.plugins("jquery/controller",
              "jquery/controller/history",
              "jquery/lang/openajax",
              "ss/router/sherpa")
     .then(function($) {

  var SubscriberRouter = new Sherpa.Router();
  var RouteToCallback  = {};

  OpenAjax.hub.subscribe("history.**", function(event_name) {
    var key        = event_name.replace(/^history(\.*)/, '/'),
        foundRoute = SubscriberRouter.recognize(key)
    if (!foundRoute) {
      return;
    }
  
    var callbacks = RouteToCallback[foundRoute.destination];
    if (callbacks) {
      for (var i = 0; i < callbacks.length; i++) {
        callbacks[i](key, foundRoute.params);
      }
    }
  });

  $.Controller.processors.route = function( el, event, selector, cb, controller ) {
    // Add the selector to be watched
    SubscriberRouter.add(selector).to(selector);
    
    // Create an array of callbacks for this selector
    if (typeof RouteToCallback[selector] === "undefined") {
      RouteToCallback[selector] = [];
    }
    
    // Add callback to this array
    RouteToCallback[selector].push(cb);
    
	  return function() {
      //console.debug("route unsubscribe", arguments);
	  }
  };
})
