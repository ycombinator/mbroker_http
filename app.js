var express = require('express');

var app = express();
app.use(express.json());

topics = {};

Topic = function(topicId) {

    this.topicId = topicId;
    this.messages = [];

};

Message = function(message) {

    this.message = message;
    this.receivedOn = new Date();
    this.numRead = 0;

};

createTopic = function(req, res) {

    topicId = req.params.id;
    if (topics[topicId] == undefined) {
	topics[topicId] = new Topic(topicId);
	res.send(201, 'Topic ' + topicId + ' created.');
    } else {
	res.send(200, 'Topic ' + topicId + ' already created.');
    }
    
};

listTopics = function(req, res) {

    var topicIds = [];
    var index = 0;
    for (id in topics) {
	topicIds[index] = id;
	++index;
    }

    res.send(200, topicIds);

};

sendMessage = function(req, res) {

    body = req.body;
    message = body.message;
    recipients = body.to;

    sent = 0;
    for (index in recipients) {
	topicId = recipients[index];
	if (topics[topicId] != undefined) {
	    message = new Message(message);
	    topics[topicId].messages.push(message);
	    ++sent;
	}
    }

    res.send(201, "Message sent to " + sent + " out of " + recipients.length + " topics.");

};

getAllMessages = function(req, res) {

    topicId = req.params.id;
    if (topics[topicId] == undefined) {
	res.send(404, 'Topic ' + topicId + ' not found.');
	return;
    }

    messages = topics[topicId].messages;
    for (index in messages) {
	message = messages[index];
	++message.numRead;
    }

    res.send(200, messages);

};

getUnreadMessages = function(req, res) {

    topicId = req.params.id;
    if (topics[topicId] == undefined) {
	res.send(404, 'Topic ' + topicId + ' not found.');
	return;
    }

    messages = topics[topicId].messages;
    unreadMessages = [];
    for (index in messages) {
	message = messages[index];
	if (message.numRead == 0) {
	    unreadMessages.push(message);
	    ++message.numRead;
	}
    }

    res.send(200, unreadMessages);

};


// Routes
// 1. User creates topic. PUT /topic/:id
// 2. User gets a list of created topics. GET /topics
// 3. User sends a message to topic(s). POST /messages { "to": [ "topic1", "topic2" ], "message": "Hello" }
// 4. User retrieves ALL messages from a topic. GET /topic/:id/messages
// 5. User retrieves UNREAD messages from a topic. GET /topic/:id/messages/unread

app.put('/topic/:id', createTopic);
app.get('/topics', listTopics);
app.post('/messages', sendMessage);
app.get('/topic/:id/messages', getAllMessages);
app.get('/topic/:id/messages/unread', getUnreadMessages);

app.listen(3000);
console.log('Listening on port 3000');
