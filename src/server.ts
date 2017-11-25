import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let closeTimeout = 2 * 1000; // 2 seconds
let totalCount = 0;


wss.on('connection', (ws: WebSocket) => {
    add();
    update();
    ws.on('close', (event: Event) => {
        remove();
        update();
    });
});

function add() {
    totalCount++;
}

function remove() {
    totalCount--;
}

function update() {
    wss.clients.forEach(client => {
        client.send(`{"totalCount": ${totalCount}}`);
    });
}

//start our server
server.listen(process.env.PORT || 8999, () => {
    console.log(`Welcome to Bideford on port ${server.address().port}`);
});