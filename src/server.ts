import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';
import * as redis from 'redis';

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const redisClient = redis.createClient();

let totalCount = 0;

wss.on('connection', (ws: WebSocket) => {

    totalCount++;

    wss.clients.forEach(client => {
        client.send(`{"totalCount": ${totalCount}}`);
    });

});

setInterval(() => {
    redisClient.zadd('', totalCount);
}, 1000);

//start our server
server.listen(process.env.PORT || 8999, () => {
    console.log(`Welcome to Bideford on port ${server.address().port}`);
});