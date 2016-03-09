var assert = require("double-check").assert;

var why = require("../lib/why.js");


function asyncFunction(callback){
    setTimeout(callback, 100);
}

assert.callback("Simple why with callback", function(end) {

    function caller(){
            asyncFunction.why("Call a callback")(callback.why("Callback call"));

    }
    function callback(arg1,arg2){
        var executionSummary = why.getGlobalCurrentContext().getExecutionSummary();
        assert.equal(executionSummary.calls.hasOwnProperty("First Call"),true);
        assert.equal(executionSummary.calls["First Call"].calls.hasOwnProperty('Call a callback'),true);
        assert.equal(executionSummary.calls["First Call"].calls.hasOwnProperty('Callback call'),true);
        assert.equal(executionSummary.calls["First Call"].args.length === 0,true);
        end();
    }
    caller.why("First Call")();
})
