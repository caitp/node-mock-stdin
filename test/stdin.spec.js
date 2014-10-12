var mock = process.env.COVERAGE ? require("../lib-cov") : require("../lib");
var stdin;
module.exports.stdin = {
  setUp: function(cb) {
    stdin = mock.stdin();
    cb();
  },


  tearDown: function(cb) {
    process.stdin.restore();
    cb();
  },


  "process.stdin instanceof MockSTDIN": function (test) {
    test.ok(process.stdin instanceof mock.stdin.Class);
    test.done();
  },


  "MockSTDIN#openStdin()": function (test) {
    test.doesNotThrow(function() {
      process.openStdin();
    }, "process.openStdin() should not throw.");
    test.done();
  },


  "MockSTDIN#restore()": function (test) {
    process.stdin.restore();
    test.ok(!(process.stdin instanceof mock.stdin.Class),
        "restore() should restore previous object");
    mock.stdin();
    test.done();
  },


  "MockSTDIN#setEncoding()": function (test) {
    test.doesNotThrow(function() {
      process.stdin.setEncoding("utf8");
    }, "process.stdin.setEncoding() should not throw.");
    test.done();
  },


  "MockSTDIN#send(<Array>)": function (test) {
    var received;
    var called = false;
    var errors = [];
    var endCalled = false;
    var data = [
      "To whom it may concern,",
      "",
      "I am a piece of mock data.",
      "",
      "Regards,",
      "Cortana"
    ];
    process.stdin.setEncoding("utf8");
    process.stdin.on("data", function(data) {
      called = true;
      received = data;
    });
    process.stdin.on("error", function(error) {
      errors.push(error);
    });
    process.stdin.on("end", function() {
      endCalled = true;
    });
    process.stdin.resume();
    stdin.send(data);
    test.ok(called, "'data' event was not received.");
    test.equals(received, data.join("\n"),
        "received data should be array joined by linefeeds.");
    test.deepEqual(errors, [], "'error' event should not be received.");
    setTimeout(function() {
      test.ok(!endCalled, "'end' event should not be received.");
      test.done();
    });
  },


  "MockSTDIN#send(<String>)": function (test) {
    var received;
    var called = false;
    var errors = [];
    var endCalled = false;
    var data = [
      "To whom it may concern,",
      "",
      "I am a piece of mock data.",
      "",
      "Regards,",
      "Cortana"
    ].join("\n");
    process.stdin.setEncoding("utf8");
    process.stdin.on("data", function(data) {
      called = true;
      received = data;
    });
    process.stdin.on("error", function(error) {
      errors.push(error);
    });
    process.stdin.on("end", function() {
      endCalled = true;
    });
    process.stdin.resume();
    process.stdin.send(data);
    test.ok(called, "'data' event was not received.");
    test.equals(received, data, "received data should match what was sent.");
    test.deepEqual(errors, [], "'error' event should not be received.");
    setTimeout(function() {
      test.ok(!endCalled, "'end' event should not be received.");
      test.done();
    });
  },


  "MockSTDIN#send(<Buffer>)": function (test) {
    var received;
    var called = false;
    var errors = [];
    var endCalled = false;
    var data = [
      "To whom it may concern,",
      "",
      "I am a piece of mock data.",
      "",
      "Regards,",
      "Cortana"
    ].join("\n");
    process.stdin.setEncoding("utf8");
    process.stdin.on("data", function(data) {
      called = true;
      received = data;
    });
    process.stdin.on("error", function(error) {
      errors.push(error);
    });
    process.stdin.on("end", function() {
      endCalled = true;
    });
    process.stdin.resume();
    process.stdin.send(new Buffer(data, "utf8"));
    test.ok(called, "'data' event was not received.");
    test.equals(received, data, "received data should match what was sent.");
    test.deepEqual(errors, [], "'error' event should not be received.");
    setTimeout(function() {
      test.ok(!endCalled, "'end' event should not be received.");
      test.done();
    });
  },


  "MockSTDIN#send(<Null>)": function (test) {
    var called = false;
    var dataCalled = false;
    var errors = [];
    process.stdin.setEncoding("utf8");
    process.stdin.on("error", function(error) {
      errors.push(error);
    });
    process.stdin.on("end", function() {
      called = true;
    });
    process.stdin.on("data", function() {
      dataCalled = true;
    });
    process.stdin.resume();
    process.stdin.send(null);
    test.ok(!dataCalled, "'data' event should not be received.");
    test.deepEqual(errors, [], "'error' event should not be received.");
    setTimeout(function() {
      test.ok(called, "'end' event was not received.");
      test.done();
    });
  },


  "MockSTDIN#end()": function (test) {
    var called = false;
    var dataCalled = false;
    var errors = [];
    process.stdin.setEncoding("utf8");
    process.stdin.on("error", function(error) {
      errors.push(error);
    });
    process.stdin.on("end", function() {
      called = true;
    });
    process.stdin.on("data", function() {
      dataCalled = true;
    });
    process.stdin.resume();
    process.stdin.end();
    test.ok(!dataCalled, "'data' event should not be received.");
    test.deepEqual(errors, [], "'error' event should not be received.");
    setTimeout(function() {
      test.ok(called, "'end' event was not received.");
      test.done();
    });
  },


  "MockSTDIN#reset()": function (test) {
    var received = '';
    process.stdin.setEncoding('utf8');
    process.stdin.on("data", function(data) {
      received += data;
    });
    process.stdin.end();
    process.stdin.reset();

    test.doesNotThrow(function() {
      process.stdin.send("Please don't throw, little lamb!");
    }, "should not throw when sending data after end when reset() called");

    test.equal(received, "Please don't throw, little lamb!");
    test.done();
  }
};
