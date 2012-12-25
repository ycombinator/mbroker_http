exports.Topic = function(topicId) {

    this.topicId = topicId;
    this.messages = [];
    this.subscribers = [];

    this.addSubscriber = function(req, res) {
	t = this
	var len = t.subscribers.push(res);
	var subscriberId = len - 1;
	console.log("New subscriber (id = " + subscriberId + ") for topic = " + t.topicId);
	res.writeHead(200);
	req.on('close', function() {
		res.end();
		delete t.subscribers[subscriberId];
		console.log("Subscriber (id = " + subscriberId + ") for topic = " + t.topicId + " disconnected");
	});
    }

    this.sendMessage = function(message) {
	sent = 0;
	for (index in this.subscribers) {
	    subscriber = this.subscribers[index];
	    subscriber.write(JSON.stringify(message) + '\n');
	    console.log("Message sent to subscriber (id = " + index + ") of topic = " + this.topicId);
	    ++sent;
	}
	return sent;
    }

    this.closeSubscriberStreams = function() {

	for (index in this.subscribers) {
	    subscriber = this.subscribers[index];
	    subscriber.end();
	    console.log("Closed stream for subscriber (id = " + index + ") to topic = " + this.topicId);
	    delete this.subscribers[index];
	}

    }

};

