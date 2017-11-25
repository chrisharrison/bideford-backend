import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let totalCount = 0;

wss.on('connection', (ws: WebSocket) => {

    totalCount++;

    wss.clients.forEach(client => {
        client.send(`{"totalCount": ${totalCount}}`);
    });

});

//start our server
server.listen(process.env.PORT || 8999, () => {
    console.log(`Welcome to Bideford on port ${server.address().port}`);
});