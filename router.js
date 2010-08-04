steal.plugins("jquery",
              "jquery/class",
              "jquery/controller/history",
              "jquery/lang/openajax")
     .then("sherpa")
     .then(function($) {

  $.Class.extend("SS.Router",
  {
    currentParams: {},
    URLPrefix:     null,
    hashSeparator: "#",  // Google suggests #!
    
    init: function() {
      // Global router object
      Router = new Sherpa.Router();

      OpenAjax.hub.subscribe("history.**", function(event_name) {
        //You'll also typically need to match the "index" history, which typically
        //occurs when no specific url has been entered.  You can route to your
        //default url here. 
        if (event_name === 'history.index') {
          OpenAjax.hub.publish("router.index_page");
          return;
        }

        var key = event_name.replace(/^history(\.*)/, '/');
        //@steal-remove-start
        //steal.dev.log('History event: ' + key);
        //@steal-remove-end

        var foundRoute = Router.recognize(key);
        if (!foundRoute) {
          //@steal-remove-start
          steal.dev.log("WARNING: Router failed to find route for: " + key);
          //@steal-remove-end
          return;
        }
        
        SS.Router.currentParams = foundRoute.params;
        OpenAjax.hub.publish(foundRoute.destination, foundRoute.params);
      });
    },
    
    /**
     * Given an html uri, match it to a history point and update the history
     * of the page to navigate to that location.
     */
    routeTo: function(uri) {
      //@steal-remove-start
      //steal.dev.log("ROUTER: Request to route to " + uri);
      //@steal-remove-end

      //Remove /dev.php from the uri;
      if (this.URLPrefix) {
        uri = uri.replace(this.URLPrefix, '');
      }
      
      var uriWithHash = this.hashSeparator + uri;

      if (window.location.hash === uriWithHash) {
        //@steal-remove-start
        steal.dev.log("ROUTER: Already at " + uriWithHash);
        //@steal-remove-end
        return;
      }
      
      var route = Router.recognize(uri);
      if (!route) {
        // No route. Let it go. Add a '#' to the end so that we don't infinite redirect.
        window.location.href = uri + this.hashSeparator;
        return;
      } else {
        //@steal-remove-start
        //steal.dev.log("ROUTER: Detected appropriate history point: " + uriWithHash);
        //@steal-remove-end
      }

      var components = window.location.href.split(this.hashSeparator);
      if (components.length > 1) {
        //@steal-remove-start
        steal.dev.log('ROUTER: ' + window.location.hash + ' -> ' + uriWithHash);
        //@steal-remove-end
        
        if (window.location.hash !== uriWithHash) {
          window.location = components[0] + uriWithHash;
          return true;
        } else {
          return false;
        }
      } else { //let's "redirect" to the appropriate javascriptmvc uri
        var prefix = this.URLPrefix || '';
        window.location = window.location.protocol + '//' + 
                          window.location.hostname + prefix + uriWithHash;
      }
    }
  },
  {
  }
  );

});
