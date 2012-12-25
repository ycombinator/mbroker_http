# HTTP-based message broker

## Introduction
This is a trivial message broker implementation that utilizes HTTP as its transport. I built this purely as a project to learn node.js. It is certainly not intended to be production-grade software.

## Installation
1. `wget 'https://github.com/ycombinator/mbroker_http/archive/master.zip'`
2. `cd mbroker_http-master`
3. `npm install`

## Startup
1. `node app.js`

## HTTP APIs
### List topics
`GET /topics`

### Create a new topic
`PUT /topic/{id}`

### Send a message to topic(s)
`POST /messages`
`{ "to": [ "topic1", "topic2" ], "message": "Hello" }`

### Get all unread messages in a topic
`GET /topic/{id}/messages/unread`

### Get all messages in a topic
`GET /topic/{id}/messages`

