module("Sherpa Router");

Router.add("/path").to("basic");
Router.add("/withvariable/:something").to("with_var");
Router.add("/withmatch/:something", { matchesWith: { something: /\d+/ } }).to("with_match");
Router.add("/withoptional/:something(/part2)").to("with_option");

test("Fails on no match (/nothing)", function(){
  ok(!Router.recognize("/nothing"), "No match");
});

test("Matches basic case (/path)", function(){
  var result = Router.recognize("/path");
  ok(result, "Found matching path");
  equals(result.destination, "basic");
});

test("Matches with variable (/withvariable/heythere)", function(){
  var result = Router.recognize("/withvariable/heythere");
  ok(result, "Found matching path");
  equals(result.destination, "with_var");
  equals(result.params.something, "heythere");
});

test("Matches with validation (/withmatch/1234)", function(){
  var result = Router.recognize("/withmatch/1234");
  ok(result, "Found matching path");
  equals(result.destination, "with_match");
  equals(result.params.something, 1234);
});

test("Fails with incorrect validation (/withmatch/nonnumeric)", function(){
  var result = Router.recognize("/withmatch/nonnumeric");
  ok(!result, "No match");
});

test("Matches with option (/withoptional/var && /withoptional/var/part2)", function(){
  var result = Router.recognize("/withoptional/var");
  ok(result, "Found matching path");
  equals(result.destination, "with_option");
  
  var result2 = Router.recognize("/withoptional/var/part2");
  ok(result2, "Found matching path");
  equals(result2.destination, "with_option");
});
