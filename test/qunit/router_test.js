module("Router Controller");

// Create Route
Router.add("/test").to("test.event");
Router.add("/test/:variable").to("test.eventWithVar");

$.Controller.extend("TestRoutesController",
{
  onDocument: true
},
{
  "router.index_page subscribe": function() {
    ok(true, "Got Event");
    start();
  },
  
  "test.event subscribe": function() {
    ok(true, "Got Event");
    start();
  },
  
  "test.eventWithVar subscribe": function(event_name, params) {
    ok(true, "Got Event");
    equals(params.variable, "test");
    start();
  }
});

test("Test index event", function() {
  OpenAjax.hub.publish("history.index");
  expect(1);
  stop();
});

test("Test destination event", function() {
  OpenAjax.hub.publish("history..test");
  expect(1);
  stop();
});

test("Test destination event with param", function() {
  OpenAjax.hub.publish("history..test/test");
  expect(2);
  stop();
});
