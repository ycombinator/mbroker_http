var assert = require("assert"),
    topic = require("../lib/topic");

describe("Topic", function() {

	var t = new topic.Topic("testTopic");

	describe("#construct", function() {
		it('should initialize messages to empty list', function() {
			assert.equal(0, t.messages.length);
		});
	});

	describe("#construct", function() {
		it('should initialize the topic name to the specified name', function() {
			assert.equal("testTopic", t.topicId);
		});
	});

});
