module("Router Processor Controller");

var didRun = false;

$.Controller.extend("TestProcessorsController",
{
  onDocument: true
},
{
  "/test/url route": function() {
    didRun = true;
  }
});

asyncTest("Works", function() {
  expect(1)
  stop();
  location.hash = "/test/url";
  setTimeout(function() {
    start();
    ok(didRun, "Route worked");
    location.hash = "/";
  }, 50);
});
