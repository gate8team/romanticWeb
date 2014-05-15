var app = require('http').createServer(handler).listen(8888),
    io = require('socket.io').listen(app),
    fs = require('fs'),
    CQueue = require('./cqueue').CQueue,
    Workspace = require('./cqueue').Workspace,
    cQueue = new CQueue(),
    workspace = new Workspace();

workspace.registerMethods();

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
    workspace.addClientToQueue(socket);

    workspace.broadcastMessages('updatedMessage');

    socket.on('disconnect', function() {
        workspace.removeClientFromQueue(socket);
        workspace.broadcastMessages('updatedMessage');
    });
});