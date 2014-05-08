var app = require('http').createServer(handler).listen(8888),
    io = require('socket.io').listen(app),
    fs = require('fs'),
    clientQueue = new Array();

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
    var clientID = (socket.id).toString();
    clientQueue.push(clientID);
    var clientQueueString = '[' + clientQueue.join(';') + ']';

    socket.json.send({'name': clientID, message: 'Welcome', clients: clientQueueString});
    socket.broadcast.json.send({'name': clientID, message: 'Is here', clients: clientQueueString});

    socket.on('message', function(message){
        socket.broadcast.json.send({'name': clientID, message: 'Is here', clients: clientQueueString});
    });

    socket.on('disconnect', function() {
        var index = clientQueue.indexOf(clientID);
        clientQueue.splice(index, 1);
        var clientQueueString = '[' + clientQueue.join(';') + ']';
        io.sockets.json.send({'name': clientID, message: 'Left', clients: clientQueueString});
    });
});