steal
  .plugins("jquery/controller") //load your app
  .plugins("ss/router") //load your app
  .plugins("funcunit/qunit")     //load qunit
  .then("sherpa_test")
  .then("router_test")
