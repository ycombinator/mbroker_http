exports.Topic = function(topicId) {

    this.topicId = topicId;
    this.messages = [];
    this.subscribers = [];

    this.sendMessage = function(message) {
	for (index in this.subscribers) {
	    subscriber = this.subscribers[index];
	    subscriber.write(JSON.stringify(message) + '\n');
	    console.log("Message sent to subscriber of topic = " + this.topicId);
	}
	return this.subscribers.length;
    }

    this.closeSubscriberStreams = function() {

	for (index in this.subscribers) {
	    subscriber = this.subscribers[index];
	    subscriber.end();
	    console.log("Subscriber stream to topic = " + this.topicId + " closed");
	    delete this.subscribers[index];
	}

    }

};

