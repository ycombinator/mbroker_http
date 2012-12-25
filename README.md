[![Build Status](https://travis-ci.org/ycombinator/mbroker_http.png?branch=master)](https://travis-ci.org/ycombinator/mbroker_http)

# HTTP-based message broker

## Introduction
This is a trivial message broker implementation that utilizes HTTP as its transport. I built this project purely to learn node.js; It is certainly *not intended to be production-grade software*.

## Installation
1. `wget 'https://github.com/ycombinator/mbroker_http/archive/master.zip'` (If you get certificate errors, try [this](http://blog.55minutes.com/2012/01/fixing-https-certificate-errors-in-wget-and-ruby/).
1. `unzip master.zip`
1. `cd mbroker_http-master`
1. `npm install`

## Startup
1. `node app.js` (This will start up an HTTP server on localhost at port 3000).

## HTTP APIs
### List topics
`GET /topics`

### Publish a message to topic(s)
`POST /messages`
`{ "to": [ "topic1", "topic2" ], "message": "Hello" }`  
If a topic does not exist, it is automatically created.

### Subscribe to a topic
`GET /topic/{id}/messages`  
If the topic does not exist, it is automatically created.
