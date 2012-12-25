var express = require('express'),
    topic = require('./lib/topic'),
    message = require('./lib/message');


var app = express();
app.use(express.json());

var topics = {};

listTopics = function(req, res) {

    var topicIds = [];
    var index = 0;
    for (id in topics) {
	topicIds[index] = id;
	++index;
    }

    res.send(200, topicIds);

};

createTopicIfNotExists = function(topicId) {

    if (topics[topicId] === undefined) {
	topics[topicId] = new topic.Topic(topicId);
	console.log("New topic " + topicId + " created");
    }
    
    return topics[topicId];

}

sendMessage = function(req, res) {

    body = req.body;
    text = body.message;
    recipients = body.to;

    sent = 0;
    for (index in recipients) {

	topicId = recipients[index];
	t = createTopicIfNotExists(topicId);

	m = new message.Message('message', text);
	sent += t.sendMessage(m);

    }

    res.send(201, "Message sent to " + sent + " subscribers");

};

getAllMessages = function(req, res) {

    topicId = req.params.id;
    t = createTopicIfNotExists(topicId);

    t.subscribers.push(res);
    console.log("New subscriber for topic = " + topicId);
    res.writeHead(200);

};

shutdown = function() {
    closeSubscriberStreams();
    process.exit();
}

closeSubscriberStreams = function() {

    console.log("Process is shutting down...");
    for (id in topics) {

	console.log("Closing subscriber streams for topic = " + id);
	t = topics[id];
	t.closeSubscriberStreams();
    }

};

app.get('/topics', listTopics);
app.post('/messages', sendMessage);
app.get('/topic/:id/messages', getAllMessages);

app.listen(3000);
console.log('Listening on port 3000');
process.on('SIGINT', shutdown);