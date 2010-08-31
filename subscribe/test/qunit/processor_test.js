module("Router Processor Controller");

var didRun = false;
var complexParams = false;

$.Controller.extend("TestProcessorsController",
{
  onDocument: true
},
{
  "/test/url route": function() {
    didRun = true;
  },
  
  "/:test_param/suffix route": function(event_name, params) {
    complexParams = params;
  }
});

asyncTest("Basic matching", function() {
  expect(1);
  stop();
  location.hash = "/test/url";
  setTimeout(function() {
    start();
    ok(didRun, "Route worked");
    location.hash = "/";
  }, 50);
});

asyncTest("Complex params", function() {
  expect(2);
  stop();
  location.hash = "/hithere/suffix";
  setTimeout(function() {
    start();
    ok(complexParams, "Route worked");
    equals(complexParams.test_param, "hithere");
    location.hash = "/";
  }, 50);
});
