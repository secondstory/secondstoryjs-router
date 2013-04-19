steal("jquery/controller",
    'ss/router/controller/history',
    "jquery/lang/openajax",
    "ss/router/sherpa")
    .then(function($) {

    var SubscriberRouter = new Sherpa.Router(),
        RouteToCallback  = {},
        slice = Array['prototype'].slice,
        shifter = function shifter(context, name) {
                var method = typeof name == "string" ? context[name] : name;
                return function() {
                        context.called = name;
                return method.apply(context, [this.nodeName ? $(this) : this].concat( slice.call(arguments, 0) ) );
                };
        };

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
        RouteToCallback[selector].push(shifter(controller, cb));

        return function() {
            //console.debug("route unsubscribe", arguments);
        }
    };
})
