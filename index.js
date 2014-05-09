var app = require('http').createServer(handler).listen(8888),
    io = require('socket.io').listen(app),
    fs = require('fs'),
    CQueue = require('./cqueue'),
    cQueue = new CQueue();

cQueue.registerMethods();

function handler (req, res) {
    fs.readFile(__dirname + '/client/index.html',
        function (err, data) {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading index.html');
            }

            res.writeHead(200);
            res.end(data);
        });
}

io.sockets.on('connection', function (socket) {
    cQueue.addClientToQueue(socket);

    cQueue.broadcastMessages('updatedMessage');

    socket.on('disconnect', function() {
        cQueue.removeClientFromQueue(socket);
        cQueue.broadcastMessages('updatedMessage');
    });
});