let express = require('express')
let http = require('http')
let ws = require('ws')

// create the express app
const app = express();

// create a simple http server
const server = http.createServer(app);

// initialize the WebSocket server instance
const wss = new ws.Server({ server });

// the event triggered when a connection is established
wss.on('connection', (ws) => {
    // the event triggered when a message is received
    ws.on('message', (message) => {
        //log the received message and send it back to the client
        console.log(`received: ${message}`);

        //send back the message to the other clients
        wss.clients
            .forEach(client => {
                if (client != ws) {
                    client.send(`${message}`);
                }
            });
    });

    // send a feedback immediately to the incoming connection    
    ws.send('I am a WebSocket server');
});

//start our server
server.listen(process.env.PORT || 8888, () => {
    console.log(`server started on port ${server.address().port}`);
});
